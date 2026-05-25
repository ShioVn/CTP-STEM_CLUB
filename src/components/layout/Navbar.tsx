"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Sun, Moon, User, LogIn, ChevronDown, Settings, LogOut } from "lucide-react"
import { useTheme } from "@/components/providers/ThemeProvider"
import { cn } from "@/lib/utils"
import { useSession, signOut } from "next-auth/react"

const navLinks = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "/gioi-thieu" },
  { label: "Dự án", href: "/du-an" },
  { label: "Thành viên", href: "/thanh-vien" },
]

export default function Navbar() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const { data: session } = useSession()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "glass shadow-lg shadow-black/30"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-14 h-14 md:w-20 md:h-20">
                <Image
                  src="/images/logo.png"
                  alt="CTP Scientia Logo"
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-gradient-cyan block leading-tight">
                  CTP Scientia
                </span>
                <span className="text-sm text-slate-400 leading-tight">STEM Club</span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    pathname === link.href
                      ? "text-cyan-400 bg-cyan-400/10"
                      : "text-slate-300 hover:text-cyan-400 hover:bg-white/5"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-white/5 transition-all"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Auth */}
              <div className="hidden md:flex items-center gap-2 relative">
                {session ? (
                  <>
                    <button
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/5 transition-all"
                    >
                      <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                        {session.user?.image || <User size={16} />}
                      </div>
                      <span className="font-medium max-w-[100px] truncate">{session.user?.name}</span>
                      <ChevronDown size={14} className={cn("transition-transform", userDropdownOpen && "rotate-180")} />
                    </button>
                    
                    <AnimatePresence>
                      {userDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full right-0 mt-2 w-48 glass rounded-xl overflow-hidden shadow-2xl border border-white/10"
                          onMouseLeave={() => setUserDropdownOpen(false)}
                        >
                          {session.user.role === "ADMIN" && (
                            <Link href="/admin/dashboard" className="flex items-center gap-2 px-4 py-3 text-sm text-cyan-400 hover:bg-white/5 transition-colors font-medium">
                              <Settings size={16} /> Admin Dashboard
                            </Link>
                          )}
                          <Link href={`/tai-khoan/${session.user.id}`} className="flex items-center gap-2 px-4 py-3 text-sm text-slate-300 hover:text-cyan-400 hover:bg-white/5 transition-colors">
                            <User size={16} /> Hồ sơ của tôi
                          </Link>
                          <button
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-white/5 transition-colors text-left"
                          >
                            <LogOut size={16} /> Đăng xuất
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href="/dang-nhap"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all hover:scale-105"
                  >
                    <LogIn size={16} />
                    Đăng nhập
                  </Link>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-white/5 transition-all"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div className="absolute right-0 top-0 h-full w-72 glass overflow-y-auto pt-24">
              <div className="p-6 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all",
                      pathname === link.href
                        ? "text-cyan-400 bg-cyan-400/10"
                        : "text-slate-300 hover:text-cyan-400 hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="pt-4 border-t border-white/10 space-y-2">
                  {session ? (
                    <>
                      {session.user.role === "ADMIN" && (
                        <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-cyan-400 hover:bg-white/5 transition-all font-medium">
                          <Settings size={18} /> Admin Dashboard
                        </Link>
                      )}
                      <Link href={`/tai-khoan/${session.user.id}`} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-cyan-400 hover:bg-white/5 transition-all">
                        <User size={18} /> Hồ sơ của tôi
                      </Link>
                      <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-white/5 transition-all text-left"
                      >
                        <LogOut size={18} /> Đăng xuất
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/dang-nhap"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                    >
                      <LogIn size={16} />
                      Đăng nhập
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
