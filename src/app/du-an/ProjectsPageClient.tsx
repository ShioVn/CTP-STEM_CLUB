"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ExternalLink, Calendar, Plus, X, Upload } from "lucide-react"
import Image from "next/image"

const categories = ["Tất cả", "Robot", "In 3D", "CNC", "Arduino/IoT", "Thiết kế", "Khác"]

const catColorMap: Record<string, string> = {
  Robot: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  "In 3D": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  CNC: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "Arduino/IoT": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Thiết kế": "bg-pink-500/20 text-pink-400 border-pink-500/30",
  Khác: "bg-slate-500/20 text-slate-400 border-slate-500/30",
}

interface ProjectsPageClientProps {
  initialProjects: any[]
  userRole: string
}

export default function ProjectsPageClient({ initialProjects, userRole }: ProjectsPageClientProps) {
  const [selected, setSelected] = useState("Tất cả")
  const [search, setSearch] = useState("")
  const [showModal, setShowModal] = useState(false)
  
  // Form state
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("Robot")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const filtered = initialProjects.filter((p) => {
    const matchCat = selected === "Tất cả" || p.category === selected
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          description,
          images: imageUrl ? [imageUrl] : [],
          slug: title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]/g, "") + "-" + Date.now()
        })
      })

      if (res.ok) {
        alert("Gửi dự án thành công! Vui lòng chờ Admin duyệt.")
        setShowModal(false)
        setTitle("")
        setDescription("")
        setImageUrl("")
      } else {
        alert("Có lỗi xảy ra.")
      }
    } catch (err) {
      alert("Có lỗi xảy ra.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen py-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
          <div className="accent-bar" />
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                Dự Án & <span className="text-gradient-cyan">Hoạt Động</span>
              </h1>
              <p className="text-slate-400 text-lg max-w-2xl">
                Tổng hợp các dự án sáng tạo, nghiên cứu và sản phẩm được tạo ra bởi các thành viên CTP Scientia.
              </p>
            </div>
            {(userRole === "ADMIN" || userRole === "MEMBER") && (
              <button 
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
              >
                <Plus size={20} />
                Đăng Dự Án
              </button>
            )}
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10">
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelected(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  selected === cat ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30" : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64 shrink-0">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm dự án..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all text-sm"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.length > 0 ? (
              filtered.map((project) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={project.id}
                  className="group relative rounded-2xl overflow-hidden glass border border-white/10 flex flex-col h-full card-hover"
                >
                  <div className="relative aspect-video overflow-hidden bg-[#1E2937]">
                    {project.images && project.images[0] ? (
                      <Image src={project.images[0]} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500">
                        <Image src="/images/logo.png" alt="CTP" width={60} height={60} className="opacity-20" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border ${catColorMap[project.category] || catColorMap["Khác"]}`}>
                      {project.category}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow relative z-10">
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-5 line-clamp-3 leading-relaxed flex-grow">
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
                          {project.author?.avatar || "U"}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-slate-300">{project.author?.name}</p>
                          <p className="text-[10px] text-slate-500 flex items-center gap-1">
                            <Calendar size={10} />
                            {new Date(project.createdAt).toLocaleDateString("vi-VN")}
                          </p>
                        </div>
                      </div>
                      <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-cyan-500 transition-colors">
                        <ExternalLink size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-20 text-center">
                <div className="w-24 h-24 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-6">
                  <Search size={32} className="text-slate-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Không tìm thấy dự án</h3>
                <p className="text-slate-400">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Submit Project Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0F172A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#1E2937]/50">
                <h3 className="text-xl font-bold text-white">Đăng Dự Án Mới</h3>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Tên dự án <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-3 bg-[#1E2937] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all outline-none"
                      placeholder="VD: Cánh tay robot 6 bậc tự do"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Lĩnh vực <span className="text-red-400">*</span></label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-[#1E2937] border border-white/10 rounded-xl text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all outline-none appearance-none"
                    >
                      {categories.filter(c => c !== "Tất cả").map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Mô tả dự án <span className="text-red-400">*</span></label>
                    <textarea
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 bg-[#1E2937] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all outline-none resize-none"
                      placeholder="Mô tả ngắn gọn về dự án, mục đích và công nghệ sử dụng..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Link ảnh (tùy chọn)</label>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full px-4 py-3 bg-[#1E2937] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all outline-none"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="pt-4 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-6 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/5 transition-colors"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white disabled:opacity-70 hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                    >
                      {submitting ? "Đang gửi..." : "Gửi Dự Án"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
