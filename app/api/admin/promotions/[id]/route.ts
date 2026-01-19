import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkAdminAuth, errorResponse, successResponse } from "@/lib/api-auth";

type RouteParams = { params: Promise<{ id: string }> };

// 獲取單個促銷
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    const promotion = await prisma.promotion.findUnique({
      where: { id: parseInt(id) },
    });

    if (!promotion) {
      return errorResponse("促銷不存在", 404);
    }

    return successResponse(promotion);
  } catch (error) {
    console.error("Get promotion error:", error);
    return errorResponse("獲取促銷失敗");
  }
}

// 更新促銷
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const auth = await checkAdminAuth();
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const { title, description, icon, link, isActive, order } = body;

    const promotion = await prisma.promotion.update({
      where: { id: parseInt(id) },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(icon !== undefined && { icon }),
        ...(link !== undefined && { link }),
        ...(isActive !== undefined && { isActive }),
        ...(order !== undefined && { order }),
      },
    });

    return successResponse(promotion);
  } catch (error) {
    console.error("Update promotion error:", error);
    return errorResponse("更新促銷失敗");
  }
}

// 刪除促銷
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const auth = await checkAdminAuth();
  if (!auth.authorized) return auth.response;

  try {
    await prisma.promotion.delete({
      where: { id: parseInt(id) },
    });

    return successResponse({ message: "刪除成功" });
  } catch (error) {
    console.error("Delete promotion error:", error);
    return errorResponse("刪除促銷失敗");
  }
}
