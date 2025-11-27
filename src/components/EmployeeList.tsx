import React, { useState } from "react";
import { NhanVien, danhSachNhanVien } from "./data";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

export default function EmployeeList() {
  const [employees, setEmployees] = useState<NhanVien[]>(danhSachNhanVien);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<NhanVien | null>(null);
  const [form, setForm] = useState<NhanVien>({
    employee_ID: "",
    full_name: "",
    department_code: "",
    position_code: "",
    base_salary: 0,
    status: "shown",
    start_date: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      setEmployees(
        employees.map((emp) =>
          emp.employee_ID === editing.employee_ID ? form : emp
        )
      );
    } else {
      setEmployees([...employees, form]);
    }
    setShowForm(false);
    setEditing(null);
    setForm({
      employee_ID: "",
      full_name: "",
      department_code: "",
      position_code: "",
      base_salary: 0,
      status: "shown",
      start_date: "",
    });
  };

  const handleEdit = (emp: NhanVien) => {
    setEditing(emp);
    setForm(emp);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Xóa nhân viên này?")) {
      setEmployees(employees.filter((emp) => emp.employee_ID !== id));
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>

      <h1>Danh sách nhân viên</h1>

      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditing(null);
          setForm({
            employee_ID: "",
            full_name: "",
            department_code: "",
            position_code: "",
            base_salary: 0,
            status: "shown",
            start_date: "",
          });
        }}
        style={{ marginTop: 20 }}
      >
        {showForm ? "Đóng form" : "Thêm nhân viên"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <input
            placeholder="Mã nhân viên"
            value={form.employee_ID}
            onChange={(e) => setForm({ ...form, employee_ID: e.target.value })}
            required
          />
          <input
            placeholder="Họ tên"
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            required
          />
          <input
            placeholder="Phòng ban"
            value={form.department_code}
            onChange={(e) =>
              setForm({ ...form, department_code: e.target.value })
            }
            required
          />
          <input
            placeholder="Chức vụ"
            value={form.position_code}
            onChange={(e) =>
              setForm({ ...form, position_code: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Lương cơ bản"
            value={form.base_salary}
            onChange={(e) =>
              setForm({ ...form, base_salary: Number(e.target.value) })
            }
            required
          />
          <input
            type="date"
            value={form.start_date}
            onChange={(e) => setForm({ ...form, start_date: e.target.value })}
          />
          <select
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value as "shown" | "hidden" })
            }
          >
            <option value="shown">Active</option>
            <option value="hidden">Inactive</option>
          </select>
          <button type="submit">Lưu</button>
        </form>
      )}

      <table
  border={1}
  cellPadding={10}
  style={{
    marginTop: "20px",
    width: "700px",
    borderCollapse: "collapse",
    tableLayout: "fixed",
  }}
>

        <thead>
          <tr style={{ backgroundColor: "#0056b3", color: "white" }}>
            <th>Mã NV</th>
            <th>Họ Tên</th>
            <th>Phòng ban</th>
            <th>Chức vụ</th>
            <th>Lương</th>
            <th>Trạng thái</th>
            <th>Bắt đầu</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.employee_ID}>
              <td>{emp.employee_ID}</td>
              <td>{emp.full_name}</td>
              <td>{emp.department_code}</td>
              <td>{emp.position_code}</td>
              <td>{emp.base_salary}</td>
              <td>{emp.status === "shown" ? "Active" : "Inactive"}</td>
              <td>{emp.start_date}</td>
              <td>
                <button onClick={() => handleEdit(emp)}>Sửa</button>
                <button onClick={() => handleDelete(emp.employee_ID)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px" }}>
        <Link to="/">Quay về trang chủ</Link>
      </div>
    </div>
    </div>
    </div>
  );
}