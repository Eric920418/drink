import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkAdminAuth, errorResponse, successResponse } from "@/lib/api-auth";

// 獲取所有產品
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");
    const isActive = searchParams.get("isActive");

    const products = await prisma.product.findMany({
      where: {
        ...(categoryId && { categoryId: parseInt(categoryId) }),
        ...(isActive !== null && { isActive: isActive === "true" }),
      },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      include: {
        category: true,
        sizes: {
          orderBy: { order: "asc" },
        },
        toppings: {
          orderBy: { order: "asc" },
        },
      },
    });

    return successResponse(products);
  } catch (error) {
    console.error("Get products error:", error);
    return errorResponse("獲取產品失敗");
  }
}

// 創建產品
export async function POST(request: NextRequest) {
  const auth = await checkAdminAuth();
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const {
      name,
      slug,
      description,
      price,
      image,
      categoryId,
      sizes,
      toppings,
      isActive,
      isFeatured,
      isNew,
      order,
      calories,
      tags,
    } = body;

    if (!name || !slug || !price || !categoryId) {
      return errorResponse("名稱、slug、價格和分類為必填", 400);
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price: parseInt(price),
        image,
        categoryId: parseInt(categoryId),
        isActive: isActive !== false,
        isFeatured: isFeatured === true,
        isNew: isNew === true,
        order: order || 0,
        calories: calories ? parseInt(calories) : null,
        tags: tags || [],
        sizes: sizes
          ? {
              create: sizes.map((size: { name: string; priceAdd: number; isDefault?: boolean; order?: number }, index: number) => ({
                name: size.name,
                priceAdd: size.priceAdd || 0,
                isDefault: size.isDefault || false,
                order: size.order ?? index,
              })),
            }
          : undefined,
        toppings: toppings
          ? {
              create: toppings.map((topping: { name: string; price: number; isAvailable?: boolean; order?: number }, index: number) => ({
                name: topping.name,
                price: topping.price || 0,
                isAvailable: topping.isAvailable !== false,
                order: topping.order ?? index,
              })),
            }
          : undefined,
      },
      include: {
        category: true,
        sizes: true,
        toppings: true,
      },
    });

    return successResponse(product, 201);
  } catch (error) {
    console.error("Create product error:", error);
    return errorResponse("創建產品失敗");
  }
}
