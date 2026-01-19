import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkAdminAuth, errorResponse, successResponse } from "@/lib/api-auth";

// 獲取所有網站設定
export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany();

    // 轉換為 key-value 對象
    const settingsObject: Record<string, string> = {};
    settings.forEach((setting) => {
      settingsObject[setting.key] = setting.value;
    });

    return successResponse(settingsObject);
  } catch (error) {
    console.error("Get settings error:", error);
    return errorResponse("獲取設定失敗");
  }
}

// 更新網站設定（批量）
export async function POST(request: NextRequest) {
  const auth = await checkAdminAuth();
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();

    // body 應該是 { key1: value1, key2: value2, ... } 格式
    const entries = Object.entries(body);

    for (const [key, value] of entries) {
      await prisma.siteSetting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      });
    }

    return successResponse({ message: "設定已更新" });
  } catch (error) {
    console.error("Update settings error:", error);
    return errorResponse("更新設定失敗");
  }
}
