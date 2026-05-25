import ProfilePageClient from "./ProfilePageClient"
import { USERS } from "@/config/users"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const user = USERS.find(u => u.id === resolvedParams.id);

  if (!user) {
    redirect("/")
  }

  const projects = await prisma.project.findMany({
    where: { authorId: user.id },
    orderBy: { createdAt: 'desc' }
  })

  return <ProfilePageClient user={user} projects={projects} />
}
