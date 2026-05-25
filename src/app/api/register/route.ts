import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, username, password, department, skills, bio } = body

    if (!name || !username || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if request for this username already exists
    const existing = await prisma.registrationRequest.findUnique({
      where: { username }
    })

    if (existing) {
      return NextResponse.json({ error: "Tên đăng nhập này đã được đăng ký hoặc đang chờ duyệt." }, { status: 400 })
    }

    const request = await prisma.registrationRequest.create({
      data: {
        name,
        username,
        password,
        department,
        skills,
        bio
      }
    })

    return NextResponse.json({ success: true, request }, { status: 201 })
  } catch (error) {
    console.error("Registration request error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
