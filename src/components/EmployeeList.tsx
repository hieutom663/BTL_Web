import React, { useState } from "react";
import "./EmployeeList.css";
import { NhanVien, danhSachNhanVien } from "./TaskData";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

export default function EmployeeList() {
  // Form khởi tạo
  const initialForm: NhanVien = {
    id: "",
    ten: "",
    namSinh: new Date(),
    gioiTinh: "",
    ngayBatDau: new Date(),
    maViTri: "",
    tenViTri: "",
    chucVu: "",
    maPhong: "",
    tenPhong: "",
    luongCoBan: 0,
  };

  const [employees, setEmployees] = useState<NhanVien[]>(danhSachNhanVien);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<NhanVien | null>(null);
  const [form, setForm] = useState<NhanVien>(initialForm);

  // Submit form thêm/sửa
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editing) {
      setEmployees(
        employees.map((emp) => (emp.id === editing.id ? form : emp))
      );
    } else {
      setEmployees([...employees, form]);
    }

    setShowForm(false);
    setEditing(null);
    setForm(initialForm);
  };

  // Sửa
  const handleEdit = (emp: NhanVien) => {
    setEditing(emp);
    setForm(emp);
    setShowForm(true);
  };

  // Xóa
  const handleDelete = (id: string) => {
    if (window.confirm("Xóa nhân viên này?")) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };

  return (
    <div>
      <Navbar />

      <div className="layout">
        <Sidebar />

        <div className="content">
          <h1>Danh sách nhân viên</h1>

          <button
            className="toggle-btn"
            onClick={() => {
              setShowForm(!showForm);
              setEditing(null);
              setForm(initialForm);
            }}
          >
            {showForm ? "Đóng form" : "Thêm nhân viên"}
          </button>

          {showForm && (
            <form className="employee-form" onSubmit={handleSubmit}>
              <input
                placeholder="Mã nhân viên"
                value={form.id}
                onChange={(e) => setForm({ ...form, id: e.target.value })}
                required
              />
              <input
                placeholder="Họ tên"
                value={form.ten}
                onChange={(e) => setForm({ ...form, ten: e.target.value })}
                required
              />
              <input
                placeholder="Phòng ban"
                value={form.tenPhong}
                onChange={(e) => setForm({ ...form, tenPhong: e.target.value })}
                required
              />
              <input
                placeholder="Chức vụ"
                value={form.chucVu}
                onChange={(e) => setForm({ ...form, chucVu: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Lương cơ bản"
                value={form.luongCoBan}
                onChange={(e) =>
                  setForm({ ...form, luongCoBan: Number(e.target.value) })
                }
                required
              />
              <input
                type="date"
                value={form.ngayBatDau.toISOString().split("T")[0]}
                onChange={(e) =>
                  setForm({ ...form, ngayBatDau: new Date(e.target.value) })
                }
              />
              <select
                value={form.gioiTinh}
                onChange={(e) => setForm({ ...form, gioiTinh: e.target.value })}
              >
                <option value="">Chọn giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>

              <button type="submit">Lưu</button>
            </form>
          )}

          <table className="employee-table" border={1} cellPadding={10}>
            <thead>
              <tr>
                <th>Mã NV</th>
                <th>Họ Tên</th>
                <th>Phòng ban</th>
                <th>Chức vụ</th>
                <th>Lương</th>
                <th>Ngày bắt đầu</th>
                <th>Giới tính</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.ten}</td>
                  <td>{emp.tenPhong}</td>
                  <td>{emp.chucVu}</td>
                  <td>{emp.luongCoBan.toLocaleString()}₫</td>
                  <td>{emp.ngayBatDau.toLocaleDateString()}</td>
                  <td>{emp.gioiTinh}</td>
                  <td>
                    <button onClick={() => handleEdit(emp)}>Sửa</button>
                    <button onClick={() => handleDelete(emp.id)}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="back-link">
            <Link to="/">Quay về trang chủ</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
