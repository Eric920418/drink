import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkAdminAuth, errorResponse, successResponse } from "@/lib/api-auth";

type RouteParams = { params: Promise<{ key: string }> };

// 獲取單個內容區塊
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { key } = await params;
  try {
    const contentBlock = await prisma.contentBlock.findUnique({
      where: { key },
    });

    if (!contentBlock) {
      return errorResponse("內容區塊不存在", 404);
    }

    return successResponse(contentBlock);
  } catch (error) {
    console.error("Get content block error:", error);
    return errorResponse("獲取內容區塊失敗");
  }
}

// 更新內容區塊
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { key } = await params;
  const auth = await checkAdminAuth();
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const { payload } = body;

    const contentBlock = await prisma.contentBlock.upsert({
      where: { key },
      update: { payload: payload || {} },
      create: { key, payload: payload || {} },
    });

    return successResponse(contentBlock);
  } catch (error) {
    console.error("Update content block error:", error);
    return errorResponse("更新內容區塊失敗");
  }
}

// 刪除內容區塊
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { key } = await params;
  const auth = await checkAdminAuth();
  if (!auth.authorized) return auth.response;

  try {
    await prisma.contentBlock.delete({
      where: { key },
    });

    return successResponse({ message: "刪除成功" });
  } catch (error) {
    console.error("Delete content block error:", error);
    return errorResponse("刪除內容區塊失敗");
  }
}
