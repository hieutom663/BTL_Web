<<<<<<< HEAD
import React, { useState } from "react";
import { danhSachPhongBan, Department } from "./TaskData";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const QuanLyPhongBan = () => {
  const [departments, setDepartments] =
    useState<Department[]>(danhSachPhongBan);
  const [formData, setFormData] = useState<Department>({
    code: "",
    ten: "",
    foundedYear: 2023,
  });
  const [isEditing, setIsEditing] = useState(false);

  // --- CHỨC NĂNG THÊM / LƯU --- (Giữ nguyên)
  const handleSave = () => {
    if (!formData.code || !formData.ten)
      return alert("Vui lòng nhập đủ thông tin!");

    if (isEditing) {
      // Logic Sửa: Tìm và cập nhật
      const updatedList = departments.map((d) =>
        d.code === formData.code ? formData : d
      );
      setDepartments(updatedList);
      setIsEditing(false);
      alert("Cập nhật thành công!");
    } else {
      // Logic Thêm: Check trùng ID trước
      if (departments.some((d) => d.code === formData.code)) {
        return alert("Mã phòng ban đã tồn tại!");
      }
      setDepartments([...departments, formData]);
      alert("Thêm mới thành công!");
    }

    // Reset form
    setFormData({ code: "", ten: "", foundedYear: 2023 });
  };

  // CHỨC NĂNG XÓA
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
          {/* Phần Thêm/Sửa Form (Giữ nguyên) */}
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
                    setFormData({ code: "", ten: "", foundedYear: 2023 });
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Hủy
                </button>
              )}
            </div>
          </div>
          {/* Phần Bảng dữ liệu */}
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
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((d) => (
                <tr key={d.code}>
                  <td>{d.code}</td>
                  <td>{d.ten}</td>
                  <td>{d.foundedYear}</td>
                  <td>
                    {/* THÊM NÚT XEM CHI TIẾT VÀ ĐIỀU HƯỚNG */}
                    <Link
                      to={`/departments/${d.code}`} // Dùng mã phòng ban để tạo URL động
                      style={{
                        marginRight: "5px",
                        cursor: "pointer",
                        backgroundColor: "#007bff", // Màu xanh dương
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        textDecoration: "none",
                        display: "inline-block",
                      }}
                    >
                      Xem chi tiết
                    </Link>
                    {/* Nút Sửa */}
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
                    {/* Nút Xóa */}
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

export default QuanLyPhongBan;
=======
import { PhongBan } from "./TaskData";
import { useNavigate } from "react-router-dom";

const QuanLyPhongBan = (props: {
  danhSachPhongBan: PhongBan[];
  setDanhSachPhongBan: any;
  setFlag: any;
  setFormSua: any;
  setFormData: any;
}) => {
  const {
    danhSachPhongBan,
    setDanhSachPhongBan,
    setFlag,
    setFormSua,
    setFormData,
  } = props;
  const navigate = useNavigate();
  return (
    <>
      <div style={{ padding: "20px", fontFamily: "sans-serif", width: "85vw" }}>
        <h2 style={{ color: "#0056b3", marginBottom: 8 }}>
          Quản lý Danh sách Phòng ban
        </h2>
        <h3>Số phòng ban: {danhSachPhongBan.length}</h3>
        <button
          style={{
            backgroundColor: "#0056b3",
            color: "white",
            border: "none",
            padding: "8px 16px",
            cursor: "pointer",
            textDecoration: "none",
            margin: "8px 8px 8px 0px",
          }}
          onClick={() => {
            setFlag(true);
          }}
        >
          Thêm phòng ban mới
        </button>
        <hr></hr>
        <table
          border={1}
          cellPadding={10}
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
            marginTop: 8,
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#0056b3",
                color: "white",
              }}
            >
              <th>Mã Phòng</th>
              <th>Tên Phòng Ban</th>
              <th>Năm Thành Lập</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {danhSachPhongBan.map((d) => (
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
                      marginLeft: "5px",
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
                    style={{
                      marginRight: "5px",
                      cursor: "pointer",
                      backgroundColor: "#ffc107",
                      border: "none",
                      padding: "5px 10px",
                    }}
                    onClick={async () => {
                      setFormSua(true);
                      setFormData(d);
                      setFlag(true);
                    }}
                  >
                    Sửa
                  </button>
                  |{" "}
                  <button
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      textDecoration: "none",
                    }}
                    onClick={async () => {
                      if (
                        !window.confirm(`Bạn chắc chắn muốn xóa ${d.tenPhong}?`)
                      )
                        return;
                      try {
                        const response = await fetch(
                          `http://localhost:3000/api/xoaphongban/${d.maPhong}`,
                          { method: "DELETE" }
                        );
                        if (response.ok) {
                          alert("Xóa thành công");
                          setDanhSachPhongBan(
                            danhSachPhongBan.filter(
                              (p) => p.maPhong !== d.maPhong
                            )
                          );
                        }
                      } catch {
                        alert("Lỗi server!");
                      }
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
      </div>
      ;
    </>
  );
};
export default QuanLyPhongBan;
>>>>>>> hieu
