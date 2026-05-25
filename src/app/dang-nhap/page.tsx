import type { Metadata } from "next"
import LoginPageClient from "./LoginPageClient"

export const metadata: Metadata = {
  title: "Đăng Nhập",
  description: "Đăng nhập vào hệ thống CTP Scientia để tham gia cộng đồng STEM.",
}

export default function LoginPage() {
  return <LoginPageClient />
}
