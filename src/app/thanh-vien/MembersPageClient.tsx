"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Code, Globe, Mail, Award, Layers, Cpu, Wifi, Pencil, Scissors } from "lucide-react"
import { USERS } from "@/config/users"
import Link from "next/link"

const members = USERS

const roleFilters = ["Tất cả", "ADMIN", "MEMBER"]
const deptFilters = ["Tất cả", "Ban Chủ Nhiệm", "Ban Kỹ Thuật", "Ban Truyền Thông"]
const skillFilters = ["Tất cả", "Robot", "In 3D", "IoT", "Arduino", "Thiết kế", "CNC", "Management", "STEM", "Design", "3D Printing"]

export default function MembersPageClient() {
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState("Tất cả")
  const [deptFilter, setDeptFilter] = useState("Tất cả")
  const [skillFilter, setSkillFilter] = useState("Tất cả")

  const filtered = members.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.username.toLowerCase().includes(search.toLowerCase())
    const matchRole = roleFilter === "Tất cả" || m.role === roleFilter
    const matchDept = deptFilter === "Tất cả" || m.department === deptFilter
    const matchSkill = skillFilter === "Tất cả" || m.skills?.includes(skillFilter)
    return matchSearch && matchRole && matchDept && matchSkill
  })

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="accent-bar" />
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            Thành Viên <span className="text-gradient-cyan">CLB</span>
          </h1>
          <p className="text-slate-400 text-lg">Cộng đồng các bạn trẻ đam mê STEM tại Trần Phú.</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { v: members.length, l: "Tổng thành viên", c: "text-cyan-400" },
            { v: members.filter(m => m.role === "ADMIN").length, l: "Admin", c: "text-purple-400" },
            { v: members.filter(m => m.department === "Ban Kỹ Thuật").length, l: "Ban Kỹ Thuật", c: "text-orange-400" },
            { v: members.filter(m => m.department === "Ban Truyền Thông").length, l: "Ban Truyền Thông", c: "text-green-400" },
          ].map(({ v, l, c }) => (
            <div key={l} className="bg-[#1E2937] rounded-2xl p-5 border border-white/5 text-center">
              <div className={`text-3xl font-black ${c}`}>{v}</div>
              <div className="text-slate-400 text-sm mt-1">{l}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" placeholder="Tìm kiếm thành viên..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#1E2937] border border-white/10 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors text-sm"
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <Filter size={15} className="text-slate-500" />
            <select 
              value={roleFilter} 
              onChange={(e) => setRoleFilter(e.target.value)} 
              className="px-3 py-2 rounded-xl text-xs font-medium border bg-[#1E2937] text-slate-400 border-white/10 hover:border-white/20 outline-none"
            >
              {roleFilters.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
            <select 
              value={deptFilter} 
              onChange={(e) => setDeptFilter(e.target.value)} 
              className="px-3 py-2 rounded-xl text-xs font-medium border bg-[#1E2937] text-slate-400 border-white/10 hover:border-white/20 outline-none"
            >
              {deptFilters.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
            <select 
              value={skillFilter} 
              onChange={(e) => setSkillFilter(e.target.value)} 
              className="px-3 py-2 rounded-xl text-xs font-medium border bg-[#1E2937] text-slate-400 border-white/10 hover:border-white/20 outline-none"
            >
              {skillFilters.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
        </motion.div>

        <p className="text-slate-500 text-sm mb-6">{filtered.length} thành viên</p>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((member, i) => (
            <Link key={member.id} href={`/tai-khoan/${member.id}`}>
              <motion.div initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                className="h-full bg-[#1E2937] rounded-2xl p-5 border border-white/5 card-hover group text-center cursor-pointer hover:border-white/15"
              >
                {/* Avatar */}
                <div className={`w-16 h-16 rounded-2xl ${member.role === 'ADMIN' ? 'bg-gradient-to-br from-purple-500 to-indigo-600' : 'bg-gradient-to-br from-cyan-500 to-blue-600'} flex items-center justify-center text-xl font-black text-white mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  {member.avatar}
                </div>

                <h3 className="font-bold text-white text-sm mb-0.5 group-hover:text-cyan-400 transition-colors">{member.name}</h3>
                <p className="text-xs text-slate-500 mb-1">@{member.username}</p>
                
                <div className="mt-2 mb-3">
                  <span className={`inline-block text-xs px-2 py-0.5 rounded-full ${member.role === 'ADMIN' ? 'bg-purple-500/15 text-purple-400 border border-purple-500/25' : 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/25'} mr-2`}>
                    {member.role}
                  </span>
                  {member.department && (
                    <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-slate-500/15 text-slate-400 border border-slate-500/25">
                      {member.department}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5 justify-center mt-3 mb-4">
                  {member.skills?.map((s: string) => (
                    <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/10">{s}</span>
                  ))}
                </div>

                <p className="text-xs text-slate-400 line-clamp-2">{member.bio}</p>
              </motion.div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            <div className="text-4xl mb-3">👤</div>
            <p>Không tìm thấy thành viên nào phù hợp.</p>
          </div>
        )}
      </div>
    </div>
  )
}
