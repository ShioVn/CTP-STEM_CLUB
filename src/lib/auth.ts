import NextAuth, { DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { USERS } from "@/config/users"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
    } & DefaultSession["user"]
  }

  interface User {
    role: string
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role?: string
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Tên đăng nhập", type: "text" },
        password: { label: "Mật khẩu", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }
        
        const user = USERS.find(u => u.username === credentials.username && u.password === credentials.password)
        
        if (user) {
          return {
            id: user.id,
            name: user.name,
            role: user.role,
            image: user.avatar
          }
        }
        
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.sub = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      if (token.role && session.user) {
        session.user.role = token.role as string
      }
      return session
    }
  },
  pages: {
    signIn: "/dang-nhap",
  }
})

// Frontend role helpers
export const isAdmin = (user?: { role?: string }) => {
  return user?.role === "ADMIN"
}

export const isMember = (user?: { role?: string }) => {
  return user?.role === "MEMBER" || user?.role === "ADMIN"
}

export const isGuest = (user?: { role?: string }) => {
  return !user?.role || user?.role === "GUEST"
}
