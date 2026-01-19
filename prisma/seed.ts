import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { hash } from "bcryptjs";
import "dotenv/config";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // 創建管理員帳號
  const hashedPassword = await hash("admin123", 12);
  await prisma.admin.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: hashedPassword,
      name: "管理員",
    },
  });
  console.log("Admin user created");

  // 創建分類
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "pure-tea" },
      update: {},
      create: { name: "純茶", slug: "pure-tea", order: 1 },
    }),
    prisma.category.upsert({
      where: { slug: "classic" },
      update: {},
      create: { name: "經典", slug: "classic", order: 2 },
    }),
    prisma.category.upsert({
      where: { slug: "special" },
      update: {},
      create: { name: "特調", slug: "special", order: 3 },
    }),
    prisma.category.upsert({
      where: { slug: "fruit" },
      update: {},
      create: { name: "水果", slug: "fruit", order: 4 },
    }),
  ]);
  console.log("Categories created");

  // 創建產品
  const products = [
    {
      name: "老欉紅茶",
      slug: "old-tree-black-tea",
      description: "嚴選台灣南投老欉紅茶，香氣濃郁回甘",
      price: 65,
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400",
      categorySlug: "pure-tea",
      isFeatured: true,
    },
    {
      name: "黑糖珍珠鮮奶",
      slug: "brown-sugar-pearl-milk",
      description: "手炒黑糖珍珠配上濃醇鮮奶，甜蜜療癒",
      price: 75,
      image: "https://images.unsplash.com/photo-1558857563-b371033873b8?w=400",
      categorySlug: "classic",
      isFeatured: true,
      isNew: true,
    },
    {
      name: "金萱烏龍",
      slug: "jinxuan-oolong",
      description: "帶有淡淡奶香的金萱烏龍，清新雅緻",
      price: 70,
      image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400",
      categorySlug: "pure-tea",
    },
    {
      name: "荔枝烏龍氣泡",
      slug: "lychee-oolong-sparkling",
      description: "清甜荔枝與烏龍茶的完美結合，氣泡感十足",
      price: 85,
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400",
      categorySlug: "fruit",
      isNew: true,
    },
    {
      name: "炭焙鐵觀音",
      slug: "charcoal-roasted-tieguanyin",
      description: "傳統炭火慢焙，茶韻深厚持久",
      price: 80,
      image: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=400",
      categorySlug: "special",
    },
    {
      name: "芝芝莓果",
      slug: "cheese-berry",
      description: "新鮮莓果搭配濃郁芝士奶蓋，酸甜濃郁",
      price: 90,
      image: "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=400",
      categorySlug: "special",
      isFeatured: true,
    },
  ];

  for (const product of products) {
    const category = categories.find((c) => c.slug === product.categorySlug);
    if (category) {
      await prisma.product.upsert({
        where: { slug: product.slug },
        update: {},
        create: {
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: product.price,
          image: product.image,
          categoryId: category.id,
          isFeatured: product.isFeatured || false,
          isNew: product.isNew || false,
        },
      });
    }
  }
  console.log("Products created");

  // 創建門市
  const stores = [
    {
      name: "信義旗艦店",
      slug: "xinyi-flagship",
      address: "台北市信義區信義路五段7號",
      phone: "(02) 2723-1234",
      openingHours: "10:00-22:00",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400",
      features: ["外帶", "內用", "包場"],
    },
    {
      name: "東區概念店",
      slug: "east-concept",
      address: "台北市大安區忠孝東路四段205號",
      phone: "(02) 2771-5678",
      openingHours: "11:00-23:00",
      image: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=400",
      features: ["外帶", "內用"],
    },
    {
      name: "西門形象店",
      slug: "ximen-image",
      address: "台北市萬華區西門町1號",
      phone: "(02) 2311-9012",
      openingHours: "11:00-00:00",
      image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400",
      features: ["外帶", "內用", "夜間營業"],
    },
  ];

  for (let i = 0; i < stores.length; i++) {
    const store = stores[i];
    await prisma.store.upsert({
      where: { slug: store.slug },
      update: {},
      create: {
        ...store,
        order: i + 1,
      },
    });
  }
  console.log("Stores created");

  // 創建活動
  const events = [
    {
      title: "春季新品上市",
      slug: "spring-new-products",
      subtitle: "櫻花季限定茶飲",
      description: "以日本進口櫻花為靈感，推出限定春季茶品系列",
      image: "https://images.unsplash.com/photo-1522120691812-dcdfb625f7d0?w=400",
      category: "新品",
      startDate: new Date("2026-03-01"),
      endDate: new Date("2026-04-30"),
      isFeatured: true,
    },
    {
      title: "會員日優惠",
      slug: "member-day",
      subtitle: "每月1號會員專屬",
      description: "會員獨享指定飲品半價優惠",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400",
      category: "優惠",
      isFeatured: true,
    },
    {
      title: "茶藝體驗課程",
      slug: "tea-workshop",
      subtitle: "週末工作坊",
      description: "跟著茶藝師學習泡茶技巧，每週六日 14:00-16:00",
      image: "https://images.unsplash.com/photo-1566416491817-7a6b0a675c20?w=400",
      category: "課程",
    },
  ];

  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    await prisma.event.upsert({
      where: { slug: event.slug },
      update: {},
      create: {
        ...event,
        order: i + 1,
      },
    });
  }
  console.log("Events created");

  // 創建促銷
  const promotions = [
    {
      title: "新會員禮",
      description: "首次註冊送50元折價券",
      icon: "gift",
    },
    {
      title: "好友分享",
      description: "推薦好友各得100元",
      icon: "users",
    },
    {
      title: "生日禮",
      description: "生日當月享免費升級",
      icon: "cake",
    },
  ];

  for (let i = 0; i < promotions.length; i++) {
    const promotion = promotions[i];
    await prisma.promotion.upsert({
      where: { id: i + 1 },
      update: {},
      create: {
        ...promotion,
        order: i + 1,
      },
    });
  }
  console.log("Promotions created");

  // 創建網站設定
  const settings = {
    siteName: "茶客棧 TeaInn",
    phone: "0800-TEA-TIME",
    email: "hello@teainn.tw",
    address: "台北市信義區信義路五段7號12樓",
    businessHours: "週一至週五 09:00-18:00",
    instagram: "https://instagram.com/teainn",
    facebook: "https://facebook.com/teainn",
    copyright: "© 2026 TeaInn. All rights reserved.",
  };

  for (const [key, value] of Object.entries(settings)) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
  console.log("Settings created");

  // 創建內容區塊
  const contentBlocks = [
    {
      key: "hero",
      payload: {
        title: "茶客棧",
        subtitle: "尋常品茗，不尋常的堅持",
        description: "我們相信，一杯好茶的背後，是對土地的尊重、對工藝的堅持、對顧客的用心。",
        backgroundImage: "/images/hero-bg.png",
        ctaText: "探索茶單",
        ctaLink: "#products",
      },
    },
    {
      key: "about",
      payload: {
        title: "茶的哲學",
        description: "茶客棧成立於 2020 年，以「尋常品茗，不尋常的堅持」為品牌理念。我們深入台灣各大茶區，與在地茶農建立長期合作關係，確保每一片茶葉都來自最佳產地。",
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600",
        quote: "茶，不只是飲品，更是一種生活態度",
        stats: [
          { value: "500+", label: "日均新鮮茶飲" },
          { value: "15+", label: "直營門市" },
          { value: "98%", label: "顧客滿意度" },
        ],
      },
    },
    {
      key: "contact",
      payload: {
        phone: "0800-TEA-TIME",
        email: "hello@teainn.tw",
        address: "台北市信義區信義路五段7號12樓",
        businessHours: "10:00-22:00",
      },
    },
    {
      key: "footer",
      payload: {
        description: "茶客棧 — 以傳統製茶工藝為根基，融合現代創新思維，為您呈獻每一杯用心調製的茶飲。",
        instagram: "https://instagram.com/teainn",
        facebook: "https://facebook.com/teainn",
        copyright: "© 2026 TeaInn. All rights reserved.",
      },
    },
  ];

  for (const block of contentBlocks) {
    await prisma.contentBlock.upsert({
      where: { key: block.key },
      update: { payload: block.payload },
      create: block,
    });
  }
  console.log("Content blocks created");

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
