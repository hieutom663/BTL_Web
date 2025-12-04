import React, { useState } from "react";
import "./DanhSachNhanVien.css";
import { NhanVien, ngayThang, sinhId } from "./TaskData";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

export default function DanhSachNhanVien(props: {
  danhSachNhanVien: NhanVien[];
}) {
  const { danhSachNhanVien } = props;
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
    thuTuTheoNgayVaoLam: 0,
    emailNhanVien: "",
  };
  const [dsNhanVien, setDsNhanVien] = useState<NhanVien[]>(danhSachNhanVien);
  const [nhanVienDangSua, setNhanVienDangSua] = useState<NhanVien | null>(null);
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

  const xuLyLuu = () => {
    if (!duLieuForm.maNhanVien.trim()) {
      alert("Mã nhân viên không được để trống!");
      return;
    }
    if (!duLieuForm.tenNhanVien.trim()) {
      alert("Họ tên không được để trống!");
      return;
    }
    if (!duLieuForm.tenPhong.trim()) {
      alert("Phòng ban không được để trống!");
      return;
    }
    if (!duLieuForm.chucVu.trim()) {
      alert("Chức vụ không được để trống!");
      return;
    }
    if (!duLieuForm.luongCoBan || duLieuForm.luongCoBan <= 0) {
      alert("Lương cơ bản phải lớn hơn 0!");
      return;
    }
    if (!duLieuForm.gioiTinh) {
      alert("Vui lòng chọn giới tính!");
      return;
    }

    if (cheDoHopThoai === "them") {
      setDsNhanVien([...dsNhanVien, { ...duLieuForm }]);
    } else if (cheDoHopThoai === "sua" && nhanVienDangSua) {
      setDsNhanVien(
        dsNhanVien.map((nv) =>
          nv.maPhong === nhanVienDangSua.maNhanVien ? { ...duLieuForm } : nv
        )
      );
    }

    setCheDoHopThoai(null);
    setNhanVienDangSua(null);
    setDuLieuForm({ ...formBanDau });
  };

  const xuLySua = (nv: NhanVien) => {
    setNhanVienDangSua(nv);
    setDuLieuForm({ ...nv });
    setCheDoHopThoai("sua");
  };

  const xuLyXemChiTiet = (nv: NhanVien) => {
    setNhanVienDangSua(nv);
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
                        if (
                          window.confirm("Bạn có chắc muốn xóa nhân viên này?")
                        )
                          setDsNhanVien(
                            dsNhanVien.filter(
                              (x) => x.maNhanVien !== nv.maNhanVien
                            )
                          );
                      }}
                    >
                      Xóa
                    </button>{" "}
                    |{" "}
                    <button onClick={() => xuLyXemChiTiet(nv)}>Chi tiết</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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

                <div className="employee-form">
                  <input
                    placeholder="Mã nhân viên"
                    value={duLieuForm.maNhanVien}
                    onChange={(e) =>
                      setDuLieuForm({
                        ...duLieuForm,
                        maNhanVien: e.target.value,
                      })
                    }
                    disabled={cheDoHopThoai === "xem"}
                  />
                  <input
                    placeholder="Họ tên"
                    value={duLieuForm.tenNhanVien}
                    onChange={(e) =>
                      setDuLieuForm({
                        ...duLieuForm,
                        tenNhanVien: e.target.value,
                      })
                    }
                    disabled={cheDoHopThoai === "xem"}
                  />
                  {/* <input
                    placeholder="Email"
                    value={duLieuForm.email || ""}
                    onChange={(e) =>
                      setDuLieuForm({ ...duLieuForm, email: e.target.value })
                    }
                    disabled={cheDoHopThoai === "xem"}
                  /> */}
                  <input
                    placeholder="Số điện thoại"
                    value={duLieuForm.soLienLac || ""}
                    onChange={(e) =>
                      setDuLieuForm({
                        ...duLieuForm,
                        soLienLac: e.target.value,
                      })
                    }
                    disabled={cheDoHopThoai === "xem"}
                  />
                  <input
                    placeholder="Phòng ban"
                    value={duLieuForm.tenPhong}
                    onChange={(e) =>
                      setDuLieuForm({ ...duLieuForm, tenPhong: e.target.value })
                    }
                    disabled={cheDoHopThoai === "xem"}
                  />
                  <input
                    placeholder="Chức vụ"
                    value={duLieuForm.chucVu}
                    onChange={(e) =>
                      setDuLieuForm({ ...duLieuForm, chucVu: e.target.value })
                    }
                    disabled={cheDoHopThoai === "xem"}
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
                    disabled={cheDoHopThoai === "xem"}
                  />
                  <input
                    type="date"
                    value={
                      new Date(duLieuForm.ngayBatDauLamViec)
                        .toISOString()
                        .split("T")[0]
                    }
                    onChange={(e) =>
                      setDuLieuForm({
                        ...duLieuForm,
                        ngayBatDauLamViec: new Date(e.target.value),
                      })
                    }
                    disabled={cheDoHopThoai === "xem"}
                  />
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
                    <option value="Gay">Gay</option>
                  </select>
                  {/* <input
                    placeholder="Địa chỉ"
                    value={duLieuForm.diaChi || ""}
                    onChange={(e) =>
                      setDuLieuForm({ ...duLieuForm, diaChi: e.target.value })
                    }
                    disabled={cheDoHopThoai === "xem"}
                  /> */}
                </div>

                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    gap: "10px",
                    justifyContent: "center",
                  }}
                >
                  {cheDoHopThoai === "xem" && (
                    <button
                      className="edit-btn"
                      onClick={() => setCheDoHopThoai("sua")}
                    >
                      Chỉnh sửa
                    </button>
                  )}
                  {(cheDoHopThoai === "sua" || cheDoHopThoai === "them") && (
                    <button className="btn-save" onClick={xuLyLuu}>
                      Lưu
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
