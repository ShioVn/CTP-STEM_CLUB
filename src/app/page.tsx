import type { Metadata } from "next"
import HeroSection from "@/components/home/HeroSection"

import ValuesSection from "@/components/home/ValuesSection"

export const metadata: Metadata = {
  title: "CTP Scientia - Câu lạc bộ STEM | Khám phá · Sáng tạo · Thực hành",
  description:
    "CTP Scientia là câu lạc bộ STEM tại THPT Chuyên Trần Phú, Hải Phòng — chuyên về Robot, In 3D, Arduino, IoT, Thiết kế kỹ thuật và các dự án thực hành sáng tạo.",
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ValuesSection />
    </>
  )
}
