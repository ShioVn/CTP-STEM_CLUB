import type { Metadata } from "next"
import ProjectsPageClient from "./ProjectsPageClient"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export const metadata: Metadata = {
  title: "Dự Án & Hoạt Động",
  description: "Khám phá các dự án STEM sáng tạo của CTP Scientia: Robot, In 3D, IoT, Arduino, Thiết kế kỹ thuật và nhiều lĩnh vực khác.",
}

export const dynamic = "force-dynamic"

export default async function ProjectsPage() {
  const session = await auth()
  const userRole = session?.user?.role || "GUEST"

  const projects = await prisma.project.findMany({
    where: {
      status: "APPROVED"
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      author: {
        select: {
          name: true,
          avatar: true
        }
      }
    }
  })

  return <ProjectsPageClient initialProjects={projects} userRole={userRole} />
}
