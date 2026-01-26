import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAdminAuth } from '@/lib/api-auth'

// GET - List all franchise plans (admin)
export async function GET() {
  const { authorized, response } = await checkAdminAuth()
  if (!authorized) return response

  try {
    const plans = await prisma.franchisePlan.findMany({
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(plans)
  } catch (error) {
    console.error('Error fetching franchise plans:', error)
    return NextResponse.json(
      { error: 'Failed to fetch franchise plans' },
      { status: 500 }
    )
  }
}

// POST - Create new franchise plan
export async function POST(request: Request) {
  const { authorized, response } = await checkAdminAuth()
  if (!authorized) return response

  try {
    const data = await request.json()

    // Generate slug from name
    const slug = data.name
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const plan = await prisma.franchisePlan.create({
      data: {
        name: data.name,
        slug,
        description: data.description || null,
        image: data.image || null,
        investment: data.investment,
        area: data.area || null,
        features: data.features || [],
        includes: data.includes || [],
        isPopular: data.isPopular || false,
        isActive: data.isActive ?? true,
        order: data.order || 0,
      },
    })

    return NextResponse.json(plan)
  } catch (error) {
    console.error('Error creating franchise plan:', error)
    return NextResponse.json(
      { error: 'Failed to create franchise plan' },
      { status: 500 }
    )
  }
}
