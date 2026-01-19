import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkAdminAuth, errorResponse, successResponse } from "@/lib/api-auth";

// 獲取所有活動
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    return successResponse(events);
  } catch (error) {
    console.error("Get events error:", error);
    return errorResponse("獲取活動失敗");
  }
}

// 創建活動
export async function POST(request: NextRequest) {
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

    if (!title || !slug) {
      return errorResponse("標題和 slug 為必填", 400);
    }

    const event = await prisma.event.create({
      data: {
        title,
        slug,
        subtitle,
        description,
        image,
        category,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        isActive: isActive !== false,
        isFeatured: isFeatured === true,
        order: order || 0,
      },
    });

    return successResponse(event, 201);
  } catch (error) {
    console.error("Create event error:", error);
    return errorResponse("創建活動失敗");
  }
}
