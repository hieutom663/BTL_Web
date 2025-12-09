export const role = localStorage.getItem("role");
export const maNv = localStorage.getItem("tenDangNhap");
export const duLieuNhanVien = {
  maNhanVien: "",
  tenNhanVien: "",
  soLienLac: "",
  ngaySinh: new Date(),
  gioiTinh: "",
  ngayBatDauLamViec: new Date(),
  maChucVu: "",
  chucVu: "",
  maPhong: "",
  tenPhong: "",
  luongCoBan: 0,
  thuTuTheoNgayVaoLam: "",
  emailNhanVien: "",
};

export const ngayThang = (str: Date) => {
  const time = new Date(str).toLocaleDateString();
  let [day, month, year] = time.split("/");
  const ketQua = `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
  return ketQua;
};

export interface PhongBan {
  maPhong: string;
  tenPhong: string;
  namThanhLap: number;
  trangThai: string;
}
export interface ChucVu {
  maChucVu: string;
  tenChucVu: string;
}

export const chucVuMap: Record<string, string> = {
  "Trưởng phòng": "T",
  "Nhân viên": "N",
  "Phó phòng": "P",
  "Thực tập sinh": "I",
};
export const maPhongMap: Record<string, string> = {
  "Trưởng phòng": "T",
  "Nhân viên": "N",
  "Phó phòng": "P",
  "Thực tập sinh": "I",
};

export interface NhanVien {
  maNhanVien: string;
  tenNhanVien: string;
  ngaySinh: Date;
  gioiTinh: string;
  ngayBatDauLamViec: Date;
  maChucVu: string;
  soLienLac: string;
  chucVu: string;
  maPhong: string;
  tenPhong: string;
  luongCoBan: number;
  thuTuTheoNgayVaoLam: string;
  emailNhanVien: string;
}

export interface ThongTinChamCongThang {
  maNhanVien: string;
  tenNhanVien: string;
  ngayLam: Date;
  gioVaoLam: string;
  gioTanLam: string;
  tongGioLam: number;
}

export interface TaiKhoan {
  maNhanVien: string;
  tenDangNhap: string;
  matKhau: string;
  maPhong: string;
  vaiTro: string;
}

export interface DongLuong {
  id: string;
  ten: string;
  thang: string;
  luongCoBan: number;
  tongGioLam: number;
  gioTangCa: number;
  tongLuong: number;
  trangThai: "dangCho" | "daDuyet" | "daTra";
}
