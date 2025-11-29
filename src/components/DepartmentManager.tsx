import React, { useState } from "react";
import { danhSachPhongBan, Department } from "./TaskData";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DepartmentManager = () => {
  const [departments, setDepartments] =
    useState<Department[]>(danhSachPhongBan);
  const [formData, setFormData] = useState<Department>({
    code: "",
    ten: "",
    foundedYear: 2025,
    status: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    if (!formData.code || !formData.ten)
      return alert("Vui lòng nhập đủ thông tin!");

    if (isEditing) {
      const updatedList = departments.map((d) =>
        d.code === formData.code ? formData : d
      );
      setDepartments(updatedList);
      setIsEditing(false);
      alert("Cập nhật thành công!");
    } else {
      if (departments.some((d) => d.code === formData.code)) {
        return alert("Mã phòng ban đã tồn tại!");
      }
      setDepartments([...departments, formData]);
      alert("Thêm mới thành công!");
    }

    setFormData({ code: "", ten: "", foundedYear: 2025, status: "" });
  };

  const handleDelete = (code: string) => {
    if (window.confirm(`Bạn có chắc muốn xóa phòng ${code}?`)) {
      setDepartments(departments.filter((d) => d.code !== code));
    }
  };
  const handleEdit = (dept: Department) => {
    setFormData(dept);
    setIsEditing(true);
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex " }}>
        <Sidebar />
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
          <h2 style={{ color: "#28a745" }}>Quản lý Danh sách Phòng ban</h2>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "20px",
              borderRadius: "8px",
            }}
          >
            <h4>{isEditing ? "Chỉnh sửa thông tin" : "Thêm phòng ban mới"}</h4>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <input
                type="text"
                placeholder="Mã phòng"
                value={formData.code}
                disabled={isEditing}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    code: e.target.value.toUpperCase(),
                  })
                }
                style={{ padding: "8px", width: "120px" }}
              />
              <input
                type="text"
                placeholder="Tên phòng ban"
                value={formData.ten}
                onChange={(e) =>
                  setFormData({ ...formData, ten: e.target.value })
                }
                style={{ padding: "8px", flex: 1 }}
              />
              <input
                type="number"
                placeholder="Năm TL"
                value={formData.foundedYear}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    foundedYear: parseInt(e.target.value),
                  })
                }
                style={{ padding: "8px", width: "100px" }}
              />
              <button
                onClick={handleSave}
                style={{
                  backgroundColor: isEditing ? "#ffc107" : "#28a745",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  cursor: "pointer",
                }}
              >
                {isEditing ? "Lưu thay đổi" : "Thêm mới"}
              </button>

              {isEditing && (
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      code: "",
                      ten: "",
                      foundedYear: 2025,
                      status: "",
                    });
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Hủy
                </button>
              )}
            </div>
          </div>
          <table
            border={1}
            cellPadding={10}
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "center",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#28a745", color: "white" }}>
                <th>Mã Phòng</th>
                <th>Tên Phòng Ban</th>
                <th>Năm Thành Lập</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((d) => (
                <tr key={d.code}>
                  <td>{d.code}</td>
                  <td>{d.ten}</td>
                  <td>{d.foundedYear}</td>
                  <td>{d.status}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(d)}
                      style={{
                        marginRight: "5px",
                        cursor: "pointer",
                        backgroundColor: "#ffc107",
                        border: "none",
                        padding: "5px 10px",
                      }}
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(d.code)}
                      style={{
                        cursor: "pointer",
                        backgroundColor: "#dc3545",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                      }}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <br />
          <Link to="/">Quay về trang chủ</Link>
        </div>
      </div>
    </div>
  );
};

export default DepartmentManager;
