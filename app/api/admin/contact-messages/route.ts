import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkAdminAuth, errorResponse, successResponse } from "@/lib/api-auth";

// 獲取所有聯絡訊息
export async function GET() {
  const auth = await checkAdminAuth();
  if (!auth.authorized) return auth.response;

  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });

    return successResponse(messages);
  } catch (error) {
    console.error("Get contact messages error:", error);
    return errorResponse("獲取聯絡訊息失敗");
  }
}
