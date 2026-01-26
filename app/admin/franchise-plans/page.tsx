'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/admin/Sidebar'
import ImageUploader from '@/components/admin/ImageUploader'
import { Plus, Pencil, Trash2, X, Sparkles, GripVertical, Eye, EyeOff } from 'lucide-react'

interface FranchisePlan {
  id: number
  name: string
  slug: string
  description: string | null
  image: string | null
  investment: string
  area: string | null
  features: string[]
  includes: string[]
  isPopular: boolean
  isActive: boolean
  order: number
}

export default function AdminFranchisePlansPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [plans, setPlans] = useState<FranchisePlan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [editingPlan, setEditingPlan] = useState<FranchisePlan | null>(null)
  const [saving, setSaving] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    investment: '',
    area: '',
    features: '',
    includes: '',
    isPopular: false,
    isActive: true,
    order: 0,
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/franchise-plans')
      if (!res.ok) throw new Error('Failed to fetch plans')
      const data = await res.json()
      setPlans(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : '載入加盟方案失敗')
    } finally {
      setLoading(false)
    }
  }

  const openModal = (plan?: FranchisePlan) => {
    if (plan) {
      setEditingPlan(plan)
      setFormData({
        name: plan.name,
        description: plan.description || '',
        image: plan.image || '',
        investment: plan.investment,
        area: plan.area || '',
        features: plan.features.join('\n'),
        includes: plan.includes.join('\n'),
        isPopular: plan.isPopular,
        isActive: plan.isActive,
        order: plan.order,
      })
    } else {
      setEditingPlan(null)
      setFormData({
        name: '',
        description: '',
        image: '',
        investment: '',
        area: '',
        features: '',
        includes: '',
        isPopular: false,
        isActive: true,
        order: plans.length,
      })
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingPlan(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const payload = {
        ...formData,
        features: formData.features.split('\n').filter(f => f.trim()),
        includes: formData.includes.split('\n').filter(i => i.trim()),
      }

      const url = editingPlan
        ? `/api/admin/franchise-plans/${editingPlan.id}`
        : '/api/admin/franchise-plans'

      const res = await fetch(url, {
        method: editingPlan ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Failed to save plan')

      await fetchPlans()
      closeModal()
    } catch (err) {
      setError(err instanceof Error ? err.message : '儲存失敗')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('確定要刪除此加盟方案嗎？')) return

    try {
      const res = await fetch(`/api/admin/franchise-plans/${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Failed to delete plan')

      await fetchPlans()
    } catch (err) {
      setError(err instanceof Error ? err.message : '刪除失敗')
    }
  }

  const toggleActive = async (plan: FranchisePlan) => {
    try {
      const res = await fetch(`/api/admin/franchise-plans/${plan.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...plan,
          isActive: !plan.isActive,
        }),
      })

      if (!res.ok) throw new Error('Failed to update plan')

      await fetchPlans()
    } catch (err) {
      setError(err instanceof Error ? err.message : '更新失敗')
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-paper-cream flex items-center justify-center">
        <div className="animate-pulse text-stone-gray">載入中...</div>
      </div>
    )
  }

  if (!session) return null

  return (
    <div className="min-h-screen bg-paper-cream">
      <Sidebar />

      <div className="lg:ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-serif text-tea-ink">加盟方案管理</h1>
              <p className="text-stone-gray text-sm mt-1">管理加盟方案內容，可設定投資金額、方案特色等</p>
            </div>
            <button
              onClick={() => openModal()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-tea-ink text-silk-white text-sm hover:bg-tea-forest transition-colors"
            >
              <Plus className="w-4 h-4" />
              新增方案
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Plans List */}
          <div className="bg-white border border-tea-ink/10">
            {plans.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-stone-gray mb-4">尚未建立加盟方案</p>
                <button
                  onClick={() => openModal()}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-tea-ink text-silk-white text-sm hover:bg-tea-forest transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  建立第一個方案
                </button>
              </div>
            ) : (
              <div className="divide-y divide-tea-ink/5">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`p-6 flex items-center gap-6 ${!plan.isActive ? 'opacity-50' : ''}`}
                  >
                    <div className="text-stone-gray cursor-move">
                      <GripVertical className="w-5 h-5" />
                    </div>

                    {/* Plan Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <h3 className="font-serif text-lg text-tea-ink">{plan.name}</h3>
                        {plan.isPopular && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-terracotta/10 text-terracotta text-xs">
                            <Sparkles className="w-3 h-3" />
                            熱門
                          </span>
                        )}
                        {!plan.isActive && (
                          <span className="px-2 py-0.5 bg-stone-gray/10 text-stone-gray text-xs">
                            已停用
                          </span>
                        )}
                      </div>
                      <p className="text-stone-gray text-sm mt-1 truncate">
                        {plan.description || '無描述'}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="text-tea-jade font-medium">{plan.investment}</span>
                        {plan.area && (
                          <span className="text-stone-gray">建議坪數：{plan.area}</span>
                        )}
                        <span className="text-stone-gray">{plan.includes.length} 項包含</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleActive(plan)}
                        className="p-2 text-stone-gray hover:text-tea-ink transition-colors"
                        title={plan.isActive ? '停用' : '啟用'}
                      >
                        {plan.isActive ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                      </button>
                      <button
                        onClick={() => openModal(plan)}
                        className="p-2 text-stone-gray hover:text-tea-ink transition-colors"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(plan.id)}
                        className="p-2 text-stone-gray hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-tea-ink/50" onClick={closeModal}></div>
          <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-tea-ink/10 px-6 py-4 flex items-center justify-between">
              <h2 className="font-serif text-xl text-tea-ink">
                {editingPlan ? '編輯方案' : '新增方案'}
              </h2>
              <button onClick={closeModal} className="text-stone-gray hover:text-tea-ink">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm text-tea-ink mb-2">方案名稱 *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-tea-ink/20 focus:border-tea-jade focus:outline-none"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm text-tea-ink mb-2">方案描述</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-tea-ink/20 focus:border-tea-jade focus:outline-none"
                />
              </div>

              {/* Investment & Area */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-tea-ink mb-2">投資金額 *</label>
                  <input
                    type="text"
                    value={formData.investment}
                    onChange={(e) => setFormData({ ...formData, investment: e.target.value })}
                    placeholder="例：NT$ 100萬 - 150萬"
                    className="w-full px-4 py-2 border border-tea-ink/20 focus:border-tea-jade focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-tea-ink mb-2">建議坪數</label>
                  <input
                    type="text"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    placeholder="例：15-20坪"
                    className="w-full px-4 py-2 border border-tea-ink/20 focus:border-tea-jade focus:outline-none"
                  />
                </div>
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm text-tea-ink mb-2">方案圖片</label>
                <ImageUploader
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                />
              </div>

              {/* Includes */}
              <div>
                <label className="block text-sm text-tea-ink mb-2">方案包含項目（每行一項）</label>
                <textarea
                  value={formData.includes}
                  onChange={(e) => setFormData({ ...formData, includes: e.target.value })}
                  rows={5}
                  placeholder="品牌授權費&#10;設備器材&#10;首批原物料&#10;教育訓練&#10;開幕輔導"
                  className="w-full px-4 py-2 border border-tea-ink/20 focus:border-tea-jade focus:outline-none font-mono text-sm"
                />
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm text-tea-ink mb-2">方案特色標籤（每行一項）</label>
                <textarea
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  rows={3}
                  placeholder="快速回本&#10;低風險&#10;全方位支援"
                  className="w-full px-4 py-2 border border-tea-ink/20 focus:border-tea-jade focus:outline-none font-mono text-sm"
                />
              </div>

              {/* Options */}
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPopular}
                    onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-tea-ink">熱門方案</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-tea-ink">啟用</span>
                </label>
              </div>

              {/* Order */}
              <div>
                <label className="block text-sm text-tea-ink mb-2">排序</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="w-24 px-4 py-2 border border-tea-ink/20 focus:border-tea-jade focus:outline-none"
                />
              </div>

              {/* Submit */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-3 border border-tea-ink/20 text-tea-ink hover:bg-paper-cream transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-4 py-3 bg-tea-ink text-silk-white hover:bg-tea-forest transition-colors disabled:opacity-50"
                >
                  {saving ? '儲存中...' : '儲存'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
