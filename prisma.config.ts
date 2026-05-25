import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Dán trực tiếp chuỗi kết nối Supabase của bạn vào đây
    url: "postgresql://postgres.mbcajtfwrhaolcjkfsda:j90Id6ysaTuTWImE@aws-1-ap-northeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true",
  },
});