import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

// Cloudflare R2 配置
const R2_ENDPOINT = process.env.R2_ENDPOINT || "";
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || "drink";
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || "";
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY || "";
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || "";

// 建立 S3 Client（R2 兼容 S3 API）
const s3Client = new S3Client({
  region: "auto",
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

// 檢查 R2 是否已配置
export function isR2Configured(): boolean {
  return !!(R2_ENDPOINT && R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY);
}

// 生成唯一的文件名
function generateUniqueFileName(originalName: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split(".").pop() || "";
  const baseName = originalName
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, "-")
    .toLowerCase();
  return `${baseName}-${timestamp}-${randomString}.${extension}`;
}

// 上傳圖片到 R2
export async function uploadImageToR2(
  file: File | Buffer,
  fileName?: string,
  folder: string = "images"
): Promise<{ success: boolean; url?: string; error?: string }> {
  if (!isR2Configured()) {
    return { success: false, error: "R2 storage is not configured" };
  }

  try {
    let buffer: Buffer;
    let contentType: string;
    let finalFileName: string;

    if (file instanceof File) {
      buffer = Buffer.from(await file.arrayBuffer());
      contentType = file.type || "image/jpeg";
      finalFileName = generateUniqueFileName(fileName || file.name);
    } else {
      buffer = file;
      contentType = "image/jpeg";
      finalFileName = generateUniqueFileName(fileName || "image.jpg");
    }

    const key = `${folder}/${finalFileName}`;

    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    });

    await s3Client.send(command);

    // 返回公開 URL
    const url = R2_PUBLIC_URL ? `${R2_PUBLIC_URL}/${key}` : `${R2_ENDPOINT}/${R2_BUCKET_NAME}/${key}`;

    return { success: true, url };
  } catch (error) {
    console.error("R2 upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}

// 從 R2 刪除圖片
export async function deleteImageFromR2(
  url: string
): Promise<{ success: boolean; error?: string }> {
  if (!isR2Configured()) {
    return { success: false, error: "R2 storage is not configured" };
  }

  try {
    // 從 URL 中提取 key
    let key = url;
    if (R2_PUBLIC_URL && url.startsWith(R2_PUBLIC_URL)) {
      key = url.replace(`${R2_PUBLIC_URL}/`, "");
    } else if (url.includes(R2_BUCKET_NAME)) {
      key = url.split(`${R2_BUCKET_NAME}/`)[1];
    }

    const command = new DeleteObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
    });

    await s3Client.send(command);
    return { success: true };
  } catch (error) {
    console.error("R2 delete error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Delete failed",
    };
  }
}

// 從 R2 獲取圖片
export async function getImageFromR2(
  key: string
): Promise<{ success: boolean; data?: Buffer; contentType?: string; error?: string }> {
  if (!isR2Configured()) {
    return { success: false, error: "R2 storage is not configured" };
  }

  try {
    const command = new GetObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
    });

    const response = await s3Client.send(command);

    if (response.Body) {
      const chunks: Uint8Array[] = [];
      for await (const chunk of response.Body as AsyncIterable<Uint8Array>) {
        chunks.push(chunk);
      }
      const buffer = Buffer.concat(chunks);

      return {
        success: true,
        data: buffer,
        contentType: response.ContentType || "image/jpeg",
      };
    }

    return { success: false, error: "Empty response" };
  } catch (error) {
    console.error("R2 get error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Get failed",
    };
  }
}

export { s3Client, R2_BUCKET_NAME };
