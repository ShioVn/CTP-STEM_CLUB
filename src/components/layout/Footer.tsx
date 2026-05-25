import Link from "next/link"
import Image from "next/image"
import { Globe, Video, Mail, Phone, MapPin, Code, ExternalLink } from "lucide-react"

const footerLinks = {
  club: [
    { label: "Giới thiệu", href: "/gioi-thieu" },
    { label: "Thành viên", href: "/thanh-vien" },
    { label: "Dự án", href: "/du-an" },
    { label: "Hoạt động", href: "/lich-su-kien" },
  ],

  support: [
    { label: "Liên hệ", href: "/lien-he" },
    { label: "FAQ", href: "/faq" },
    { label: "Chính sách bảo mật", href: "/privacy" },
    { label: "Điều khoản sử dụng", href: "/terms" },
  ],
}

const socials = [
  { icon: Globe, href: "https://facebook.com", label: "Facebook", color: "hover:text-blue-400" },
  { icon: Video, href: "https://youtube.com", label: "YouTube", color: "hover:text-red-400" },
  { icon: Code, href: "https://github.com", label: "GitHub", color: "hover:text-slate-300" },
]

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/5">
      {/* Gradient top edge */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="bg-[#090f1a] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-5 group w-fit">
                <div className="relative w-12 h-12">
                  <Image
                    src="/images/logo.png"
                    alt="CTP Scientia"
                    fill
                    className="object-contain transition-transform group-hover:scale-110"
                  />
                </div>
                <div>
                  <div className="text-xl font-bold text-gradient-cyan">CTP Scientia</div>
                  <div className="text-xs text-slate-500">STEM Club</div>
                </div>
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
                Câu lạc bộ Khoa học Kỹ thuật — nơi giới trẻ khám phá, sáng tạo và thực hành
                công nghệ STEM với Robot, In 3D, Arduino, IoT và nhiều hơn nữa.
              </p>
              <p className="text-slate-500 text-xs italic mb-6">
                "Khám phá - Sáng tạo - Thực hành STEM"
              </p>

              {/* Socials */}
              <div className="flex items-center gap-3">
                {socials.map(({ icon: Icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 ${color} hover:border-white/20 hover:bg-white/10 transition-all duration-200`}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h4 className="font-semibold text-slate-200 mb-4 text-sm uppercase tracking-wider">
                Câu lạc bộ
              </h4>
              <ul className="space-y-3">
                {footerLinks.club.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>



            <div>
              <h4 className="font-semibold text-slate-200 mb-4 text-sm uppercase tracking-wider">
                Liên hệ
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:scientia@ctp.edu.vn"
                    className="flex items-start gap-2.5 text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    <Mail size={15} className="mt-0.5 shrink-0" />
                    scientia@tranphuchuyen.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+84xxxxxxxxx"
                    className="flex items-start gap-2.5 text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    <Phone size={15} className="mt-0.5 shrink-0" />
                    093 435 35 69
                  </a>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-slate-400">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-orange-500" />
                  Trường THPT Chuyên Trần Phú, Hải Phòng
                </li>
              </ul>

              <div className="mt-6">
                <a
                  href="https://tranphuchuyen.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-400 transition-colors"
                >
                  <ExternalLink size={12} />
                  tranphuchuyen.com
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} CTP Scientia. All rights reserved.
            </p>
            <p className="text-slate-400 text-sm font-medium flex items-center gap-2">
              Made with <span className="text-red-500 animate-pulse">♥</span> by Dương Đức Cương
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
