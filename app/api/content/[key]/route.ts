import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type RouteParams = { params: Promise<{ key: string }> };

// 獲取單個內容區塊（公開 API）
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { key } = await params;
  try {
    const contentBlock = await prisma.contentBlock.findUnique({
      where: { key },
    });

    if (!contentBlock) {
      return NextResponse.json({ error: "內容區塊不存在" }, { status: 404 });
    }

    return NextResponse.json(contentBlock.payload);
  } catch (error) {
    console.error("Get content block error:", error);
    return NextResponse.json({ error: "獲取內容失敗" }, { status: 500 });
  }
}
