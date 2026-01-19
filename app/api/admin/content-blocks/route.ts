import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkAdminAuth, errorResponse, successResponse } from "@/lib/api-auth";

// 獲取所有內容區塊
export async function GET() {
  try {
    const contentBlocks = await prisma.contentBlock.findMany({
      orderBy: { key: "asc" },
    });

    return successResponse(contentBlocks);
  } catch (error) {
    console.error("Get content blocks error:", error);
    return errorResponse("獲取內容區塊失敗");
  }
}

// 創建或更新內容區塊
export async function POST(request: NextRequest) {
  const auth = await checkAdminAuth();
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const { key, payload } = body;

    if (!key) {
      return errorResponse("key 為必填", 400);
    }

    const contentBlock = await prisma.contentBlock.upsert({
      where: { key },
      update: { payload: payload || {} },
      create: { key, payload: payload || {} },
    });

    return successResponse(contentBlock);
  } catch (error) {
    console.error("Create/Update content block error:", error);
    return errorResponse("創建/更新內容區塊失敗");
  }
}
