import type { Metadata } from "next"
import MembersPageClient from "./MembersPageClient"

export const metadata: Metadata = {
  title: "Thành Viên",
  description: "Danh bạ thành viên CTP Scientia — tìm kiếm và kết nối với các thành viên trong câu lạc bộ STEM.",
}

export default function MembersPage() {
  return <MembersPageClient />
}
