import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { title, category, description, slug, images } = body

    if (!title || !category || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const project = await prisma.project.create({
      data: {
        title,
        category,
        description,
        slug,
        images: images || [],
        status: "PENDING",
        authorId: session.user.id
      }
    })

    return NextResponse.json({ success: true, project }, { status: 201 })
  } catch (error) {
    console.error("Project creation error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
