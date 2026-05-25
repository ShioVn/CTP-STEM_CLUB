"use client"

import { motion } from "framer-motion"
import { Cpu, Layers, Wifi, Pencil, Scissors, Lightbulb } from "lucide-react"

const values = [
  {
    icon: Cpu,
    title: "Robot & Tự Động Hoá",
    description: "Thiết kế, lắp ráp và lập trình robot từ cơ bản đến nâng cao với Arduino, Raspberry Pi và các nền tảng mã nguồn mở.",
    color: "from-cyan-500 to-blue-600",
    glow: "group-hover:shadow-cyan-500/20",
  },
  {
    icon: Layers,
    title: "In 3D & Chế Tạo",
    description: "Từ ý tưởng đến sản phẩm thực tế với công nghệ in 3D FDM, SLA và phần mềm Fusion 360, SolidWorks.",
    color: "from-orange-500 to-red-500",
    glow: "group-hover:shadow-orange-500/20",
  },
  {
    icon: Wifi,
    title: "IoT & Kết Nối",
    description: "Xây dựng hệ sinh thái thiết bị thông minh với ESP32, MQTT, cloud platforms và ứng dụng mobile.",
    color: "from-purple-500 to-indigo-600",
    glow: "group-hover:shadow-purple-500/20",
  },
  {
    icon: Pencil,
    title: "Thiết Kế Kỹ Thuật",
    description: "Học CAD/CAM chuyên nghiệp với Fusion 360, SolidWorks và AutoCAD để thiết kế sản phẩm kỹ thuật.",
    color: "from-green-500 to-emerald-600",
    glow: "group-hover:shadow-green-500/20",
  },
  {
    icon: Scissors,
    title: "Cắt CNC & Laser",
    description: "Tạo ra các chi tiết chính xác với máy cắt CNC và laser cutter từ nhiều vật liệu: gỗ, nhựa, kim loại.",
    color: "from-yellow-500 to-orange-500",
    glow: "group-hover:shadow-yellow-500/20",
  },
  {
    icon: Lightbulb,
    title: "Dự Án Sáng Tạo",
    description: "Biến ý tưởng thành hiện thực qua các dự án liên ngành kết hợp công nghệ, nghệ thuật và giải quyết vấn đề thực tế.",
    color: "from-pink-500 to-rose-600",
    glow: "group-hover:shadow-pink-500/20",
  },
]

export default function ValuesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#0A1628]/80 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="accent-bar mx-auto" />
          <h2 className="section-title text-white mb-4">
            Chúng Tôi <span className="text-gradient-cyan">Làm Gì</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            CTP Scientia cung cấp môi trường học tập thực hành toàn diện với đầy đủ
            thiết bị và sự hướng dẫn từ các thành viên có kinh nghiệm.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v, index) => {
            const Icon = v.icon
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative bg-[#1E2937] rounded-2xl p-7 border border-white/5 hover:border-white/15 transition-all duration-300 card-hover hover:shadow-2xl ${v.glow}`}
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={26} className="text-white" />
                </div>

                {/* Subtle gradient overlay */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${v.color} opacity-5 rounded-2xl group-hover:opacity-10 transition-opacity`} />

                <h3 className="text-lg font-bold text-white mb-3">{v.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{v.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Join CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0A2540] via-[#0d3060] to-[#0A2540] border border-cyan-500/20 p-10 text-center"
        >
          <div className="absolute inset-0 hero-grid opacity-20" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
              Sẵn sàng <span className="text-gradient-cyan">tham gia</span> chưa?
            </h3>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Gia nhập cộng đồng hơn 20 thành viên đam mê công nghệ và cùng nhau tạo ra những điều tuyệt vời.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/dang-ky"
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/30 transition-all hover:scale-105"
              >
                Đăng ký thành viên
              </a>
              <a
                href="/gioi-thieu"
                className="px-8 py-4 rounded-2xl border border-white/20 text-white font-semibold hover:bg-white/5 transition-all"
              >
                Tìm hiểu thêm
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
