import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkAdminAuth, errorResponse, successResponse } from "@/lib/api-auth";

// 獲取所有門市
export async function GET() {
  try {
    const stores = await prisma.store.findMany({
      orderBy: { order: "asc" },
    });

    return successResponse(stores);
  } catch (error) {
    console.error("Get stores error:", error);
    return errorResponse("獲取門市失敗");
  }
}

// 創建門市
export async function POST(request: NextRequest) {
  const auth = await checkAdminAuth();
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const {
      name,
      slug,
      address,
      phone,
      openingHours,
      image,
      features,
      mapUrl,
      orderUrl,
      isActive,
      order,
    } = body;

    if (!name || !slug || !address || !openingHours) {
      return errorResponse("名稱、slug、地址和營業時間為必填", 400);
    }

    const store = await prisma.store.create({
      data: {
        name,
        slug,
        address,
        phone,
        openingHours,
        image,
        features: features || [],
        mapUrl,
        orderUrl,
        isActive: isActive !== false,
        order: order || 0,
      },
    });

    return successResponse(store, 201);
  } catch (error) {
    console.error("Create store error:", error);
    return errorResponse("創建門市失敗");
  }
}
