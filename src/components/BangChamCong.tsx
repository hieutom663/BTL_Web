import axios from "axios";
import { useState, useEffect } from "react";
import {
  duLieuNhanVien,
  maNv,
  NhanVien,
  role,
  ThongTinChamCongThang,
} from "./TaskData";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import TheChamCong from "./TheChamCong";
import BangChamCongNv from "./BangChamCongNv";
import "./css/BangChamCong.css";

const BangChamCong = () => {
  const [bangThongTinChamCong, setBangThongTinChamCong] = useState<
    ThongTinChamCongThang[]
  >([]);
  const [thongTinNhanVien, setThongTinNhanVien] =
    useState<NhanVien>(duLieuNhanVien);

  useEffect(() => {
    axios
      .get("http://localhost:3000/bangchamcong")
      .then((res) => setBangThongTinChamCong(res.data))
      .catch((err) => console.log("Lỗi", err));

    axios
      .get("http://localhost:3000/danhsachnhanvien")
      .then((res) =>
        setThongTinNhanVien(res.data.find((e: any) => e.maNhanVien === maNv))
      )
      .catch((err) => console.log("Lỗi", err));
  }, []);

  const [thang, setThang] = useState(new Date().getMonth() + 1);
  const [nam, setNam] = useState(new Date().getFullYear());
  const [ngay, setNgay] = useState(new Date().getDate());
  const [thoiGianDen, setThoiGianDen] = useState("");
  const [thoiGianVe, setThoiGianVe] = useState("");

  const [page, setPage] = useState(1);
  const ngayTrongThang = new Date(nam, thang, 0).getDate();
  const duLieuTrongMotTrang = 23;
  const viTriBatDau = (page - 1) * duLieuTrongMotTrang;

  const duLieuTheoNgay = bangThongTinChamCong.filter((e) => {
    const n = new Date(e.ngayLam);
    return (
      n.getDate() === ngay &&
      n.getMonth() + 1 === thang &&
      n.getFullYear() === nam
    );
  });

  const duLieuTamThoi = duLieuTheoNgay.slice(
    viTriBatDau,
    viTriBatDau + duLieuTrongMotTrang
  );

  return (
    <div>
      <Navbar />
      <div className="bcc-layout">
        <Sidebar />

        {role === "admin" ? (
          <div className="bcc-admin-container">
            <h2 className="bcc-title">Bảng chấm công:</h2>
            <hr />

            <div className="bcc-filter">
              <label>Ngày:</label>
              <select
                value={ngay}
                onChange={(e) => setNgay(Number(e.target.value))}
              >
                {[...Array(ngayTrongThang)].map((_, n) => (
                  <option key={n}>{n + 1}</option>
                ))}
              </select>

              <label>Tháng:</label>
              <select
                value={thang}
                onChange={(e) => setThang(Number(e.target.value))}
              >
                {[...Array(12)].map((_, t) => (
                  <option key={t}>{t + 1}</option>
                ))}
              </select>

              <label>Năm:</label>
              <select
                value={nam}
                onChange={(e) => setNam(Number(e.target.value))}
              >
                <option>{nam}</option>
              </select>
            </div>

            <hr />

            <div>
              <table border={1} cellPadding={10} className="bcc-table">
                <thead>
                  <tr>
                    <th>Mã nhân viên</th>
                    <th>Tên nhân viên</th>
                    <th>Ngày</th>
                    <th>Giờ vào làm</th>
                    <th>Giờ tan làm</th>
                    <th>Tổng giờ làm</th>
                  </tr>
                </thead>
                <tbody>
                  {duLieuTamThoi.map((e) => (
                    <TheChamCong key={e.maNhanVien} thongTinChamCong={e} />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bcc-pagination">
              {[
                ...Array(
                  Math.ceil(duLieuTheoNgay.length / duLieuTrongMotTrang)
                ),
              ].map((_, i) => {
                const currentPage = i + 1;
                const isActive = currentPage === page;
                return (
                  <button
                    key={currentPage}
                    className={`page-btn ${isActive ? "active" : ""}`}
                    onClick={() => setPage(currentPage)}
                  >
                    {currentPage}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <BangChamCongNv
            thongTinNhanVien={thongTinNhanVien}
            bangThongTinChamCong={bangThongTinChamCong}
            thang={thang}
            nam={nam}
            setThoiGianDen={setThoiGianDen}
            setThoiGianVe={setThoiGianVe}
          />
        )}
      </div>
    </div>
  );
};

export default BangChamCong;
