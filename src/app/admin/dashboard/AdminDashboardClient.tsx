"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, X, Users, Box, Calendar, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface Project {
  id: string
  title: string
  category: string
  status: string
  author?: { name: string | null } | null
  createdAt: Date | string
}

interface AdminDashboardClientProps {
  pendingProjects: Project[]
  approvedProjects: Project[]
  users: any[]
  registrationRequests?: any[]
}

export default function AdminDashboardClient({ pendingProjects, approvedProjects, users, registrationRequests = [] }: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState("projects")
  const router = useRouter()

  const handleProjectStatus = async (projectId: string, status: "APPROVED" | "REJECTED") => {
    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      })

      if (res.ok) {
        alert(`Dự án đã được ${status === "APPROVED" ? "duyệt" : "từ chối"}.`)
        router.refresh()
      } else {
        alert("Có lỗi xảy ra.")
      }
    } catch (err) {
      alert("Có lỗi xảy ra.")
    }
  }

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa dự án này?")) return

    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      })

      if (res.ok) {
        alert("Dự án đã được xóa.")
        router.refresh()
      } else {
        alert("Có lỗi xảy ra.")
      }
    } catch (err) {
      alert("Có lỗi xảy ra.")
    }
  }

  const handleDeleteRequest = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa yêu cầu này? (Đã xử lý hoặc Từ chối)")) return

    try {
      const res = await fetch(`/api/register/${id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        alert("Yêu cầu đã được xóa.")
        router.refresh()
      } else {
        alert("Có lỗi xảy ra.")
      }
    } catch (err) {
      alert("Có lỗi xảy ra.")
    }
  }

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === "projects" ? "bg-cyan-500 text-white" : "bg-[#1E2937] text-slate-400 hover:text-white"
            }`}
          >
            <Box size={18} /> Quản lý Dự Án
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === "users" ? "bg-cyan-500 text-white" : "bg-[#1E2937] text-slate-400 hover:text-white"
            }`}
          >
            <Users size={18} /> Quản lý Thành Viên
          </button>
          <button
            onClick={() => setActiveTab("requests")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === "requests" ? "bg-cyan-500 text-white" : "bg-[#1E2937] text-slate-400 hover:text-white"
            }`}
          >
            <Calendar size={18} /> Yêu Cầu Đăng Ký
            {registrationRequests.length > 0 && (
              <span className="ml-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{registrationRequests.length}</span>
            )}
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "projects" && (
          <div className="space-y-8">
            {/* Pending Projects */}
            <div className="bg-[#1E2937] rounded-2xl p-6 border border-white/5">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                Dự án chờ duyệt ({pendingProjects.length})
              </h2>
              {pendingProjects.length === 0 ? (
                <p className="text-slate-400">Không có dự án nào đang chờ duyệt.</p>
              ) : (
                <div className="space-y-4">
                  {pendingProjects.map(p => (
                    <div key={p.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#0F172A] p-4 rounded-xl border border-white/5 gap-4">
                      <div>
                        <h3 className="font-bold text-white">{p.title}</h3>
                        <p className="text-sm text-slate-400">Bởi: {p.author?.name || "Ẩn danh"} • Thể loại: {p.category}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => handleProjectStatus(p.id, "APPROVED")}
                          className="flex items-center gap-1 px-4 py-2 bg-green-500/20 text-green-400 hover:bg-green-500 hover:text-white rounded-lg transition-colors text-sm font-medium"
                        >
                          <Check size={16} /> Duyệt
                        </button>
                        <button
                          onClick={() => handleProjectStatus(p.id, "REJECTED")}
                          className="flex items-center gap-1 px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors text-sm font-medium"
                        >
                          <X size={16} /> Từ chối
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Approved Projects */}
            <div className="bg-[#1E2937] rounded-2xl p-6 border border-white/5">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                Dự án đã duyệt ({approvedProjects.length})
              </h2>
              {approvedProjects.length === 0 ? (
                <p className="text-slate-400">Chưa có dự án nào.</p>
              ) : (
                <div className="space-y-4">
                  {approvedProjects.map(p => (
                    <div key={p.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#0F172A] p-4 rounded-xl border border-white/5 gap-4">
                      <div>
                        <h3 className="font-bold text-white">{p.title}</h3>
                        <p className="text-sm text-slate-400">Thể loại: {p.category}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteProject(p.id)}
                        className="flex items-center gap-1 px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors text-sm font-medium shrink-0"
                      >
                        <Trash2 size={16} /> Xóa
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="bg-[#1E2937] rounded-2xl p-6 border border-white/5">
            <h2 className="text-xl font-bold text-white mb-6">Thành viên ({users.length})</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 px-4 text-slate-400 font-medium text-sm">Tên</th>
                    <th className="py-3 px-4 text-slate-400 font-medium text-sm">Username</th>
                    <th className="py-3 px-4 text-slate-400 font-medium text-sm">Vai trò</th>
                    <th className="py-3 px-4 text-slate-400 font-medium text-sm">Ban</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 text-white font-medium">{u.name}</td>
                      <td className="py-3 px-4 text-slate-300">{u.username}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${u.role === 'ADMIN' ? 'bg-purple-500/20 text-purple-400' : 'bg-cyan-500/20 text-cyan-400'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400">{u.department}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-sm text-slate-500 mt-4 italic">* Danh sách thành viên được cấu hình cứng (hardcoded) trong config/users.ts. Admin quản lý thành viên bằng cách chỉnh sửa file này.</p>
            </div>
          </div>
        )}

        {activeTab === "requests" && (
          <div className="bg-[#1E2937] rounded-2xl p-6 border border-white/5">
            <h2 className="text-xl font-bold text-white mb-6">Yêu Cầu Đăng Ký ({registrationRequests.length})</h2>
            {registrationRequests.length === 0 ? (
              <p className="text-slate-400">Không có yêu cầu đăng ký nào.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-3 px-4 text-slate-400 font-medium text-sm">Họ và tên</th>
                      <th className="py-3 px-4 text-slate-400 font-medium text-sm">Username / Mật khẩu</th>
                      <th className="py-3 px-4 text-slate-400 font-medium text-sm">Ban & Kỹ năng</th>
                      <th className="py-3 px-4 text-slate-400 font-medium text-sm">Thời gian</th>
                      <th className="py-3 px-4 text-slate-400 font-medium text-sm text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrationRequests.map(req => (
                      <tr key={req.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-4 text-white font-medium">{req.name}</td>
                        <td className="py-4 px-4">
                          <p className="text-slate-300 font-medium">{req.username}</p>
                          <p className="text-slate-500 text-xs">Pw: {req.password}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-slate-300 text-sm">{req.department}</p>
                          <p className="text-slate-500 text-xs line-clamp-1">{req.skills.join(", ")}</p>
                        </td>
                        <td className="py-4 px-4 text-slate-400 text-sm">
                          {new Date(req.createdAt).toLocaleDateString("vi-VN")}
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={() => handleDeleteRequest(req.id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors text-sm font-medium"
                          >
                            <Trash2 size={14} /> Xóa / Đã xử lý
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-sm text-cyan-400/80 mt-4 bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/20 italic">
                  * Hệ thống xác thực dùng thông tin hardcoded. Vui lòng copy <b>Username</b>, <b>Password</b>, <b>Tên</b> và thêm vào <code>src/config/users.ts</code>. Sau khi thêm xong hãy bấm nút "Xóa / Đã xử lý".
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
