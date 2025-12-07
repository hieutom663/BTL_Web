<<<<<<< HEAD
import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  danhSachPhongBan,
  danhSachNhanVien,
  Department,
  NhanVien,
} from "./TaskData";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const ChiTietPhongBan = () => {
  // Lấy tham số 'code' (Mã phòng ban) từ URL
  const { code } = useParams<{ code: string }>();

  // 1. TÌM THÔNG TIN PHÒNG BAN
  const department: Department | undefined = danhSachPhongBan.find(
    (d) => d.code === code
  );

  // Chuẩn hóa mã phòng ban từ URL (Ví dụ: 'PKT-TC' -> 'PKTTC')
  const standardizedCode = (code || "").toUpperCase().replace(/-/g, "");

  // 2. LỌC DANH SÁCH NHÂN VIÊN
  const employees: NhanVien[] = danhSachNhanVien.filter((e) => {
    // Chuẩn hóa mã phòng ban của nhân viên (sử dụng trường maPhong)
    const standardizedEmployeeCode = (e.maPhong || "")
      .toUpperCase()
      .replace(/-/g, "");

    // Logic lọc:
    // 1. So sánh trực tiếp mã đã chuẩn hóa (Xử lý PKTTC vs PKT-TC)
    if (standardizedEmployeeCode === standardizedCode) {
        return true;
    }
    
    // 2. Xử lý trường hợp ngoại lệ PMK/PMKT (Marketing) trong dữ liệu của bạn
    if (standardizedCode === 'PMK' && standardizedEmployeeCode === 'PMKT') {
        return true;
    }

    return false;
  });

  if (!department) {
    // Nếu không tìm thấy, hiển thị lỗi rõ ràng thay vì trang trắng
=======
import React, { useState, useEffect } from "react";
import axios from "axios";
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
>>>>>>> hieu
    return (
      <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
        <Navbar />
        <div style={{ display: "flex " }}>
<<<<<<< HEAD
            <Sidebar />
            <div style={{ padding: "20px" }}>
                <h2 style={{color: '#dc3545'}}>Lỗi: Phòng ban có mã **{code}** không tồn tại.</h2>
                <Link to="/departments">Quay lại danh sách phòng ban</Link>
            </div>
=======
          <Sidebar />
          <div style={{ padding: "20px" }}>
            <h2 style={{ color: "#dc3545" }}>
              Lỗi: Phòng ban có mã **{id}** không tồn tại.
            </h2>
          </div>
>>>>>>> hieu
        </div>
      </div>
    );
  }

<<<<<<< HEAD
  // Hiển thị chi tiết phòng ban và danh sách nhân viên
=======
>>>>>>> hieu
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex " }}>
        <Sidebar />
        <div style={{ padding: "20px", fontFamily: "sans-serif", flexGrow: 1 }}>
          <h2 style={{ color: "#007bff" }}>
<<<<<<< HEAD
            Chi tiết Phòng ban: {department.ten}
          </h2>
          <p>
            **Mã Phòng:** **{department.code}**
            <br />
            **Năm thành lập:** **{department.foundedYear}**
=======
            Chi tiết Phòng ban: {phongBan.tenPhong}
          </h2>
          <p>
            Mã Phòng: {phongBan.maPhong}
            <br />
            Năm thành lập: {phongBan.namThanhLap}
>>>>>>> hieu
          </p>

          <hr />

          <h3 style={{ color: "#343a40" }}>
<<<<<<< HEAD
            Danh sách Nhân viên ({employees.length})
          </h3>
          {employees.length > 0 ? (
=======
            Danh sách Nhân viên ({nhanVienPhongBan.length})
          </h3>
          {nhanVienPhongBan.length > 0 ? (
>>>>>>> hieu
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
<<<<<<< HEAD
                  <th>Vị trí</th>
=======
>>>>>>> hieu
                  <th>Giới tính</th>
                  <th>Lương cơ bản</th>
                  <th>Ngày bắt đầu</th>
                </tr>
              </thead>
              <tbody>
<<<<<<< HEAD
                {employees.map((e) => (
                  <tr key={e.id}>
                    <td>{e.id}</td>
                    <td>{e.ten}</td>
                    <td>{e.chucVu}</td>
                    <td>{e.tenViTri}</td>
                    <td>{e.gioiTinh}</td>
                    <td>{e.luongCoBan}</td> 
                    <td>{e.ngayBatDau.toLocaleDateString("vi-VN")}</td>
=======
                {nhanVienPhongBan.map((e) => (
                  <tr key={e.maNhanVien}>
                    <td>{e.maNhanVien}</td>
                    <td>{e.tenNhanVien}</td>
                    <td>{e.chucVu}</td>
                    <td>{e.gioiTinh}</td>
                    <td>{e.luongCoBan}</td>
                    <td>{ngayThang(e.ngayBatDauLamViec)}</td>
>>>>>>> hieu
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>
<<<<<<< HEAD
              **Hiện không có nhân viên nào** thuộc phòng ban **{department.ten}**
              ({department.code}).
=======
              Hiện không có nhân viên nào thuộc phòng ban {phongBan.tenPhong}(
              {phongBan.maPhong}).
>>>>>>> hieu
            </p>
          )}

          <br />
<<<<<<< HEAD
          <Link to="/departments">
            &#x2190; Quay lại danh sách phòng ban
          </Link>
=======
          <Link to="/departments">&#x2190; Quay lại danh sách phòng ban</Link>
>>>>>>> hieu
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default ChiTietPhongBan;
=======
export default ChiTietPhongBan;
>>>>>>> hieu
