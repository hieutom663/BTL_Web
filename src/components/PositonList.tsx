import React, { useState } from "react";
import { Position, danhSachChucVu } from "./positions";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

export default function PositionList() {
  const [positions, setPositions] = useState<Position[]>(danhSachChucVu);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Position | null>(null);
  const [form, setForm] = useState<Position>({ position_code: "", position_name: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      setPositions(
        positions.map((pos) =>
          pos.position_code === editing.position_code ? form : pos
        )
      );
    } else {
      setPositions([...positions, form]);
    }
    setShowForm(false);
    setEditing(null);
    setForm({ position_code: "", position_name: "" });
  };

  const handleEdit = (pos: Position) => {
    setEditing(pos);
    setForm(pos);
    setShowForm(true);
  };

  const handleDelete = (code: string) => {
    if (window.confirm("Xóa chức vụ này?")) {
      setPositions(positions.filter((pos) => pos.position_code !== code));
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "20px", fontFamily: "sans-serif", border: "solid black 1px", width: 960 }}>
          <h1>Danh sách chức vụ</h1>

          {showForm && (
            <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
              <input
                placeholder="Mã chức vụ"
                value={form.position_code}
                onChange={(e) =>
                  setForm({ ...form, position_code: e.target.value })
                }
                required
              />
              <input
                placeholder="Tên chức vụ"
                value={form.position_name}
                onChange={(e) =>
                  setForm({ ...form, position_name: e.target.value })
                }
                required
              />
              <button type="submit">Lưu</button>
            </form>
          )}

          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditing(null);
              setForm({ position_code: "", position_name: "" });
            }}
            style={{ marginTop: 20 }}
          >
            {showForm ? "Đóng form" : "Thêm chức vụ"}
          </button>

          <table
            border={1}
            cellPadding={10}
            style={{ marginTop: 20, width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr style={{ backgroundColor: "#0056b3", color: "white" }}>
                <th>Mã chức vụ</th>
                <th>Tên chức vụ</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((pos) => (
                <tr key={pos.position_code}>
                  <td>{pos.position_code}</td>
                  <td>{pos.position_name}</td>
                  <td>
                    <button onClick={() => handleEdit(pos)}>Sửa</button>
                    <button onClick={() => handleDelete(pos.position_code)}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: 20 }}>
            <Link to="/">Quay về trang chủ</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
