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
}

export const danhSachPhongBan: Department[] = [
  { code: "PKT", ten: "Phòng Kỹ Thuật", foundedYear: 2015 },
  { code: "PNS", ten: "Phòng Nhân Sự", foundedYear: 2018 },
  { code: "PMK", ten: "Phòng Marketing", foundedYear: 2020 },
];

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
    tenPhong: "PNSSSSS",
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
    tenPhong: "PNSSSSS",
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
    tenPhong: "PNSSSSS",
    luongCoBan: 10000000,
  },
  {
    id: "IT003",
    ten: " Trần Nam Khánh",
    namSinh: new Date("2006-05-22"),
    gioiTinh: "Nữ",
    ngayBatDau: new Date("2023-07-02"),
    maViTri: "IT",
    tenViTri: "Lập trình viên",
    chucVu: "GAY LỌ",
    maPhong: "PKT",
    tenPhong: "PNSSSSS",
    luongCoBan: 10000000,
  },
];
