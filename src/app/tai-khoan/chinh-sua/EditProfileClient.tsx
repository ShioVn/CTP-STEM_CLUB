"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, Phone, Code, Save, Camera, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EditProfileClient() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "Nguyễn Văn A",
    bio: "Đam mê lập trình và IoT.",
    age: 16,
    phone: "0123456789",
    socialLink: "https://github.com/nguyenvana"
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Tính năng chỉnh sửa hồ sơ tạm thời bị vô hiệu hoá trong phiên bản này vì danh sách thành viên được quản lý nội bộ.")
  }

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/tai-khoan/me" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-8">
          <ArrowLeft size={16} />
          <span>Quay lại hồ sơ</span>
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#1E2937] rounded-3xl border border-white/10 p-8 shadow-2xl">
          <h1 className="text-3xl font-bold text-white mb-8">Chỉnh sửa hồ sơ</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-6 mb-8">
              <div className="relative group cursor-pointer">
                <div className="w-24 h-24 rounded-2xl bg-[#0F172A] border-2 border-white/10 flex items-center justify-center overflow-hidden">
                  <User size={40} className="text-slate-400" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera size={24} className="text-white" />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">Ảnh đại diện</h3>
                <p className="text-sm text-slate-500">JPG, GIF hoặc PNG. Tối đa 5MB.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Họ và tên</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-11 pr-4 py-3 bg-[#0F172A] border border-white/10 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-all text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Tuổi</label>
                <div className="relative">
                  <input type="number" value={formData.age} onChange={(e) => setFormData({...formData, age: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 bg-[#0F172A] border border-white/10 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-all text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Giới thiệu bản thân (Bio)</label>
              <textarea value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} rows={4}
                className="w-full px-4 py-3 bg-[#0F172A] border border-white/10 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-all text-sm resize-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Số điện thoại</label>
                <div className="relative">
                  <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full pl-11 pr-4 py-3 bg-[#0F172A] border border-white/10 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-all text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Liên kết mạng xã hội (VD: Github)</label>
                <div className="relative">
                  <Code size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="url" value={formData.socialLink} onChange={(e) => setFormData({...formData, socialLink: e.target.value})}
                    className="w-full pl-11 pr-4 py-3 bg-[#0F172A] border border-white/10 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-all text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
              <Link href="/tai-khoan/me" className="px-6 py-3 rounded-xl border border-white/10 text-slate-300 font-medium hover:bg-white/5 transition-all">
                Hủy
              </Link>
              <button type="submit" disabled={loading} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-70">
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save size={18} /> Lưu thay đổi</>}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
