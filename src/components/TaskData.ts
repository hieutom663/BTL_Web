export interface PhongBan {
  maPhong: string;
  tenPhong: string;
  namThanhLap: number;
  trangThai: string;
}

export interface NhanVien {
  maNhanVien: string;
  tenNhanVien: string;
  ngaySinh: Date;
  gioiTinh: string;
  ngayBatDauLamViec: Date;
  maChucVu: string;
  soDienThoai: string;
  chucVu: string;
  maPhong: string;
  tenPhong: string;
  luongCoBan: number;
  thuTuVaoCongTy: number;
}

export interface ThongTinChamCongThang {
  maNhanVien: string;
  tenNhanVien: string;
  ngayLam: Date;
  gioVaoLam: string;
  gioTanLam: string;
  tongGioLam: number;
}
