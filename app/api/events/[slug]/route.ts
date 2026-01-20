import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// 獲取單一活動（公開 API）
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const event = await prisma.event.findUnique({
      where: { slug },
    });

    if (!event) {
      return NextResponse.json({ error: "活動不存在" }, { status: 404 });
    }

    if (!event.isActive) {
      return NextResponse.json({ error: "活動已下架" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("Get event error:", error);
    return NextResponse.json({ error: "獲取活動失敗" }, { status: 500 });
  }
}
