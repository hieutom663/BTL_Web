import React from "react";
import { useParams, Link } from "react-router-dom";
// Import các interface và danh sách từ TaskData.ts
import {
  danhSachPhongBan,
  danhSachNhanVien,
  Department,
  NhanVien,
} from "./TaskData";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DepartmentDetail = () => {
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
    return (
      <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
        <Navbar />
        <div style={{ display: "flex " }}>
            <Sidebar />
            <div style={{ padding: "20px" }}>
                <h2 style={{color: '#dc3545'}}>Lỗi: Phòng ban có mã **{code}** không tồn tại.</h2>
                <Link to="/departments">Quay lại danh sách phòng ban</Link>
            </div>
        </div>
      </div>
    );
  }

  // Hiển thị chi tiết phòng ban và danh sách nhân viên
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex " }}>
        <Sidebar />
        <div style={{ padding: "20px", fontFamily: "sans-serif", flexGrow: 1 }}>
          <h2 style={{ color: "#007bff" }}>
            Chi tiết Phòng ban: {department.ten}
          </h2>
          <p>
            **Mã Phòng:** **{department.code}**
            <br />
            **Năm thành lập:** **{department.foundedYear}**
          </p>

          <hr />

          <h3 style={{ color: "#343a40" }}>
            Danh sách Nhân viên ({employees.length})
          </h3>
          {employees.length > 0 ? (
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
                  <th>Vị trí</th>
                  <th>Giới tính</th>
                  <th>Lương cơ bản</th>
                  <th>Ngày bắt đầu</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((e) => (
                  <tr key={e.id}>
                    <td>{e.id}</td>
                    <td>{e.ten}</td>
                    <td>{e.chucVu}</td>
                    <td>{e.tenViTri}</td>
                    <td>{e.gioiTinh}</td>
                    <td>{e.luongCoBan}</td> 
                    <td>{e.ngayBatDau.toLocaleDateString("vi-VN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>
              **Hiện không có nhân viên nào** thuộc phòng ban **{department.ten}**
              ({department.code}).
            </p>
          )}

          <br />
          <Link to="/departments">
            &#x2190; Quay lại danh sách phòng ban
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetail;