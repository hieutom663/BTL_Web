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
}

export const danhSachPhongBan: Department[] = [
  { code: "PKT", ten: "Phòng Kỹ thuật", foundedYear: 2015 },
  { code: "PKTTC", ten: "Phòng Kế toán - Tài chính", foundedYear: 2015 },
  { code: "PNS", ten: "Phòng Nhân sự", foundedYear: 2018 },
  { code: "PMK", ten: "Phòng Marketing", foundedYear: 2020 },
  { code: "PKD", ten: "Phòng Kinh doanh", foundedYear: 2020 },
];

export const danhSachNhanVien: NhanVien[] = [
  { id: "IT001", ten: "Giáp Văn Hiếu", namSinh: new Date("2006-05-22"), gioiTinh: "Nam", ngayBatDau: new Date("2023-07-02"), maViTri: "IT", tenViTri: "Lập trình viên", chucVu: "Trưởng phòng", maPhong: "PKT", tenPhong: "Phòng Kỹ thuật", luongCoBan: 10000000, email: "hieu.giap@example.com", soDienThoai: "0987654321", diaChi: "Hà Nội" },
  { id: "IT002", ten: "Nguyễn Đức Minh", namSinh: new Date("2006-05-22"), gioiTinh: "Nam", ngayBatDau: new Date("2023-07-02"), maViTri: "IT", tenViTri: "Lập trình viên", chucVu: "Nhân viên", maPhong: "PKT", tenPhong: "Phòng Kỹ thuật", luongCoBan: 10000000, email: "minh.nguyen@example.com", soDienThoai: "0978123456", diaChi: "Hà Nội" },
  { id: "HR001", ten: "Trần Văn Hưng", namSinh: new Date("2006-05-22"), gioiTinh: "Nam", ngayBatDau: new Date("2023-07-02"), maViTri: "HR", tenViTri: "Nhân sự", chucVu: "Nhân viên", maPhong: "PNS", tenPhong: "Phòng Nhân sự", luongCoBan: 10000000, email: "hung.tran@example.com", soDienThoai: "0912345678", diaChi: "Hà Nội" },
  { id: "IT003", ten: "Trần Nam Khánh", namSinh: new Date("2006-05-22"), gioiTinh: "Nữ", ngayBatDau: new Date("2023-07-02"), maViTri: "IT", tenViTri: "Lập trình viên", chucVu: "Trưởng phòng", maPhong: "PKT", tenPhong: "Phòng Kỹ thuật", luongCoBan: 10000000, email: "", soDienThoai: "", diaChi: "" },
  { id: "MKT001", ten: "Lê Thị Thu Thảo", namSinh: new Date("1998-11-15"), gioiTinh: "Nữ", ngayBatDau: new Date("2024-01-10"), maViTri: "MKT", tenViTri: "Chuyên viên Marketing", chucVu: "Trưởng nhóm", maPhong: "PMKT", tenPhong: "Phòng Marketing", luongCoBan: 12500000, email: "", soDienThoai: "", diaChi: "" },
  { id: "MKT002", ten: "Phạm Anh Tú", namSinh: new Date("2000-03-20"), gioiTinh: "Nam", ngayBatDau: new Date("2024-03-01"), maViTri: "MKT", tenViTri: "Chuyên viên Marketing", chucVu: "Nhân viên", maPhong: "PMKT", tenPhong: "Phòng Marketing", luongCoBan: 9500000, email: "", soDienThoai: "", diaChi: "" },
  { id: "SALE001", ten: "Đinh Văn Khánh", namSinh: new Date("1995-07-28"), gioiTinh: "Nam", ngayBatDau: new Date("2023-11-05"), maViTri: "SALE", tenViTri: "Kinh doanh", chucVu: "Trưởng phòng", maPhong: "PKD", tenPhong: "Phòng Kinh doanh", luongCoBan: 18000000, email: "", soDienThoai: "", diaChi: "" },
  { id: "SALE002", ten: "Nguyễn Thị Mai", namSinh: new Date("2001-01-01"), gioiTinh: "Nữ", ngayBatDau: new Date("2024-04-15"), maViTri: "SALE", tenViTri: "Kinh doanh", chucVu: "Nhân viên", maPhong: "PKD", tenPhong: "Phòng Kinh doanh", luongCoBan: 11000000, email: "", soDienThoai: "", diaChi: "" },
  { id: "ACC001", ten: "Hoàng Minh Đức", namSinh: new Date("1990-12-12"), gioiTinh: "Nam", ngayBatDau: new Date("2022-05-20"), maViTri: "ACC", tenViTri: "Kế toán", chucVu: "Kế toán trưởng", maPhong: "PKT-TC", tenPhong: "Phòng Kế toán - Tài chính", luongCoBan: 15000000, email: "", soDienThoai: "", diaChi: "" },
  { id: "ACC002", ten: "Trần Bảo Ngọc", namSinh: new Date("1997-02-18"), gioiTinh: "Nữ", ngayBatDau: new Date("2023-08-01"), maViTri: "ACC", tenViTri: "Kế toán", chucVu: "Nhân viên", maPhong: "PKT-TC", tenPhong: "Phòng Kế toán - Tài chính", luongCoBan: 10500000, email: "", soDienThoai: "", diaChi: "" },
  { id: "IT004", ten: "Vũ Thanh Tùng", namSinh: new Date("1993-04-25"), gioiTinh: "Nam", ngayBatDau: new Date("2022-01-01"), maViTri: "IT", tenViTri: "Quản lý dự án IT", chucVu: "Giám đốc dự án", maPhong: "PKT", tenPhong: "Phòng Kỹ thuật", luongCoBan: 25000000, email: "", soDienThoai: "", diaChi: "" },
  { id: "IT005", ten: "Lê Thúy An", namSinh: new Date("2003-10-05"), gioiTinh: "Nữ", ngayBatDau: new Date("2024-05-01"), maViTri: "IT", tenViTri: "Kiểm thử phần mềm", chucVu: "Thực tập sinh", maPhong: "PKT", tenPhong: "Phòng Kỹ thuật", luongCoBan: 5000000, email: "", soDienThoai: "", diaChi: "" },
  { id: "HR002", ten: "Ngô Quang Huy", namSinh: new Date("1996-06-06"), gioiTinh: "Nam", ngayBatDau: new Date("2023-09-10"), maViTri: "HR", tenViTri: "Tuyển dụng", chucVu: "Chuyên viên", maPhong: "PNS", tenPhong: "Phòng Nhân sự", luongCoBan: 11500000, email: "", soDienThoai: "", diaChi: "" },
  { id: "ADMIN001", ten: "Nguyễn Văn Chiến", namSinh: new Date("1985-08-08"), gioiTinh: "Nam", ngayBatDau: new Date("2021-03-15"), maViTri: "ADMIN", tenViTri: "Hành chính tổng hợp", chucVu: "Trưởng phòng", maPhong: "PQT", tenPhong: "Phòng Quản trị", luongCoBan: 16000000, email: "", soDienThoai: "", diaChi: "" },
  { id: "ADMIN002", ten: "Trương Mỹ Linh", namSinh: new Date("2002-12-24"), gioiTinh: "Nữ", ngayBatDau: new Date("2024-02-29"), maViTri: "ADMIN", tenViTri: "Văn thư", chucVu: "Nhân viên", maPhong: "PQT", tenPhong: "Phòng Quản trị", luongCoBan: 9000000, email: "", soDienThoai: "", diaChi: "" },
  { id: "SALE003", ten: "Bùi Thanh Hải", namSinh: new Date("1999-04-10"), gioiTinh: "Nam", ngayBatDau: new Date("2024-06-01"), maViTri: "SALE", tenViTri: "Chăm sóc khách hàng", chucVu: "Chuyên viên", maPhong: "PKD", tenPhong: "Phòng Kinh doanh", luongCoBan: 10000000, email: "", soDienThoai: "", diaChi: "" },
  { id: "IT006", ten: "Đỗ Gia Hân", namSinh: new Date("2000-09-30"), gioiTinh: "Nữ", ngayBatDau: new Date("2023-03-03"), maViTri: "IT", tenViTri: "Thiết kế UI/UX", chucVu: "Chuyên viên", maPhong: "PKT", tenPhong: "Phòng Kỹ thuật", luongCoBan: 13000000, email: "", soDienThoai: "", diaChi: "" },
  { id: "ACC003", ten: "Nguyễn Thị Lan", namSinh: new Date("1991-05-05"), gioiTinh: "Nữ", ngayBatDau: new Date("2022-10-10"), maViTri: "ACC", tenViTri: "Thủ quỹ", chucVu: "Nhân viên", maPhong: "PKT-TC", tenPhong: "Phòng Kế toán - Tài chính", luongCoBan: 9500000, email: "", soDienThoai: "", diaChi: "" },
  { id: "HR003", ten: "Vương Đình An", namSinh: new Date("1988-02-14"), gioiTinh: "Nam", ngayBatDau: new Date("2020-01-01"), maViTri: "HR", tenViTri: "Đào tạo và phát triển", chucVu: "Trưởng phòng", maPhong: "PNS", tenPhong: "Phòng Nhân sự", luongCoBan: 20000000, email: "", soDienThoai: "", diaChi: "" }
];