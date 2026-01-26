import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAdminAuth } from '@/lib/api-auth'

// GET - Get single franchise plan
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { authorized, response } = await checkAdminAuth()
  if (!authorized) return response

  try {
    const { id } = await params
    const plan = await prisma.franchisePlan.findUnique({
      where: { id: parseInt(id) },
    })

    if (!plan) {
      return NextResponse.json(
        { error: 'Franchise plan not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(plan)
  } catch (error) {
    console.error('Error fetching franchise plan:', error)
    return NextResponse.json(
      { error: 'Failed to fetch franchise plan' },
      { status: 500 }
    )
  }
}

// PUT - Update franchise plan
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { authorized, response } = await checkAdminAuth()
  if (!authorized) return response

  try {
    const { id } = await params
    const data = await request.json()

    const plan = await prisma.franchisePlan.update({
      where: { id: parseInt(id) },
      data: {
        name: data.name,
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
    console.error('Error updating franchise plan:', error)
    return NextResponse.json(
      { error: 'Failed to update franchise plan' },
      { status: 500 }
    )
  }
}

// DELETE - Delete franchise plan
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { authorized, response } = await checkAdminAuth()
  if (!authorized) return response

  try {
    const { id } = await params
    await prisma.franchisePlan.delete({
      where: { id: parseInt(id) },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting franchise plan:', error)
    return NextResponse.json(
      { error: 'Failed to delete franchise plan' },
      { status: 500 }
    )
  }
}
