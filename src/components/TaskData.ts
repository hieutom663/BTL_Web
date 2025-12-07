export const ngayThang = (str: Date) => {
  const time = new Date(str).toLocaleDateString();
  let [day, month, year] = time.split("/");
  const ketQua = `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
  return ketQua;
};

export const sinhId = (str: NhanVien) => {
  const ketQua =
    str.maPhong +
    str.maChucVu +
    String(str.thuTuTheoNgayVaoLam).padStart(4, "0");
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
