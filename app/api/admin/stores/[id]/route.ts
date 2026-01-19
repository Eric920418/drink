import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkAdminAuth, errorResponse, successResponse } from "@/lib/api-auth";

type RouteParams = { params: Promise<{ id: string }> };

// 獲取單個門市
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    const store = await prisma.store.findUnique({
      where: { id: parseInt(id) },
    });

    if (!store) {
      return errorResponse("門市不存在", 404);
    }

    return successResponse(store);
  } catch (error) {
    console.error("Get store error:", error);
    return errorResponse("獲取門市失敗");
  }
}

// 更新門市
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
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

    const store = await prisma.store.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name }),
        ...(slug && { slug }),
        ...(address && { address }),
        ...(phone !== undefined && { phone }),
        ...(openingHours && { openingHours }),
        ...(image !== undefined && { image }),
        ...(features !== undefined && { features }),
        ...(mapUrl !== undefined && { mapUrl }),
        ...(orderUrl !== undefined && { orderUrl }),
        ...(isActive !== undefined && { isActive }),
        ...(order !== undefined && { order }),
      },
    });

    return successResponse(store);
  } catch (error) {
    console.error("Update store error:", error);
    return errorResponse("更新門市失敗");
  }
}

// 刪除門市
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const auth = await checkAdminAuth();
  if (!auth.authorized) return auth.response;

  try {
    await prisma.store.delete({
      where: { id: parseInt(id) },
    });

    return successResponse({ message: "刪除成功" });
  } catch (error) {
    console.error("Delete store error:", error);
    return errorResponse("刪除門市失敗");
  }
}
