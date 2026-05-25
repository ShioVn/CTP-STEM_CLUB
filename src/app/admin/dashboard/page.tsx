import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import AdminDashboardClient from "./AdminDashboardClient"
import { USERS } from "@/config/users"

export const dynamic = "force-dynamic"

export default async function AdminDashboardPage() {
  const session = await auth()
  
  if (!session || session.user.role !== "ADMIN") {
    redirect("/")
  }

  const pendingProjects = await prisma.project.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: { name: true }
      }
    }
  })

  const approvedProjects = await prisma.project.findMany({
    where: { status: "APPROVED" },
    orderBy: { createdAt: "desc" }
  })

  // We are using hardcoded users, so we can just pass them directly
  // In a real DB we would fetch them from prisma.user.findMany()
  const users = USERS

  const registrationRequests = await prisma.registrationRequest.findMany({
    orderBy: { createdAt: "desc" }
  })

  return (
    <AdminDashboardClient 
      pendingProjects={pendingProjects} 
      approvedProjects={approvedProjects}
      users={users} 
      registrationRequests={registrationRequests}
    />
  )
}
