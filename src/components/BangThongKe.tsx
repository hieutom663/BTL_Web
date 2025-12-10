import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { DongLuong, NhanVien, tinhLuong } from "./TaskData";
import "./css/BangChamCong.css";

const BangThongKe = () => {
  const [danhSachNhanVien, setDanhSachNhanVien] = useState<NhanVien[]>([]);
  const [bangLuongThang, setBangLuongThang] = useState<DongLuong[]>([]);
  const [nam, setNam] = useState(new Date().getFullYear());

  useEffect(() => {
    axios
      .get("http://localhost:3000/bangluongthang")
      .then((res) => setBangLuongThang(res.data))
      .catch((err) => console.log("Lỗi", err));

    axios
      .get("http://localhost:3000/danhsachnhanvien")
      .then((res) => setDanhSachNhanVien(res.data))
      .catch((err) => console.log("Lỗi", err));
  }, []);

  const tongLuongTheoNam = danhSachNhanVien.map((nv) => {
    const cacThang = bangLuongThang.filter(
      (e) => e.maNhanVien === nv.maNhanVien && e.nam === nam
    );

    const tongLuong = cacThang.reduce((sum, dong) => {
      return sum + tinhLuong(dong);
    }, 0);

    return { ...nv, tongLuong };
  });

  return (
    <div>
      <Navbar />

      <div className="layout">
        <Sidebar />

        <div className="bcc-admin-container">
          <h2 className="bcc-title">Bảng thống kê năm</h2>

          <div className="bcc-filter">
            <label>Năm:</label>
            <select
              value={nam}
              onChange={(e) => setNam(Number(e.target.value))}
            >
              <option>{nam}</option>
            </select>
          </div>

          <hr />

          <table className="bcc-table" border={1} cellPadding={10}>
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
                <tr key={e.maNhanVien}>
                  <td>{e.maNhanVien}</td>
                  <td>{e.tenNhanVien}</td>
                  <td>{e.tenPhong}</td>
                  <td>{e.chucVu}</td>
                  <td>{Math.round(e.luongCoBan)} VND</td>
                  <td>{e.tongLuong} VND</td>
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
