import { NhanVien, ThongTinChamCongThang, maNv } from "./TaskData";
import { useState } from "react";
import TheChamCong from "./TheChamCong";
import "./css/BangChamCong.css";

const BangChamCongNv = (props: {
  thongTinNhanVien: NhanVien;
  bangThongTinChamCong: ThongTinChamCongThang[];
  thang: number;
  nam: number;
  setThoiGianDen: any;
  setThoiGianVe: any;
}) => {
  const {
    thongTinNhanVien,
    bangThongTinChamCong,
    thang,
    setThoiGianDen,
    setThoiGianVe,
  } = props;

  const bangThongTinNv = bangThongTinChamCong.filter(
    (nv) => nv.maNhanVien === maNv
  );

  const trangThai = localStorage.getItem("status");

  const getThoiGian = () => {
    const now = new Date();
    const gio = String(now.getHours()).padStart(2, "0");
    const phut = String(now.getMinutes()).padStart(2, "0");
    const giay = String(now.getSeconds()).padStart(2, "0");
    return `${gio}:${phut}:${giay}`;
  };

  const [page, setPage] = useState(1);
  const duLieuTrongMotTrang = 23;
  const viTriBatDau = (page - 1) * duLieuTrongMotTrang;

  const duLieuTamThoi = bangThongTinNv.slice(
    viTriBatDau,
    viTriBatDau + duLieuTrongMotTrang
  );

  return (
    <div className="bcc-admin-container">
      <h2 className="bcc-title">Bảng chấm công tháng: {thang}</h2>

      {trangThai === null ? (
        <button
          className="checkIn"
          onClick={async () => {
            localStorage.setItem("status", "Đang làm việc");

            try {
              const response = await fetch(
                "http://localhost:3000/api/chamcongden",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    maNhanVien: thongTinNhanVien.maNhanVien,
                    tenNhanVien: thongTinNhanVien.tenNhanVien,
                    ngayLam: new Date(),
                    gioVaoLam: getThoiGian(),
                    gioTanLam: null,
                  }),
                }
              );
              const data = await response.json();
              if (!response.ok) alert(data.message || "Lỗi khi thêm");
              alert("Xin cảm ơn!");
              window.location.reload();
            } catch {
              alert("Lỗi server khi cập nhật nhân viên");
            }

            setThoiGianDen(getThoiGian());
          }}
        >
          Chấm công đến
        </button>
      ) : (
        <button
          className="checkOut"
          onClick={async () => {
            localStorage.removeItem("status");

            try {
              const response = await fetch(
                "http://localhost:3000/api/chamcongve",
                {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    gioTanLam: getThoiGian(),
                    ngayLam: new Date(),
                  }),
                }
              );
              const data = await response.json();
              if (!response.ok) alert(data.message || "Lỗi khi thêm");
              window.location.reload();
            } catch {
              alert("Lỗi server");
            }

            alert("Xin cảm ơn!");
            setThoiGianVe(getThoiGian());
          }}
        >
          Chấm công về
        </button>
      )}

      <hr />

      <table className="bcc-table" border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Mã nhân viên</th>
            <th>Họ và tên</th>
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

      <div className="bcc-pagination">
        {[...Array(Math.ceil(bangThongTinNv.length / duLieuTrongMotTrang))].map(
          (_, i) => {
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
          }
        )}
      </div>
    </div>
  );
};

export default BangChamCongNv;
