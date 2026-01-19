import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// 獲取所有門市（公開 API）
export async function GET() {
  try {
    const stores = await prisma.store.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(stores);
  } catch (error) {
    console.error("Get stores error:", error);
    return NextResponse.json({ error: "獲取門市失敗" }, { status: 500 });
  }
}
