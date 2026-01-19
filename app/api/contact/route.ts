import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { errorResponse, successResponse } from "@/lib/api-auth";

// 提交聯絡表單（公開 API）
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, subject, message } = body;

    if (!name || !email || !message) {
      return errorResponse("姓名、電子郵件和訊息為必填", 400);
    }

    // 簡單的 email 格式驗證
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return errorResponse("請輸入有效的電子郵件地址", 400);
    }

    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        phone,
        email,
        subject,
        message,
      },
    });

    return successResponse({ message: "感謝您的訊息，我們會盡快回覆！" }, 201);
  } catch (error) {
    console.error("Submit contact message error:", error);
    return errorResponse("提交失敗，請稍後再試");
  }
}
