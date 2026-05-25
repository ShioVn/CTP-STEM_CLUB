# CTP Scientia - STEM Club Website

Đây là mã nguồn chính thức cho website của **CTP Scientia** — Câu lạc bộ Khoa học Kỹ thuật STEM trường THPT Chuyên Trần Phú, Hải Phòng.

## Công Nghệ Sử Dụng

- **Framework**: Next.js 15 (App Router)
- **Ngôn ngữ**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Database**: PostgreSQL
- **ORM**: Prisma 7.8
- **Authentication**: NextAuth.js (Custom Credentials)
- **Animation**: Framer Motion

## Cấu Trúc Chức Năng

Website được thiết kế tối giản với 3 vai trò chính:
1. **Khách (Guest)**: Chỉ có thể xem thông tin, các dự án đã được duyệt, và giới thiệu.
2. **Thành viên (Member)**: Có thể đăng nhập, xem hồ sơ, và đăng ký dự án mới (chờ duyệt).
3. **Quản trị viên (Admin)**: Quản lý toàn bộ website, duyệt/từ chối dự án, xem danh sách thành viên.

*Lưu ý: Chức năng Cộng Đồng (Feed), Cửa Hàng, Thư Viện đã được gỡ bỏ trong phiên bản tinh giản này để dễ dàng quản lý.*

## Danh Sách Tài Khoản (Mặc Định)

Các tài khoản được cấu hình cứng trong file `src/config/users.ts`:

- **Admin**: `admin` / `CTPSTEM123`
- **Member 1**: `member1` / `pass123`
- **Member 2**: `member2` / `pass123`

## Hướng Dẫn Cài Đặt (Local Development)

### 1. Clone & Cài đặt thư viện

```bash
git clone https://github.com/ShioVn/CTP-STEM_CLUB
cd ctp-scientia
npm install
```

### 2. Cấu hình biến môi trường
Tạo file `.env` dựa trên `.env.example`:
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/ctpscientia?schema=public"
NEXTAUTH_SECRET="your-super-secret-string-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Khởi tạo Database

Tạo database schema bằng Prisma:
```bash
npx prisma generate
npx prisma db push
```

### 4. Chạy dự án

```bash
npm run dev
```

Truy cập `http://localhost:3000` để xem website.

## Made with ♥ by Dương Đức Cương
