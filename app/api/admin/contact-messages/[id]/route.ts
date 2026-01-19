import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkAdminAuth, errorResponse, successResponse } from "@/lib/api-auth";

type RouteParams = { params: Promise<{ id: string }> };

// 獲取單個聯絡訊息
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const auth = await checkAdminAuth();
  if (!auth.authorized) return auth.response;

  try {
    const message = await prisma.contactMessage.findUnique({
      where: { id: parseInt(id) },
    });

    if (!message) {
      return errorResponse("訊息不存在", 404);
    }

    return successResponse(message);
  } catch (error) {
    console.error("Get contact message error:", error);
    return errorResponse("獲取聯絡訊息失敗");
  }
}

// 標記為已讀
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const auth = await checkAdminAuth();
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const { isRead } = body;

    const message = await prisma.contactMessage.update({
      where: { id: parseInt(id) },
      data: { isRead: isRead !== false },
    });

    return successResponse(message);
  } catch (error) {
    console.error("Update contact message error:", error);
    return errorResponse("更新聯絡訊息失敗");
  }
}

// 刪除聯絡訊息
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const auth = await checkAdminAuth();
  if (!auth.authorized) return auth.response;

  try {
    await prisma.contactMessage.delete({
      where: { id: parseInt(id) },
    });

    return successResponse({ message: "刪除成功" });
  } catch (error) {
    console.error("Delete contact message error:", error);
    return errorResponse("刪除聯絡訊息失敗");
  }
}
