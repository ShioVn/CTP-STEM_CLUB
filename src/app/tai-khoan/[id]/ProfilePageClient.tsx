"use client"

import { motion } from "framer-motion"
import { User, Mail, Code, Edit, Briefcase, Award } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"

export default function ProfilePageClient({ user, projects }: { user: any, projects?: any[] }) {
  const { data: session } = useSession()
  const isOwner = session?.user?.id === user.id

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#1E2937] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="h-40 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 relative">
            <div className="absolute -bottom-16 left-8 flex items-end gap-6">
              <div className="w-32 h-32 rounded-2xl bg-[#0F172A] border-4 border-[#1E2937] flex items-center justify-center shadow-xl text-4xl font-black text-cyan-400">
                {user.avatar || <User size={64} className="text-slate-400" />}
              </div>
            </div>
            {isOwner && (
              <div className="absolute top-4 right-4">
                <Link href="/tai-khoan/chinh-sua" className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-white text-sm font-medium transition-colors">
                  <Edit size={16} />
                  Chỉnh sửa
                </Link>
              </div>
            )}
          </div>
          <div className="pt-20 px-8 pb-8">
            <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
            <div className="flex items-center gap-3 mb-6">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${user.role === 'ADMIN' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'}`}>
                {user.role}
              </span>
              <span className="text-slate-400 text-sm">@{user.username}</span>
            </div>
            <p className="text-slate-300 mb-8 max-w-2xl">{user.bio}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-400">
                  <Briefcase size={18} className="text-cyan-400" />
                  <span>Ban: {user.department || "Chưa cập nhật"}</span>
                </div>
                <div className="flex items-start gap-3 text-slate-400">
                  <Award size={18} className="text-orange-400 mt-1 shrink-0" />
                  <div className="flex flex-wrap gap-2">
                    {user.skills?.length > 0 ? (
                      user.skills.map((skill: string) => (
                        <span key={skill} className="px-2 py-1 rounded bg-white/5 text-xs border border-white/10">{skill}</span>
                      ))
                    ) : (
                      <span>Chưa cập nhật kỹ năng</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4">Dự án của {user.name}</h2>
              {projects && projects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {projects.map(p => (
                    <Link key={p.id} href="/du-an" className="block bg-[#0F172A] rounded-xl p-5 border border-white/5 hover:border-cyan-500/30 transition-colors group">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-white group-hover:text-cyan-400 transition-colors">{p.title}</h3>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          p.status === "APPROVED" ? "bg-green-500/20 text-green-400" :
                          p.status === "REJECTED" ? "bg-red-500/20 text-red-400" :
                          "bg-yellow-500/20 text-yellow-400"
                        }`}>
                          {p.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 line-clamp-2 mb-3">{p.description}</p>
                      <div className="flex justify-between items-center text-xs text-slate-500">
                        <span className="px-2 py-1 rounded bg-white/5">{p.category}</span>
                        <span>{new Date(p.createdAt).toLocaleDateString('vi-VN')}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="bg-[#0F172A] rounded-xl p-6 text-center border border-white/5">
                  <p className="text-slate-500">Thành viên này chưa có dự án nào được đăng.</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
