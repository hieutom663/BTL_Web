import React, { useEffect, useState } from "react";
import "./DanhSachNhanVien.css";
import { NhanVien, PhongBan, ngayThang, ChucVu, chucVuMap } from "./TaskData";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import axios from "axios";

export default function DanhSachNhanVien() {
  const formBanDau = {
    maNhanVien: "",
    tenNhanVien: "",
    soLienLac: "",
    ngaySinh: new Date(),
    gioiTinh: "",
    ngayBatDauLamViec: new Date(),
    maChucVu: "",
    chucVu: "",
    maPhong: "",
    tenPhong: "",
    luongCoBan: 0,
    thuTuTheoNgayVaoLam: "",
    emailNhanVien: "",
  };

  const [dsNhanVien, setDsNhanVien] = useState<NhanVien[]>([]);
  const [dsPhongBan, setDsPhongBan] = useState<PhongBan[]>([]);
  const [dsChucVu, setDsChucVu] = useState<ChucVu[]>([]);
  const [duLieuForm, setDuLieuForm] = useState<NhanVien>(formBanDau);

  const [cheDoHopThoai, setCheDoHopThoai] = useState<
    "them" | "xem" | "sua" | null
  >(null);

  // Pagination
  const [trangHienTai, setTrangHienTai] = useState(1);
  const soLuongMoiTrang = 10;
  const tongSoTrang = Math.ceil(dsNhanVien.length / soLuongMoiTrang);
  const chiSoCuoi = trangHienTai * soLuongMoiTrang;
  const chiSoDau = chiSoCuoi - soLuongMoiTrang;
  const nhanVienHienThi = dsNhanVien.slice(chiSoDau, chiSoCuoi);

  // Load dữ liệu
  useEffect(() => {
    axios.get("http://localhost:3000/danhsachnhanvien").then((res) => setDsNhanVien(res.data));
    axios.get("http://localhost:3000/danhsachphongban").then((res) => setDsPhongBan(res.data));
    axios.get("http://localhost:3000/chucvu").then((res) => setDsChucVu(res.data));
  }, []);

  const maPhongMap = Object.fromEntries(
    dsPhongBan.map((e) => [e.tenPhong, e.maPhong])
  );

  // ===========================
  // LƯU NHÂN VIÊN (THÊM / SỬA)
  // ===========================
  const xuLyLuu = async () => {
    if (!duLieuForm.maNhanVien.trim()) return alert("Mã nhân viên không được để trống!");
    if (!duLieuForm.tenNhanVien.trim()) return alert("Họ tên không được để trống!");
    if (!duLieuForm.tenPhong.trim()) return alert("Phòng ban không được để trống!");
    if (!duLieuForm.chucVu.trim()) return alert("Chức vụ không được để trống!");
    if (duLieuForm.luongCoBan <= 0) return alert("Lương cơ bản phải lớn hơn 0!");
    if (!duLieuForm.gioiTinh) return alert("Vui lòng chọn giới tính!");

    // ================
    // THÊM NHÂN VIÊN
    // ================
    if (cheDoHopThoai === "them") {
      try {
        const response = await fetch("http://localhost:3000/api/themnhanvien", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(duLieuForm),
        });

        const data = await response.json();
        if (!response.ok) return alert(data.message || "Lỗi khi thêm nhân viên");

        alert("Thêm nhân viên thành công");
        window.location.reload();
      } catch {
        alert("Lỗi server khi thêm nhân viên");
      }
    }

    // ==================
    // SỬA NHÂN VIÊN
    // ==================
    if (cheDoHopThoai === "sua") {
      try {
        const response = await fetch(
          `http://localhost:3000/api/suanhanvien/${duLieuForm.maNhanVien}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(duLieuForm),
          }
        );

        const data = await response.json();
        if (!response.ok) return alert(data.message || "Lỗi khi cập nhật");

        alert("Cập nhật nhân viên thành công");

        // Cập nhật UI ngay
        setDsNhanVien((ds) =>
          ds.map((nv) =>
            nv.maNhanVien === duLieuForm.maNhanVien ? { ...duLieuForm } : nv
          )
        );

        setCheDoHopThoai(null);
      } catch {
        alert("Lỗi server khi cập nhật nhân viên");
      }
    }

    setDuLieuForm({ ...formBanDau });
  };

  const xuLySua = (nv: NhanVien) => {
    setDuLieuForm({ ...nv });
    setCheDoHopThoai("sua");
  };

  const xuLyXemChiTiet = (nv: NhanVien) => {
    setDuLieuForm({ ...nv });
    setCheDoHopThoai("xem");
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
              setDuLieuForm({ ...formBanDau });
              setCheDoHopThoai("them");
            }}
          >
            Thêm nhân viên
          </button>

          <table className="employee-table" border={1} cellPadding={10}>
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã NV</th>
                <th>Họ Tên</th>
                <th>Phòng ban</th>
                <th>Chức vụ</th>
                <th>Lương cơ bản</th>
                <th>Ngày bắt đầu</th>
                <th>Giới tính</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>
              {nhanVienHienThi.map((nv, index) => (
                <tr key={nv.maNhanVien}>
                  <td>{chiSoDau + index + 1}</td>
                  <td>{nv.maNhanVien}</td>
                  <td>{nv.tenNhanVien}</td>
                  <td>{nv.tenPhong}</td>
                  <td>{nv.chucVu}</td>
                  <td>{nv.luongCoBan.toLocaleString()}₫</td>
                  <td>{ngayThang(nv.ngayBatDauLamViec)}</td>
                  <td>{nv.gioiTinh}</td>
                  <td>
                    <button onClick={() => xuLySua(nv)}>Sửa</button> |{" "}
                    <button
                      onClick={() => {
                        if (window.confirm("Bạn có chắc muốn xóa nhân viên này?")) {
                          setDsNhanVien((ds) =>
                            ds.filter((x) => x.maNhanVien !== nv.maNhanVien)
                          );
                          // TODO: gọi API xóa ở đây
                        }
                      }}
                    >
                      Xóa
                    </button>{" "}
                    |{" "}
                    <button onClick={() => xuLyXemChiTiet(nv)}>
                      Chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button onClick={() => setTrangHienTai(Math.max(1, trangHienTai - 1))}>
              Prev
            </button>
            <span>
              Trang {trangHienTai} / {tongSoTrang}
            </span>
            <button
              onClick={() => setTrangHienTai(Math.min(tongSoTrang, trangHienTai + 1))}
            >
              Next
            </button>
          </div>

          <div className="back-link">
            <Link to="/">Quay về trang chủ</Link>
          </div>

          {cheDoHopThoai && (
            <div className="modal-overlay">
              <div className="modal-box">
                <button className="close-btn" onClick={() => setCheDoHopThoai(null)}>
                  X
                </button>

                <h2>
                  {cheDoHopThoai === "them"
                    ? "Thêm nhân viên"
                    : cheDoHopThoai === "sua"
                    ? "Chỉnh sửa nhân viên"
                    : "Thông tin chi tiết"}
                </h2>

                <div className="employee-form">
                  <div className="nhanInput">
                    <label>Mã nhân viên: </label>
                    <input
                      value={duLieuForm.maNhanVien}
                      onChange={(e) =>
                        setDuLieuForm({ ...duLieuForm, maNhanVien: e.target.value })
                      }
                      disabled={cheDoHopThoai !== "them"}
                      placeholder="Nhập mã nhân viên"
                    />
                  </div>

                  <div className="nhanInput">
                    <label>Họ tên</label>
                    <input
                      value={duLieuForm.tenNhanVien}
                      onChange={(e) =>
                        setDuLieuForm({ ...duLieuForm, tenNhanVien: e.target.value })
                      }
                      disabled={cheDoHopThoai === "xem"}
                    />
                  </div>

                  <div className="nhanInput">
                    <label>Email:</label>
                    <input
                      value={duLieuForm.emailNhanVien || ""}
                      onChange={(e) =>
                        setDuLieuForm({ ...duLieuForm, emailNhanVien: e.target.value })
                      }
                      disabled={cheDoHopThoai === "xem"}
                    />
                  </div>

                  <div className="nhanInput">
                    <label>SĐT:</label>
                    <input
                      value={duLieuForm.soLienLac || ""}
                      onChange={(e) =>
                        setDuLieuForm({ ...duLieuForm, soLienLac: e.target.value })
                      }
                      disabled={cheDoHopThoai === "xem"}
                    />
                  </div>

                  <div className="nhanInput">
                    <label>Phòng ban:</label>
                    <select
                      value={duLieuForm.tenPhong}
                      onChange={(e) =>
                        setDuLieuForm({
                          ...duLieuForm,
                          tenPhong: e.target.value,
                          maPhong: maPhongMap[e.target.value],
                        })
                      }
                      disabled={cheDoHopThoai === "xem"}
                    >
                      <option value="">Chọn phòng ban</option>
                      {dsPhongBan.map((e) => (
                        <option key={e.maPhong} value={e.tenPhong}>
                          {e.tenPhong}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="nhanInput">
                    <label>Chức vụ:</label>
                    <select
                      value={duLieuForm.chucVu}
                      onChange={(e) => {
                        const cv = e.target.value;
                        setDuLieuForm({
                          ...duLieuForm,
                          chucVu: cv,
                          maChucVu: chucVuMap[cv],
                        });
                      }}
                      disabled={cheDoHopThoai === "xem"}
                    >
                      <option value="">Chọn chức vụ</option>
                      {dsChucVu.map((e) => (
                        <option key={e.maChucVu} value={e.tenChucVu}>
                          {e.tenChucVu}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="nhanInput">
                    <label>Lương cơ bản:</label>
                    <input
                      type="number"
                      value={duLieuForm.luongCoBan}
                      onChange={(e) =>
                        setDuLieuForm({
                          ...duLieuForm,
                          luongCoBan: Number(e.target.value),
                        })
                      }
                      disabled={cheDoHopThoai === "xem"}
                    />
                  </div>

                  <div className="nhanInput">
                    <label>Ngày sinh:</label>
                    <input
                      type="date"
                      value={
                        duLieuForm.ngaySinh
                          ? new Date(duLieuForm.ngaySinh).toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        setDuLieuForm({
                          ...duLieuForm,
                          ngaySinh: new Date(e.target.value),
                        })
                      }
                      disabled={cheDoHopThoai === "xem"}
                    />
                  </div>

                  <div className="nhanInput">
                    <label>Ngày bắt đầu làm:</label>
                    <input
                      type="date"
                      value={
                        duLieuForm.ngayBatDauLamViec
                          ? new Date(duLieuForm.ngayBatDauLamViec)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        setDuLieuForm({
                          ...duLieuForm,
                          ngayBatDauLamViec: new Date(e.target.value),
                        })
                      }
                      disabled={cheDoHopThoai === "xem"}
                    />
                  </div>

                  <div className="nhanInput">
                    <label>Giới tính:</label>
                    <select
                      value={duLieuForm.gioiTinh}
                      onChange={(e) =>
                        setDuLieuForm({ ...duLieuForm, gioiTinh: e.target.value })
                      }
                      disabled={cheDoHopThoai === "xem"}
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                  </div>
                </div>

                <div className="action-row">
                  {cheDoHopThoai === "xem" && (
                    <button className="edit-btn" onClick={() => setCheDoHopThoai("sua")}>
                      Chỉnh sửa
                    </button>
                  )}

                  {(cheDoHopThoai === "them" || cheDoHopThoai === "sua") && (
                    <button className="btn-save" onClick={xuLyLuu}>
                      Lưu
                    </button>
                  )}

                  <button className="btn-cancel" onClick={() => setCheDoHopThoai(null)}>
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
