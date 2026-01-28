import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// 禁用緩存，確保每次都獲取最新數據
export const dynamic = 'force-dynamic';

// 公開 API：獲取網站設定
export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany();

    // 轉換為 key-value 對象
    const settingsObject: Record<string, string> = {};
    settings.forEach((setting) => {
      settingsObject[setting.key] = setting.value;
    });

    return NextResponse.json(settingsObject);
  } catch (error) {
    console.error("Get settings error:", error);
    return NextResponse.json({ error: "獲取設定失敗" }, { status: 500 });
  }
}
