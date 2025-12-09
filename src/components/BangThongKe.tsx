import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { DongLuong, NhanVien, tinhLuong } from "./TaskData";

const BangThongKe = () => {
  const [danhSachNhanVien, setDanhSachNhanVien] = useState<NhanVien[]>([]);
  const [bangLuongThang, setBangLuongThang] = useState<DongLuong[]>([]);
  const [nam, setNam] = useState(new Date().getFullYear());
  const thongTinThongKe = bangLuongThang
    .filter((e) => e.nam === nam)
    .map((nv) => {
      const lt = danhSachNhanVien.find((n) => n.maNhanVien === nv.maNhanVien);
      return { ...nv, ...lt };
    });

  useEffect(() => {
    axios
      .get("http://localhost:3000/bangluongthang")
      .then((res) => {
        setBangLuongThang(res.data);
      })
      .catch((err) => {
        console.log("Lỗi", err);
      });
    axios
      .get("http://localhost:3000/danhsachnhanvien")
      .then((res) => {
        setDanhSachNhanVien(res.data);
      })
      .catch((err) => {
        console.log("Lỗi", err);
      });
  });
  const tongLuongTheoNam = danhSachNhanVien.map((nv) => {
    const cacThang = bangLuongThang.filter(
      (e) => e.maNhanVien === nv.maNhanVien && e.nam === nam
    );

    const tongLuong = cacThang.reduce((sum, dong) => {
      return sum + tinhLuong(dong);
    }, 0);

    return {
      ...nv,
      tongLuong,
    };
  });
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex ", gap: 8 }}>
        <Sidebar />
        <div>
          <h2>Bảng thống kê năm</h2>
          Năm:
          <select
            value={nam}
            onChange={(e) => {
              setNam(Number(e.target.value));
            }}
          >
            {[nam].map((n) => (
              <option>{n}</option>
            ))}
          </select>
          <hr />
          <table border={1} cellPadding={10}>
            <thead>
              <tr>
                <th>Mã nhân viên</th>
                <th>Tên nhân viên</th>
                <th>Phòng ban</th>
                <th>Chức vụ</th>
                <th>Lương cơ bản</th>
                <th>Lương thực nhận</th>
              </tr>
            </thead>
            <tbody>
              {tongLuongTheoNam.map((e) => (
                <tr>
                  <th>{e.maNhanVien}</th>
                  <th>{e.tenNhanVien}</th>
                  <th>{e.tenPhong}</th>
                  <th>{e.chucVu}</th>
                  <th>{Math.round(e.luongCoBan)}</th>
                  <th>{e.tongLuong}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default BangThongKe;
