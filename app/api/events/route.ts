import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// 獲取所有活動（公開 API）
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      where: { isActive: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("Get events error:", error);
    return NextResponse.json({ error: "獲取活動失敗" }, { status: 500 });
  }
}
