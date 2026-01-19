import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkAdminAuth, errorResponse, successResponse } from "@/lib/api-auth";

// 獲取所有促銷
export async function GET() {
  try {
    const promotions = await prisma.promotion.findMany({
      orderBy: { order: "asc" },
    });

    return successResponse(promotions);
  } catch (error) {
    console.error("Get promotions error:", error);
    return errorResponse("獲取促銷失敗");
  }
}

// 創建促銷
export async function POST(request: NextRequest) {
  const auth = await checkAdminAuth();
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const { title, description, icon, link, isActive, order } = body;

    if (!title) {
      return errorResponse("標題為必填", 400);
    }

    const promotion = await prisma.promotion.create({
      data: {
        title,
        description,
        icon,
        link,
        isActive: isActive !== false,
        order: order || 0,
      },
    });

    return successResponse(promotion, 201);
  } catch (error) {
    console.error("Create promotion error:", error);
    return errorResponse("創建促銷失敗");
  }
}
