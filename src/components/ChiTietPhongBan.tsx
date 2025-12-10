import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/ChiTietPhongBan.css";
import { useParams, Link } from "react-router-dom";
import { PhongBan, NhanVien } from "./TaskData";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const ngayThang = (str: Date) => {
  const time = new Date(str).toLocaleDateString();
  let [day, month, year] = time.split("/");
  const ketQua = `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
  return ketQua;
};

const ChiTietPhongBan = () => {
  const [danhSachNhanVien, setDanhSachNhanVien] = useState<NhanVien[]>([]);
  const [danhSachPhongBan, setDanhSachPhongBan] = useState<PhongBan[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/danhsachnhanvien")
      .then((res) => setDanhSachNhanVien(res.data))
      .catch((err) => console.log("Lỗi", err));
    axios
      .get("http://localhost:3000/danhsachphongban")
      .then((res) => setDanhSachPhongBan(res.data))
      .catch((err) => console.log("Lỗi", err));
  }, []);
  const { id } = useParams<{ id: string }>();
  const phongBan: PhongBan | undefined = danhSachPhongBan.find(
    (p) => p.maPhong === id
  );
  const nhanVienPhongBan = danhSachNhanVien.filter((e) => e.maPhong === id);

  if (!phongBan) {
    return (
      <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
        <Navbar />
        <div style={{ display: "flex " }}>
          <Sidebar />
          <div style={{ padding: "20px" }}>
            <h2 style={{ color: "#dc3545" }}>
              Lỗi: Phòng ban có mã **{id}** không tồn tại.
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex " }}>
        <Sidebar />
        <div style={{ padding: "20px", fontFamily: "sans-serif", flexGrow: 1 }}>
          <h2 style={{ color: "#007bff" }}>
            Chi tiết Phòng ban: {phongBan.tenPhong}
          </h2>
          <p>
            Mã Phòng: {phongBan.maPhong}
            <br />
            Năm thành lập: {phongBan.namThanhLap}
          </p>

          <hr />

          <h3 style={{ color: "#343a40" }}>
            Danh sách Nhân viên ({nhanVienPhongBan.length})
          </h3>
          {nhanVienPhongBan.length > 0 ? (
            <table
              border={1}
              cellPadding={10}
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#007bff", color: "white" }}>
                  <th>Mã NV</th>
                  <th>Tên Nhân viên</th>
                  <th>Chức vụ</th>
                  <th>Giới tính</th>
                  <th>Lương cơ bản</th>
                  <th>Ngày bắt đầu</th>
                </tr>
              </thead>
              <tbody>
                {nhanVienPhongBan.map((e) => (
                  <tr key={e.maNhanVien}>
                    <td>{e.maNhanVien}</td>
                    <td>{e.tenNhanVien}</td>
                    <td>{e.chucVu}</td>
                    <td>{e.gioiTinh}</td>
                    <td>{e.luongCoBan}</td>
                    <td>{ngayThang(e.ngayBatDauLamViec)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>
              Hiện không có nhân viên nào thuộc phòng ban {phongBan.tenPhong}(
              {phongBan.maPhong}).
            </p>
          )}

          <br />
          <Link to="/departments">&#x2190; Quay lại danh sách phòng ban</Link>
        </div>
      </div>
    </div>
  );
};

export default ChiTietPhongBan;
