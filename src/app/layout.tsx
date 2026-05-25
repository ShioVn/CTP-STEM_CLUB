import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { ThemeProvider } from "@/components/providers/ThemeProvider"

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "CTP Scientia - Câu lạc bộ STEM",
    template: "%s | CTP Scientia",
  },
  description:
    "CTP Scientia - Câu lạc bộ Khoa học Kỹ thuật STEM chuyên về Robot, In 3D, Cắt CNC, Arduino, IoT, Thiết kế kỹ thuật và các dự án thực hành sáng tạo.",
  keywords: [
    "CTP Scientia",
    "STEM Club",
    "Robot",
    "In 3D",
    "Arduino",
    "IoT",
    "Trần Phú",
    "Hải Phòng",
  ],
  authors: [{ name: "CTP Scientia Team" }],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://tranphuchuyen.com",
    siteName: "CTP Scientia",
    title: "CTP Scientia - Câu lạc bộ STEM",
    description:
      "Khám phá - Sáng tạo - Thực hành STEM cùng CTP Scientia",
  },
  twitter: {
    card: "summary_large_image",
    title: "CTP Scientia - Câu lạc bộ STEM",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${inter.variable} font-sans`} suppressHydrationWarning>
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen pt-16 md:pt-20">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
