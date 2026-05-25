"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Target, Eye, Heart, Shield, Zap, Users, Award, BookOpen } from "lucide-react"

const timeline = [
  { year: "2025", title: "Năm Thành Lặp", desc: "Năm đầu tiên thành lập câu lạc bộ, với 10 thành viên sáng lập" },
  { year: "2026", title: "Hiện tại", desc: "Tiếp tục phát triển với nhiều ý tưởng và dự án mới, hướng đến các dự án thực tiễn" },
]

const coreValues = [
  { icon: Zap, title: "Sáng tạo không giới hạn", desc: "Chúng tôi khuyến khích mọi ý tưởng, dù lớn hay nhỏ.", color: "text-cyan-400 bg-cyan-400/10" },
  { icon: Users, title: "Tinh thần đồng đội", desc: "Cùng nhau tiến bộ, hỗ trợ lẫn nhau trong mọi dự án.", color: "text-purple-400 bg-purple-400/10" },
  { icon: BookOpen, title: "Học hỏi liên tục", desc: "Công nghệ thay đổi mỗi ngày, chúng tôi không ngừng cập nhật.", color: "text-orange-400 bg-orange-400/10" },
  { icon: Heart, title: "Đam mê thực sự", desc: "Tình yêu với STEM là động lực của mọi hoạt động.", color: "text-red-400 bg-red-400/10" },
  { icon: Shield, title: "Trách nhiệm & Chính trực", desc: "Làm việc với sự cam kết và trách nhiệm cao nhất.", color: "text-green-400 bg-green-400/10" },
  { icon: Award, title: "Xuất sắc trong thực hành", desc: "Không chỉ học lý thuyết — chúng tôi tạo ra sản phẩm thực.", color: "text-yellow-400 bg-yellow-400/10" },
]

const team = [
  { name: "Nguyễn Trung Chiến", role: "Club Advisor", dept: "Teacher Advisor", avatar: "/images/TC.jpg", skills: [] },
  { name: "Bùi Vĩnh Khang", role: "Specialist Department Head", dept: "", avatar: "/images/VK.jpg", skills: [] },
  { name: "Vũ Phùng Công Huy", role: "Club President", dept: "", avatar: "/images/CH.jpg", skills: [] },
  { name: "Đặng Thị Phương Uyên", role: "Club Vice President", dept: "", avatar: "/images/PU.jpg", skills: [] },
]

const avatarGradients = [
  "from-cyan-500 to-blue-600",
  "from-purple-500 to-indigo-600",
  "from-orange-500 to-red-500",
  "from-green-500 to-emerald-600",
  "from-pink-500 to-rose-600",
  "from-yellow-500 to-orange-500",
]

export default function AboutPageClient() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Về Chúng Tôi
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Câu chuyện của{" "}
              <span className="text-gradient-cyan">CTP Scientia</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              Từ một nhóm nhỏ những học sinh đam mê công nghệ, chúng tôi đã xây dựng
              nên cộng đồng STEM lớn mạnh nhất trường THPT Chuyên Trần Phú.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: Target,
              label: "Sứ Mệnh",
              title: "Khơi dậy đam mê STEM",
              text: "CTP Scientia mang đến cho học sinh trường Trần Phú một môi trường học tập thực hành, nơi mọi ý tưởng sáng tạo đều được nuôi dưỡng và phát triển thành những dự án công nghệ có giá trị thực tiễn.",
              gradient: "from-cyan-500/10 to-blue-500/10",
              border: "border-cyan-500/20",
              iconColor: "text-cyan-400 bg-cyan-400/10",
            },
            {
              icon: Eye,
              label: "Tầm Nhìn",
              title: "Vườn ươm tài năng kỹ thuật",
              text: "Trở thành câu lạc bộ STEM hàng đầu khu vực, đào tạo thế hệ kỹ sư, nhà thiết kế và doanh nhân công nghệ tương lai — những người sẽ đóng góp vào sự phát triển của đất nước.",
              gradient: "from-orange-500/10 to-red-500/10",
              border: "border-orange-500/20",
              iconColor: "text-orange-400 bg-orange-400/10",
            },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`bg-gradient-to-br ${item.gradient} rounded-3xl p-8 border ${item.border}`}
            >
              <div className={`w-12 h-12 rounded-2xl ${item.iconColor} flex items-center justify-center mb-5`}>
                <item.icon size={22} />
              </div>
              <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">{item.label}</div>
              <h2 className="text-2xl font-bold text-white mb-4">{item.title}</h2>
              <p className="text-slate-400 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-gradient-to-b from-transparent via-[#0A1628]/60 to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="accent-bar mx-auto" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">Hành Trình Phát Triển</h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-purple-500/30 to-orange-500/50" />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 border-2 border-[#0F172A] z-10 mt-1.5" />

                  {/* Content */}
                  <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                    <div className="bg-[#1E2937] rounded-2xl p-5 border border-white/5">
                      <span className="text-xs font-bold text-cyan-400 tracking-widest">{item.year}</span>
                      <h3 className="font-bold text-white mt-1 mb-2">{item.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="accent-bar mx-auto" />
          <h2 className="text-3xl md:text-4xl font-bold text-white">Giá Trị Cốt Lõi</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreValues.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-[#1E2937] rounded-2xl p-6 border border-white/5 card-hover"
            >
              <div className={`w-11 h-11 rounded-xl ${v.color} flex items-center justify-center mb-4`}>
                <v.icon size={20} />
              </div>
              <h3 className="font-bold text-white mb-2">{v.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gradient-to-b from-transparent via-[#0A1628]/60 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="accent-bar mx-auto" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Ban <span className="text-gradient-cyan">Chủ Nhiệm</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">Đội ngũ lãnh đạo tài năng, nhiệt huyết dẫn dắt CTP Scientia.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#1E2937] rounded-2xl p-6 border border-white/5 card-hover text-center group"
              >
                <div className={`w-20 h-20 rounded-2xl overflow-hidden mx-auto mb-4 group-hover:scale-110 transition-transform relative`}>
                  {member.avatar ? (
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${avatarGradients[i % avatarGradients.length]} flex items-center justify-center text-2xl font-black text-white`}>
                      {member.name.split(" ").slice(-2).map((n: string) => n[0]).join("")}
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-white text-lg">{member.name}</h3>
                <p className="text-cyan-400 text-sm font-medium mt-1">{member.role}</p>
                <p className="text-slate-500 text-xs mt-1">{member.dept}</p>
                <div className="flex flex-wrap gap-1.5 justify-center mt-4">
                  {(member.skills ?? []).map((s: string) => (
                    <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/10">{s}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
