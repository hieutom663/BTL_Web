// ========================
// 1. INTERFACE
// ========================

export interface Department {
  code: string;
  ten: string;
  foundedYear: number;
}

export interface NhanVien {
  id: string;
  ten: string;
  namSinh: Date;
  gioiTinh: string;
  ngayBatDau: Date;
  maViTri: string;
  tenViTri: string;
  chucVu: string;
  maPhong: string;
  tenPhong: string;
  luongCoBan: number;

  email?: string;
  soDienThoai?: string;
  diaChi?: string;

  tongGioLam?: number; // Cho tính lương
  yearIncome?: Record<number, number>; // Thu nhập theo năm
}


// ========================
// 2. DANH SÁCH PHÒNG BAN
// ========================

export const danhSachPhongBan: Department[] = [
  { code: "PKT", ten: "Phòng Kỹ thuật", foundedYear: 2015 },
  { code: "PKTTC", ten: "Phòng Kế toán - Tài chính", foundedYear: 2015 },
  { code: "PNS", ten: "Phòng Nhân sự", foundedYear: 2018 },
  { code: "PMK", ten: "Phòng Marketing", foundedYear: 2020 },
  { code: "PKD", ten: "Phòng Kinh doanh", foundedYear: 2020 },
];


// ========================
// 3. DANH SÁCH NHÂN VIÊN
// ========================

export const danhSachNhanVien: NhanVien[] = [
  {
    id: "IT001",
    ten: "Giáp Văn Hiếu",
    namSinh: new Date("2006-05-22"),
    gioiTinh: "Nam",
    ngayBatDau: new Date("2023-07-02"),
    maViTri: "IT",
    tenViTri: "Lập trình viên",
    chucVu: "Trưởng phòng",
    maPhong: "PKT",
    tenPhong: "Phòng Kỹ thuật",
    luongCoBan: 10000000,
  },
  {
    id: "IT002",
    ten: "Nguyễn Đức Minh",
    namSinh: new Date("2006-05-22"),
    gioiTinh: "Nam",
    ngayBatDau: new Date("2023-07-02"),
    maViTri: "IT",
    tenViTri: "Lập trình viên",
    chucVu: "Nhân viên",
    maPhong: "PKT",
    tenPhong: "Phòng Kỹ thuật",
    luongCoBan: 10000000,
  },
  {
    id: "HR001",
    ten: "Trần Văn Hưng",
    namSinh: new Date("2006-05-22"),
    gioiTinh: "Nam",
    ngayBatDau: new Date("2023-07-02"),
    maViTri: "HR",
    tenViTri: "Nhân sự",
    chucVu: "Nhân viên",
    maPhong: "PNS",
    tenPhong: "Phòng Nhân sự",
    luongCoBan: 10000000,
  },
  {
    id: "IT003",
    ten: "Trần Nam Khánh",
    namSinh: new Date("2006-05-22"),
    gioiTinh: "Nữ",
    ngayBatDau: new Date("2023-07-02"),
    maViTri: "IT",
    tenViTri: "Lập trình viên",
    chucVu: "Trưởng phòng",
    maPhong: "PKT",
    tenPhong: "Phòng Kỹ thuật",
    luongCoBan: 10000000,
  },
  {
    id: "MKT001",
    ten: "Lê Thị Thu Thảo",
    namSinh: new Date("1998-11-15"),
    gioiTinh: "Nữ",
    ngayBatDau: new Date("2024-01-10"),
    maViTri: "MKT",
    tenViTri: "Chuyên viên Marketing",
    chucVu: "Trưởng nhóm",
    maPhong: "PMKT",
    tenPhong: "Phòng Marketing",
    luongCoBan: 12500000,
  },
  {
    id: "MKT002",
    ten: "Phạm Anh Tú",
    namSinh: new Date("2000-03-20"),
    gioiTinh: "Nam",
    ngayBatDau: new Date("2024-03-01"),
    maViTri: "MKT",
    tenViTri: "Chuyên viên Marketing",
    chucVu: "Nhân viên",
    maPhong: "PMKT",
    tenPhong: "Phòng Marketing",
    luongCoBan: 9500000,
  },
  {
    id: "SALE001",
    ten: "Đinh Văn Khánh",
    namSinh: new Date("1995-07-28"),
    gioiTinh: "Nam",
    ngayBatDau: new Date("2023-11-05"),
    maViTri: "SALE",
    tenViTri: "Kinh doanh",
    chucVu: "Trưởng phòng",
    maPhong: "PKD",
    tenPhong: "Phòng Kinh doanh",
    luongCoBan: 18000000,
  },
  {
    id: "SALE002",
    ten: "Nguyễn Thị Mai",
    namSinh: new Date("2001-01-01"),
    gioiTinh: "Nữ",
    ngayBatDau: new Date("2024-04-15"),
    maViTri: "SALE",
    tenViTri: "Kinh doanh",
    chucVu: "Nhân viên",
    maPhong: "PKD",
    tenPhong: "Phòng Kinh doanh",
    luongCoBan: 11000000,
  },
];


// =========================
// 4. DỮ LIỆU LƯƠNG GIẢ LẬP (DÙNG CHO TinhLuong.tsx)
// =========================

// Interface bản ghi lương tháng
export interface DuLieuLuong {
  id: string;                       // ID nhân viên
  ten: string;                      // Tên nhân viên
  thang: string;                    // Tháng tính lương (YYYY-MM)
  luongCoBan: number;               // Lương cơ bản
  tongGioLam: number;               // Tổng giờ làm trong tháng
  gioTangCa: number;                // Giờ OT (giờ làm thêm)
  tongLuong: number;                // Tổng lương sau khi tính OT
  trangThai: "pending" | "approved" | "paid"; // Trạng thái bảng lương
}

// Danh sách lương (có thể rỗng - TinhLuong.tsx tự sinh)
export const duLieuLuong: DuLieuLuong[] = [];

