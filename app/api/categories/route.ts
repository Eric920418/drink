import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// 獲取所有分類（公開 API）
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Get categories error:", error);
    return NextResponse.json({ error: "獲取分類失敗" }, { status: 500 });
  }
}
