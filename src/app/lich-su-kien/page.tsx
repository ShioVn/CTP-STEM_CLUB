import type { Metadata } from "next"
import EventsPageClient from "./EventsPageClient"

export const metadata: Metadata = {
  title: "Lịch Sự Kiện",
  description: "Lịch sự kiện, workshop và cuộc thi của CTP Scientia. Đăng ký tham gia các hoạt động STEM thú vị.",
}

export default function EventsPage() {
  return <EventsPageClient />
}
