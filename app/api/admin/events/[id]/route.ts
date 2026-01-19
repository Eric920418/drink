import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkAdminAuth, errorResponse, successResponse } from "@/lib/api-auth";

type RouteParams = { params: Promise<{ id: string }> };

// 獲取單個活動
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) },
    });

    if (!event) {
      return errorResponse("活動不存在", 404);
    }

    return successResponse(event);
  } catch (error) {
    console.error("Get event error:", error);
    return errorResponse("獲取活動失敗");
  }
}

// 更新活動
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const auth = await checkAdminAuth();
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const {
      title,
      slug,
      subtitle,
      description,
      image,
      category,
      startDate,
      endDate,
      isActive,
      isFeatured,
      order,
    } = body;

    const event = await prisma.event.update({
      where: { id: parseInt(id) },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(subtitle !== undefined && { subtitle }),
        ...(description !== undefined && { description }),
        ...(image !== undefined && { image }),
        ...(category !== undefined && { category }),
        ...(startDate !== undefined && { startDate: startDate ? new Date(startDate) : null }),
        ...(endDate !== undefined && { endDate: endDate ? new Date(endDate) : null }),
        ...(isActive !== undefined && { isActive }),
        ...(isFeatured !== undefined && { isFeatured }),
        ...(order !== undefined && { order }),
      },
    });

    return successResponse(event);
  } catch (error) {
    console.error("Update event error:", error);
    return errorResponse("更新活動失敗");
  }
}

// 刪除活動
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const auth = await checkAdminAuth();
  if (!auth.authorized) return auth.response;

  try {
    await prisma.event.delete({
      where: { id: parseInt(id) },
    });

    return successResponse({ message: "刪除成功" });
  } catch (error) {
    console.error("Delete event error:", error);
    return errorResponse("刪除活動失敗");
  }
}
