import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkAdminAuth, errorResponse, successResponse } from "@/lib/api-auth";

type RouteParams = { params: Promise<{ id: string }> };

// 獲取單個產品
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
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

    if (!product) {
      return errorResponse("產品不存在", 404);
    }

    return successResponse(product);
  } catch (error) {
    console.error("Get product error:", error);
    return errorResponse("獲取產品失敗");
  }
}

// 更新產品
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
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

    const productId = parseInt(id);

    // 更新產品基本資訊
    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        ...(name && { name }),
        ...(slug && { slug }),
        ...(description !== undefined && { description }),
        ...(price !== undefined && { price: parseInt(price) }),
        ...(image !== undefined && { image }),
        ...(categoryId && { categoryId: parseInt(categoryId) }),
        ...(isActive !== undefined && { isActive }),
        ...(isFeatured !== undefined && { isFeatured }),
        ...(isNew !== undefined && { isNew }),
        ...(order !== undefined && { order }),
        ...(calories !== undefined && { calories: calories ? parseInt(calories) : null }),
        ...(tags !== undefined && { tags }),
      },
    });

    // 更新尺寸（先刪除再創建）
    if (sizes !== undefined) {
      await prisma.productSize.deleteMany({
        where: { productId },
      });

      if (sizes.length > 0) {
        await prisma.productSize.createMany({
          data: sizes.map((size: { name: string; priceAdd: number; isDefault?: boolean; order?: number }, index: number) => ({
            productId,
            name: size.name,
            priceAdd: size.priceAdd || 0,
            isDefault: size.isDefault || false,
            order: size.order ?? index,
          })),
        });
      }
    }

    // 更新加料（先刪除再創建）
    if (toppings !== undefined) {
      await prisma.productTopping.deleteMany({
        where: { productId },
      });

      if (toppings.length > 0) {
        await prisma.productTopping.createMany({
          data: toppings.map((topping: { name: string; price: number; isAvailable?: boolean; order?: number }, index: number) => ({
            productId,
            name: topping.name,
            price: topping.price || 0,
            isAvailable: topping.isAvailable !== false,
            order: topping.order ?? index,
          })),
        });
      }
    }

    // 重新獲取完整產品資料
    const updatedProduct = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        category: true,
        sizes: { orderBy: { order: "asc" } },
        toppings: { orderBy: { order: "asc" } },
      },
    });

    return successResponse(updatedProduct);
  } catch (error) {
    console.error("Update product error:", error);
    return errorResponse("更新產品失敗");
  }
}

// 刪除產品
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const auth = await checkAdminAuth();
  if (!auth.authorized) return auth.response;

  try {
    await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    return successResponse({ message: "刪除成功" });
  } catch (error) {
    console.error("Delete product error:", error);
    return errorResponse("刪除產品失敗");
  }
}
