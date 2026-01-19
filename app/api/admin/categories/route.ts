import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkAdminAuth, errorResponse, successResponse } from "@/lib/api-auth";

// 獲取所有分類
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { order: "asc" },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    return successResponse(categories);
  } catch (error) {
    console.error("Get categories error:", error);
    return errorResponse("獲取分類失敗");
  }
}

// 創建分類
export async function POST(request: NextRequest) {
  const auth = await checkAdminAuth();
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const { name, slug, description, order, isActive } = body;

    if (!name || !slug) {
      return errorResponse("名稱和 slug 為必填", 400);
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
        order: order || 0,
        isActive: isActive !== false,
      },
    });

    return successResponse(category, 201);
  } catch (error) {
    console.error("Create category error:", error);
    return errorResponse("創建分類失敗");
  }
}
