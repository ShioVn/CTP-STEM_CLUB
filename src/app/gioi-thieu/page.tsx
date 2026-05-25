import type { Metadata } from "next"
import AboutPageClient from "./AboutPageClient"

export const metadata: Metadata = {
  title: "Giới Thiệu",
  description:
    "Tìm hiểu về CTP Scientia — lịch sử hình thành, sứ mệnh, tầm nhìn và đội ngũ ban chủ nhiệm của câu lạc bộ STEM.",
}

export default function AboutPage() {
  return <AboutPageClient />
}
