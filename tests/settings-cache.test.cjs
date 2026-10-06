const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')
const ts = require('typescript')

function load(file, mocks) {
  const module = { exports: {} }
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText
  vm.runInNewContext(code, { module, exports: module.exports, Error, console: { error: () => {} }, require: id => {
    assert.ok(id in mocks, `Unexpected dependency: ${id}`)
    return mocks[id]
  } })
  return module.exports
}

test('public settings cache refreshes after authorized successful writes, including partial batches', async () => {
  let rows = [{ key: 'brand', value: 'old' }], cached, reads = 0, writes = 0
  let authorized = true, readFail = false
  const tags = []
  const cache = {
    unstable_cache: fn => async () => {
      if (!cached) cached = Promise.resolve().then(fn).catch(error => { cached = undefined; throw error })
      return cached
    },
    revalidateTag: tag => { tags.push(tag); cached = undefined },
  }
  const mocks = {
    'next/server': { NextResponse: { json: (data, options) => ({ status: options?.status || 200, data }) } },
    '@/lib/prisma': { default: { siteSetting: {
      findMany: async () => { reads++; if (readFail) throw new Error('DB unavailable'); return rows.map(row => ({ ...row })) },
      upsert: async ({ where, update }) => {
        writes++
        if (where.key === 'fail') throw new Error('write failed')
        rows = rows.map(row => row.key === where.key ? { ...row, value: update.value } : row)
      },
    } } },
    'next/cache': cache,
    '@/lib/api-auth': {
      checkAdminAuth: async () => ({ authorized, response: { status: 401 } }),
      successResponse: data => ({ status: 200, data }),
      errorResponse: error => ({ status: 500, error }),
    },
  }
  const publicRoute = load('app/api/settings/route.ts', mocks)
  const admin = load('app/api/admin/settings/route.ts', mocks)
  assert.equal((await publicRoute.GET()).data.brand, 'old')
  assert.equal((await publicRoute.GET()).data.brand, 'old'); assert.equal(reads, 1)
  const request = body => ({ json: async () => body })
  authorized = false
  assert.equal((await admin.POST(request({ brand: 'denied' }))).status, 401)
  assert.equal(writes, 0); assert.equal(tags.length, 0)
  authorized = true
  assert.equal((await admin.POST(request({ brand: 'new' }))).status, 200)
  assert.equal(tags[0], 'public-site-settings')
  assert.equal((await publicRoute.GET()).data.brand, 'new'); assert.equal(reads, 2)
  assert.equal((await admin.POST(request({ brand: 'partial', fail: 'value' }))).status, 500)
  assert.equal((await publicRoute.GET()).data.brand, 'partial'); assert.equal(reads, 3)
  cached = undefined; readFail = true
  assert.equal((await publicRoute.GET()).status, 500)
  readFail = false
  assert.equal((await publicRoute.GET()).data.brand, 'partial'); assert.equal(reads, 5)
})
