import type { Metadata } from "next"
import RegisterPageClient from "./RegisterPageClient"

export const metadata: Metadata = {
  title: "Đăng ký thành viên",
  description: "Gửi yêu cầu đăng ký thành viên CTP Scientia.",
}

export default function RegisterPage() {
  return <RegisterPageClient />
}
