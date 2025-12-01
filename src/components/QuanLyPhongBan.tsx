import React, { useState } from "react";
import { PhongBan } from "./TaskData";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const QuanLyPhongBan = (props: { danhSachPhongBan: PhongBan[] }) => {
  const { danhSachPhongBan } = props;
  const navigate = useNavigate();
  const [phongBan, setPhongBan] = useState<PhongBan[]>(danhSachPhongBan);
  const [formData, setFormData] = useState<PhongBan>({
    maPhong: "",
    tenPhong: "",
    namThanhLap: 2025,
    trangThai: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    if (!formData.maPhong || !formData.tenPhong)
      return alert("Vui lòng nhập đủ thông tin!");

    if (isEditing) {
      const updatedList = phongBan.map((d) =>
        d.maPhong === formData.maPhong ? formData : d
      );
      setPhongBan(updatedList);
      setIsEditing(false);
      alert("Cập nhật thành công!");
    } else {
      if (phongBan.some((d) => d.maPhong === formData.maPhong)) {
        return alert("Mã phòng ban đã tồn tại!");
      }
      setPhongBan([...phongBan, formData]);
      alert("Thêm mới thành công!");
    }

    setFormData({
      maPhong: "",
      tenPhong: "",
      namThanhLap: 2025,
      trangThai: "",
    });
  };

  const handleDelete = (maPhong: string) => {
    if (window.confirm(`Bạn có chắc muốn xóa phòng ${maPhong}?`)) {
      setPhongBan(phongBan.filter((d) => d.maPhong !== maPhong));
    }
  };
  const handleEdit = (dept: PhongBan) => {
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
                value={formData.maPhong}
                disabled={isEditing}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    maPhong: e.target.value.toUpperCase(),
                  })
                }
                style={{ padding: "8px", width: "120px" }}
              />
              <input
                type="text"
                placeholder="Tên phòng ban"
                value={formData.tenPhong}
                onChange={(e) =>
                  setFormData({ ...formData, tenPhong: e.target.value })
                }
                style={{ padding: "8px", flex: 1 }}
              />
              <input
                type="number"
                placeholder="Năm TL"
                value={formData.namThanhLap}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    namThanhLap: parseInt(e.target.value),
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
                      maPhong: "",
                      tenPhong: "",
                      namThanhLap: 2025,
                      trangThai: "",
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
              {phongBan.map((d) => (
                <tr key={d.maPhong}>
                  <td>{d.maPhong}</td>
                  <td>{d.tenPhong}</td>
                  <td>{d.namThanhLap}</td>
                  <td>{d.trangThai}</td>
                  <td>
                    <button
                      onClick={() => {
                        navigate(`/departments/${d.maPhong}`);
                      }}
                      style={{
                        marginRight: "5px",
                        cursor: "pointer",
                        backgroundColor: "#24d48bff",
                        border: "none",
                        padding: "5px 10px",
                      }}
                    >
                      Chi tiết
                    </button>
                    |{" "}
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
                    |{" "}
                    <button
                      onClick={() => handleDelete(d.maPhong)}
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

export default QuanLyPhongBan;
