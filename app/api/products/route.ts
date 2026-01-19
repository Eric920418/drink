import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// 獲取所有產品（公開 API）
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get("category");
    const featured = searchParams.get("featured");

    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        ...(categorySlug && {
          category: { slug: categorySlug },
        }),
        ...(featured === "true" && { isFeatured: true }),
      },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        sizes: {
          where: { product: { isActive: true } },
          orderBy: { order: "asc" },
        },
        toppings: {
          where: { isAvailable: true },
          orderBy: { order: "asc" },
        },
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Get products error:", error);
    return NextResponse.json({ error: "獲取產品失敗" }, { status: 500 });
  }
}
