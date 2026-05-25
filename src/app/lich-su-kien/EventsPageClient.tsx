"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, MapPin, Clock, Users, CheckCircle, ChevronLeft, ChevronRight, X } from "lucide-react"

const events: any[] = []

const categoryColors: Record<string, string> = {
  Workshop: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  "Cuộc thi": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Hội thảo": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Open Lab": "bg-green-500/20 text-green-400 border-green-500/30",
}

const MONTHS = ["T1","T2","T3","T4","T5","T6","T7","T8","T9","T10","T11","T12"]

export default function EventsPageClient() {
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null)
  const [registered, setRegistered] = useState<Set<number>>(new Set())
  const [currentMonth, setCurrentMonth] = useState(5) // June (0-indexed)
  const [currentYear] = useState(2024)
  const [userRole] = useState("ADMIN") // Mock role

  const handleRegister = (id: number) => {
    setRegistered((prev) => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s })
  }

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="accent-bar" />
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Lịch <span className="text-gradient-cyan">Sự Kiện</span></h1>
              <p className="text-slate-400 text-lg">Đừng bỏ lỡ các workshop, cuộc thi và hoạt động của CLB.</p>
            </div>
            {userRole === "ADMIN" && (
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
                + Thêm Sự Kiện Mới
              </button>
            )}
          </div>
        </motion.div>

        {/* Mini Calendar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-[#1E2937] rounded-2xl p-6 border border-white/5 mb-8 max-w-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setCurrentMonth(m => m > 0 ? m - 1 : 11)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-slate-400"><ChevronLeft size={16} /></button>
            <span className="font-bold text-white text-sm">{MONTHS[currentMonth]} {currentYear}</span>
            <button onClick={() => setCurrentMonth(m => m < 11 ? m + 1 : 0)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-slate-400"><ChevronRight size={16} /></button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-500 mb-2">
            {["CN","T2","T3","T4","T5","T6","T7"].map(d => <span key={d}>{d}</span>)}
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
              const hasEvent = events.some(e => {
                const d = new Date(e.date)
                return d.getMonth() === currentMonth && d.getDate() === day
              })
              return (
                <button key={day} className={`aspect-square rounded-lg text-xs flex items-center justify-center transition-all ${hasEvent ? "bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/40" : "text-slate-400 hover:bg-white/5"}`}>
                  {day}
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Events List */}
        <div className="space-y-5">
          {events.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-slate-500 bg-[#1E2937] rounded-2xl border border-white/5"
            >
              <div className="text-5xl mb-4 opacity-50">🗓️</div>
              <p className="text-lg font-medium text-slate-300">Chưa có sự kiện nào sắp diễn ra.</p>
              {userRole === "ADMIN" ? (
                <p className="text-sm mt-2 text-cyan-400">Admin vui lòng thêm sự kiện mới để thành viên đăng ký.</p>
              ) : (
                <p className="text-sm mt-2">Vui lòng quay lại sau hoặc theo dõi thông báo từ CLB.</p>
              )}
            </motion.div>
          ) : (
            events.map((event: any, i) => {
              const isFull = event.registered >= event.capacity
              const isReg = registered.has(event.id)
              return (
                <motion.div key={event.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                  <div className="bg-[#1E2937] rounded-2xl border border-white/5 hover:border-white/15 transition-all overflow-hidden group">
                    <div className="flex flex-col md:flex-row">
                      {/* Emoji panel */}
                      <div className={`bg-gradient-to-br ${event.color} w-full md:w-24 h-24 md:h-auto flex items-center justify-center text-4xl shrink-0`}>
                        {event.emoji}
                      </div>
                      <div className="p-5 flex-1">
                        <div className="flex flex-wrap items-start gap-3 mb-3">
                          <h3 className="font-bold text-white text-lg flex-1 group-hover:text-cyan-400 transition-colors">{event.title}</h3>
                          <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${categoryColors[event.category]}`}>{event.category}</span>
                        </div>
                        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400 mb-4">
                          <span className="flex items-center gap-1.5"><Calendar size={13} className="text-cyan-500" />{new Date(event.date).toLocaleDateString("vi-VN", { day:"2-digit", month:"2-digit", year:"numeric" })}</span>
                          <span className="flex items-center gap-1.5"><Clock size={13} className="text-orange-500" />{event.time}</span>
                          <span className="flex items-center gap-1.5"><MapPin size={13} className="text-purple-500" />{event.location}</span>
                          <span className="flex items-center gap-1.5"><Users size={13} className="text-green-500" />{event.registered}/{event.capacity} chỗ</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-4">
                          <div className={`h-full bg-gradient-to-r ${event.color} rounded-full transition-all`} style={{ width: `${(event.registered / event.capacity) * 100}%` }} />
                        </div>
                        <div className="flex items-center gap-3">
                          <button onClick={() => setSelectedEvent(event)} className="text-sm text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors">Xem chi tiết</button>
                          <button
                            onClick={() => handleRegister(event.id)}
                            disabled={isFull && !isReg}
                            className={`ml-auto px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                              isReg ? "bg-green-500/20 text-green-400 border border-green-500/30" :
                              isFull ? "bg-white/5 text-slate-500 cursor-not-allowed" :
                              `bg-gradient-to-r ${event.color} text-white hover:shadow-lg hover:scale-105`
                            }`}
                          >
                            {isReg ? <span className="flex items-center gap-1"><CheckCircle size={14} /> Đã đăng ký</span> : isFull ? "Hết chỗ" : "Đăng ký"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })
          )}
        </div>
      </div>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedEvent(null)} />
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="relative bg-[#1E2937] rounded-3xl border border-white/10 p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <button onClick={() => setSelectedEvent(null)} className="absolute top-4 right-4 p-2 rounded-xl hover:bg-white/10 text-slate-400 transition-colors"><X size={18} /></button>
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedEvent.color} flex items-center justify-center text-4xl mb-5`}>{selectedEvent.emoji}</div>
              <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${categoryColors[selectedEvent.category]}`}>{selectedEvent.category}</span>
              <h2 className="text-2xl font-black text-white mt-3 mb-4">{selectedEvent.title}</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">{selectedEvent.desc}</p>
              <div className="space-y-2 mb-5">
                {[
                  { icon: Calendar, label: new Date(selectedEvent.date).toLocaleDateString("vi-VN", { weekday:"long", day:"2-digit", month:"long", year:"numeric" }) },
                  { icon: Clock, label: selectedEvent.time },
                  { icon: MapPin, label: selectedEvent.location },
                  { icon: Users, label: `${selectedEvent.registered}/${selectedEvent.capacity} đã đăng ký` },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-sm text-slate-300"><Icon size={14} className="text-cyan-400 shrink-0" />{label}</div>
                ))}
              </div>
              <div className="bg-white/5 rounded-xl p-4 mb-5">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Yêu cầu tham gia</h4>
                <ul className="space-y-1">
                  {selectedEvent.requirements?.map((r: string) => (<li key={r} className="text-sm text-slate-300 flex items-center gap-2"><span className="text-cyan-400">→</span>{r}</li>))}
                </ul>
              </div>
              <button
                onClick={() => { handleRegister(selectedEvent.id); setSelectedEvent(null) }}
                className={`w-full py-3 rounded-2xl font-bold text-white bg-gradient-to-r ${selectedEvent.color} hover:shadow-lg transition-all`}
              >
                {registered.has(selectedEvent.id) ? "Hủy đăng ký" : "Đăng ký tham gia"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
