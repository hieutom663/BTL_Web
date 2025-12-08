import React, { useEffect, useState } from "react";
import "./DanhSachNhanVien.css";
import { NhanVien, PhongBan, ChucVu } from "./TaskData";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import TheNhanVien from "./TheNhanVien";
import FormQuanLyNhanVien from "./FormQuanLyNhanVien";

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

  const [trangHienTai, setTrangHienTai] = useState(1);
  const soLuongMoiTrang = 10;
  const tongSoTrang = Math.ceil(dsNhanVien.length / soLuongMoiTrang);
  const chiSoCuoi = trangHienTai * soLuongMoiTrang;
  const chiSoDau = chiSoCuoi - soLuongMoiTrang;
  const nhanVienHienThi = dsNhanVien.slice(chiSoDau, chiSoCuoi);

  useEffect(() => {
    axios
      .get("http://localhost:3000/danhsachnhanvien")
      .then((res) => setDsNhanVien(res.data));
    axios
      .get("http://localhost:3000/danhsachphongban")
      .then((res) => setDsPhongBan(res.data));
    axios
      .get("http://localhost:3000/chucvu")
      .then((res) => setDsChucVu(res.data));
  }, []);

  const xuLyLuu = async () => {
    if (!duLieuForm.maNhanVien.trim())
      return alert("Mã nhân viên không được để trống!");
    if (!duLieuForm.tenNhanVien.trim())
      return alert("Họ tên không được để trống!");
    if (!duLieuForm.tenPhong.trim())
      return alert("Phòng ban không được để trống!");
    if (!duLieuForm.chucVu.trim()) return alert("Chức vụ không được để trống!");
    if (duLieuForm.luongCoBan <= 0)
      return alert("Lương cơ bản phải lớn hơn 0!");
    if (!duLieuForm.gioiTinh) return alert("Vui lòng chọn giới tính!");

    if (cheDoHopThoai === "them") {
      try {
        const response = await fetch("http://localhost:3000/api/themnhanvien", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(duLieuForm),
        });

        const data = await response.json();
        if (!response.ok)
          return alert(data.message || "Lỗi khi thêm nhân viên");

        alert("Thêm nhân viên thành công");
        setCheDoHopThoai(null);
        window.location.reload();
      } catch {
        alert("Lỗi server khi thêm nhân viên");
      }
    }

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
        setCheDoHopThoai(null);
        window.location.reload();
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

          <TheNhanVien
            dsNhanVien={dsNhanVien}
            setDsNhanVien={setDsNhanVien}
            nhanVienHienThi={nhanVienHienThi}
            xuLySua={xuLySua}
            xuLyXem={xuLyXemChiTiet}
          />

          <div className="pagination">
            <button
              onClick={() => setTrangHienTai(Math.max(1, trangHienTai - 1))}
            >
              Prev
            </button>
            <span>
              Trang {trangHienTai} / {tongSoTrang}
            </span>
            <button
              onClick={() =>
                setTrangHienTai(Math.min(tongSoTrang, trangHienTai + 1))
              }
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
                <button
                  className="close-btn"
                  onClick={() => setCheDoHopThoai(null)}
                >
                  X
                </button>

                <h2>
                  {cheDoHopThoai === "them"
                    ? "Thêm nhân viên"
                    : cheDoHopThoai === "sua"
                    ? "Chỉnh sửa nhân viên"
                    : "Thông tin chi tiết"}
                </h2>

                <FormQuanLyNhanVien
                  cheDoHopThoai={cheDoHopThoai}
                  dsChucVu={dsChucVu}
                  dsPhongBan={dsPhongBan}
                  dsNhanVien={dsNhanVien}
                  duLieuForm={duLieuForm}
                  setDuLieuForm={setDuLieuForm}
                />

                <div className="action-row">
                  {cheDoHopThoai === "xem" && (
                    <button
                      className="edit-btn"
                      onClick={() => setCheDoHopThoai("sua")}
                    >
                      Chỉnh sửa
                    </button>
                  )}

                  {(cheDoHopThoai === "them" || cheDoHopThoai === "sua") && (
                    <button className="btn-save" onClick={xuLyLuu}>
                      {cheDoHopThoai === "them"
                        ? "Thêm nhân viên"
                        : cheDoHopThoai === "sua"
                        ? "Chỉnh sửa nhân viên"
                        : "Thông tin chi tiết"}
                    </button>
                  )}

                  <button
                    className="btn-cancel"
                    onClick={() => setCheDoHopThoai(null)}
                  >
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
