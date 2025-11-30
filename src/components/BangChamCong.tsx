import { useState } from "react";
import { ThongTinChamCongThang } from "./TaskData";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import TheChamCong from "./TheChamCong";

const BangChamCong = (props: {
  BangThongTinChamCong: ThongTinChamCongThang[];
}) => {
  const { BangThongTinChamCong } = props;
  const [page, setPage] = useState(1);
  const duLieuTrongMotTrang = 23;
  const viTriBatDau = (page - 1) * duLieuTrongMotTrang;
  const duLieuTamThoi = BangThongTinChamCong.slice(
    viTriBatDau,
    viTriBatDau + duLieuTrongMotTrang
  );
  const isActive = page;
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex ", gap: 8 }}>
        <Sidebar />
        <div style={{ height: 500, width: "85vw" }}>
          <table border={1} cellPadding={10}>
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
                <TheChamCong thongTinChamCong={e} />
              ))}
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              border: "1px solid black",
              justifyContent: "center",
              marginTop: 8,
            }}
          >
            {[...Array(BangThongTinChamCong.length / 23)].map((e, i) => {
              const currentPage = i + 1;
              const isActive = currentPage === page;
              return (
                <button
                  key={currentPage}
                  className={`page-btn ${isActive ? "active" : ""}`}
                  onClick={() => setPage(currentPage)}
                  aria-current={isActive ? "page" : undefined}
                >
                  {currentPage}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BangChamCong;
