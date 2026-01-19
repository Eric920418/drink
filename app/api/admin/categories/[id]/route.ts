import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkAdminAuth, errorResponse, successResponse } from "@/lib/api-auth";

type RouteParams = { params: Promise<{ id: string }> };

// 獲取單個分類
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
      include: {
        products: true,
      },
    });

    if (!category) {
      return errorResponse("分類不存在", 404);
    }

    return successResponse(category);
  } catch (error) {
    console.error("Get category error:", error);
    return errorResponse("獲取分類失敗");
  }
}

// 更新分類
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const auth = await checkAdminAuth();
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const { name, slug, description, order, isActive } = body;

    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name }),
        ...(slug && { slug }),
        ...(description !== undefined && { description }),
        ...(order !== undefined && { order }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return successResponse(category);
  } catch (error) {
    console.error("Update category error:", error);
    return errorResponse("更新分類失敗");
  }
}

// 刪除分類
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const auth = await checkAdminAuth();
  if (!auth.authorized) return auth.response;

  try {
    await prisma.category.delete({
      where: { id: parseInt(id) },
    });

    return successResponse({ message: "刪除成功" });
  } catch (error) {
    console.error("Delete category error:", error);
    return errorResponse("刪除分類失敗");
  }
}
