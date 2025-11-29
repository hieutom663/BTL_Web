import React, { useState } from "react";
import "./EmployeeList.css";
import { NhanVien, danhSachNhanVien } from "./TaskData";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

export default function DanhSachNhanVien() {
  const formBanDau: NhanVien = {
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

  const [dsNhanVien, setDsNhanVien] = useState<NhanVien[]>(danhSachNhanVien);
  const [hienForm, setHienForm] = useState(false);
  const [nhanVienDangSua, setNhanVienDangSua] = useState<NhanVien | null>(null);
  const [duLieuForm, setDuLieuForm] = useState<NhanVien>({ ...formBanDau });

  const [trangHienTai, setTrangHienTai] = useState(1);
  const soLuongMoiTrang = 10;
  const tongSoTrang = Math.ceil(dsNhanVien.length / soLuongMoiTrang);

  const chiSoCuoi = trangHienTai * soLuongMoiTrang;
  const chiSoDau = chiSoCuoi - soLuongMoiTrang;
  const nhanVienHienThi = dsNhanVien.slice(chiSoDau, chiSoCuoi);

  const xuLyLuu = (e: React.FormEvent) => {
    e.preventDefault();

    if (nhanVienDangSua) {
      setDsNhanVien(
        dsNhanVien.map((nv) =>
          nv.id === nhanVienDangSua.id ? { ...duLieuForm } : nv
        )
      );
    } else {
      setDsNhanVien([...dsNhanVien, { ...duLieuForm }]);
    }

    setHienForm(false);
    setNhanVienDangSua(null);
    setDuLieuForm({ ...formBanDau });
    setTrangHienTai(1);
  };

  const xuLySua = (nv: NhanVien) => {
    setNhanVienDangSua(nv);
    setDuLieuForm({ ...nv });
    setHienForm(true);
  };

  const xuLyXoa = (id: string) => {
    if (window.confirm("Bạn có chắc muốn xóa nhân viên này?")) {
      setDsNhanVien(dsNhanVien.filter((nv) => nv.id !== id));
      setTrangHienTai(1);
    }
  };

  const xuLyPrev = () => {
    setTrangHienTai((prev) => Math.max(prev - 1, 1));
  };

  const xuLyNext = () => {
    setTrangHienTai((prev) => Math.min(prev + 1, tongSoTrang));
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
              setHienForm(!hienForm);
              setNhanVienDangSua(null);
              setDuLieuForm({ ...formBanDau });
            }}
          >
            {hienForm ? "Đóng form" : "Thêm nhân viên"}
          </button>

          {hienForm && (
            <form className="employee-form" onSubmit={xuLyLuu}>
              <input
                placeholder="Mã nhân viên"
                value={duLieuForm.id}
                onChange={(e) =>
                  setDuLieuForm({ ...duLieuForm, id: e.target.value })
                }
                required
              />

              <input
                placeholder="Họ tên"
                value={duLieuForm.ten}
                onChange={(e) =>
                  setDuLieuForm({ ...duLieuForm, ten: e.target.value })
                }
                required
              />

              <input
                placeholder="Phòng ban"
                value={duLieuForm.tenPhong}
                onChange={(e) =>
                  setDuLieuForm({ ...duLieuForm, tenPhong: e.target.value })
                }
                required
              />

              <input
                placeholder="Chức vụ"
                value={duLieuForm.chucVu}
                onChange={(e) =>
                  setDuLieuForm({ ...duLieuForm, chucVu: e.target.value })
                }
                required
              />

              <input
                type="number"
                placeholder="Lương cơ bản"
                value={duLieuForm.luongCoBan}
                onChange={(e) =>
                  setDuLieuForm({
                    ...duLieuForm,
                    luongCoBan: Number(e.target.value),
                  })
                }
                required
              />

              <input
                type="date"
                value={duLieuForm.ngayBatDau.toISOString().split("T")[0]}
                onChange={(e) =>
                  setDuLieuForm({
                    ...duLieuForm,
                    ngayBatDau: new Date(e.target.value),
                  })
                }
              />

              <select
                value={duLieuForm.gioiTinh}
                onChange={(e) =>
                  setDuLieuForm({ ...duLieuForm, gioiTinh: e.target.value })
                }
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
              {nhanVienHienThi.map((nv) => (
                <tr key={nv.id}>
                  <td>{nv.id}</td>
                  <td>{nv.ten}</td>
                  <td>{nv.tenPhong}</td>
                  <td>{nv.chucVu}</td>
                  <td>{nv.luongCoBan.toLocaleString()}₫</td>
                  <td>{nv.ngayBatDau.toLocaleDateString()}</td>
                  <td>{nv.gioiTinh}</td>
                  <td>
                    <button onClick={() => xuLySua(nv)}>Sửa</button>
                    <button onClick={() => xuLyXoa(nv.id)}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button onClick={xuLyPrev} disabled={trangHienTai === 1}>
              Prev
            </button>
            <span style={{ margin: "0 10px" }}>
              Trang {trangHienTai} / {tongSoTrang}
            </span>
            <button onClick={xuLyNext} disabled={trangHienTai === tongSoTrang}>
              Next
            </button>
          </div>

          <div className="back-link">
            <Link to="/">Quay về trang chủ</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
