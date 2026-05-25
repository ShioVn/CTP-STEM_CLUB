"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Lock, Mail, ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const skillsList = ["Robot", "In 3D", "IoT", "Arduino", "Thiết kế", "CNC", "Lập trình", "Truyền thông"]
const depts = ["Ban Kỹ Thuật", "Ban Truyền Thông", "Ban Nội Dung"]

export default function RegisterPageClient() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    department: "Ban Kỹ Thuật",
    skills: [] as string[],
    bio: ""
  })

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill) 
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        setSuccess(true)
      } else {
        const data = await res.json()
        alert(data.error || "Có lỗi xảy ra, vui lòng thử lại.")
      }
    } catch (err) {
      alert("Lỗi kết nối. Vui lòng kiểm tra lại mạng.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full bg-[#1E2937]/80 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-10 shadow-2xl relative z-10"
      >
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-black text-white mb-2">Yêu Cầu Tham Gia</h1>
                <p className="text-slate-400">Gửi thông tin đăng ký để Admin xét duyệt.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Họ và tên</label>
                    <div className="relative">
                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input 
                        type="text" required
                        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full pl-11 pr-4 py-3 bg-[#0F172A] border border-white/10 rounded-xl text-slate-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none" 
                        placeholder="Nguyễn Văn A" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Tên đăng nhập</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input 
                        type="text" required
                        value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})}
                        className="w-full pl-11 pr-4 py-3 bg-[#0F172A] border border-white/10 rounded-xl text-slate-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none" 
                        placeholder="nguyenvana" 
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Mật khẩu</label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input 
                      type="password" required
                      value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
                      className="w-full pl-11 pr-4 py-3 bg-[#0F172A] border border-white/10 rounded-xl text-slate-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none" 
                      placeholder="••••••••" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Ban nguyện vọng</label>
                  <select 
                    value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})}
                    className="w-full px-4 py-3 bg-[#0F172A] border border-white/10 rounded-xl text-slate-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                  >
                    {depts.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Kỹ năng</label>
                  <div className="flex flex-wrap gap-2">
                    {skillsList.map(skill => (
                      <button
                        key={skill} type="button"
                        onClick={() => toggleSkill(skill)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                          formData.skills.includes(skill) ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/50" : "bg-white/5 text-slate-400 border-white/10 hover:border-white/20"
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Giới thiệu ngắn</label>
                  <textarea 
                    value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 bg-[#0F172A] border border-white/10 rounded-xl text-slate-200 focus:border-cyan-500 outline-none resize-none" 
                    placeholder="Hãy chia sẻ một chút về đam mê của bạn..." 
                  />
                </div>

                <button 
                  type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 mt-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-70"
                >
                  {loading ? "Đang gửi..." : "Gửi Đơn Tham Gia"}
                  {!loading && <ArrowRight size={18} />}
                </button>

                <p className="text-center text-sm text-slate-400 mt-6">
                  Đã có tài khoản?{" "}
                  <Link href="/dang-nhap" className="text-cyan-400 hover:underline font-medium">
                    Đăng nhập ngay
                  </Link>
                </p>
              </form>
            </motion.div>
          ) : (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
              <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Gửi yêu cầu thành công!</h2>
              <p className="text-slate-400 mb-8 max-w-sm mx-auto">
                Đơn đăng ký của bạn đã được gửi tới Ban Quản Trị. Vui lòng chờ Admin phê duyệt để tài khoản của bạn được cấp quyền chính thức.
              </p>
              <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F172A] border border-white/10 text-white font-medium hover:bg-white/5 transition-all">
                Về trang chủ
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
