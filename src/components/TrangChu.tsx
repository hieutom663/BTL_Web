import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "./TrangChu.css";
import { maNv, NhanVien } from "./TaskData";
import axios from "axios";
import BangVang from "./BangVang";

const TrangChu = () => {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const [ghiChu, setGhiChu] = useState<Record<string, string>>({});
  const [ngayChon, setNgayChon] = useState<string | null>(null);
  const [inputGhiChu, setInputGhiChu] = useState("");

  const thuTrongTuan = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

  const soNgayTrongThang = new Date(currentYear, currentMonth + 1, 0).getDate();

  let ngayBatDau = new Date(currentYear, currentMonth, 1).getDay();
  if (ngayBatDau === 0) ngayBatDau = 7;

  const cacOTrongLich: (string | number)[] = [];

  for (let i = 1; i < ngayBatDau; i++) cacOTrongLich.push("");
  for (let i = 1; i <= soNgayTrongThang; i++) cacOTrongLich.push(i);

  const thangTruoc = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else setCurrentMonth(currentMonth - 1);
  };

  const thangSau = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else setCurrentMonth(currentMonth + 1);
  };

  const taoKey = (y: number, m: number, d: number) => `${y}-${m + 1}-${d}`;

  const moPopupGhiChu = (day: number) => {
    const key = taoKey(currentYear, currentMonth, day);
    setNgayChon(key);
    setInputGhiChu(ghiChu[key] || "");
  };

  const luuGhiChu = () => {
    if (ngayChon) {
      setGhiChu({
        ...ghiChu,
        [ngayChon]: inputGhiChu,
      });
    }
    setNgayChon(null);
  };

  const xoaGhiChu = () => {
    if (ngayChon) {
      const temp = { ...ghiChu };
      delete temp[ngayChon];
      setGhiChu(temp);
    }
    setNgayChon(null);
  };
  const [danhSachNhanVien, setDanhSachNhanVien] = useState<NhanVien[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/danhsachnhanvien")
      .then((res) => setDanhSachNhanVien(res.data))
      .catch((err) => console.log("Lỗi", err));
  }, []);

  return (
    <div className="trangchu-container">
      <Navbar />

      <div className="trangchu-body">
        <Sidebar />

        <div className="trangchu-content">
          {/* Thẻ chào mừng */}
          <div className="hang1">
            <div className="welcome-card">
              <div className="welcome-icon">✌️</div>
              <div>
                <div className="welcome-text">
                  Xin chào,{" "}
                  {
                    danhSachNhanVien.find((e) => e.maNhanVien === maNv)
                      ?.tenNhanVien
                  }
                </div>
                <div className="welcome-text">chào mừng bạn quay lại</div>
              </div>
            </div>

            {/* Thẻ lịch */}

            <div className="calendar-card">
              <div className="calendar-header">
                <div className="calendar-title">Lịch</div>
              </div>

              <div className="calendar-month-row">
                <button className="arrow-btn" onClick={thangTruoc}>
                  {"<"}
                </button>

                <div className="calendar-month">
                  Tháng {currentMonth + 1}/{currentYear}
                </div>

                <button className="arrow-btn" onClick={thangSau}>
                  {">"}
                </button>
              </div>

              <div className="calendar-grid">
                {thuTrongTuan.map((d) => (
                  <div key={d} className="calendar-day-header">
                    {d}
                  </div>
                ))}

                {cacOTrongLich.map((day, index) => {
                  const isToday =
                    day === today.getDate() &&
                    currentMonth === today.getMonth() &&
                    currentYear === today.getFullYear();

                  const key =
                    typeof day === "number"
                      ? taoKey(currentYear, currentMonth, day)
                      : "";

                  const coGhiChu = typeof day === "number" && ghiChu[key];

                  return (
                    <div
                      key={index}
                      onClick={() =>
                        typeof day === "number" && moPopupGhiChu(day)
                      }
                      className={isToday ? "calendar-today" : "calendar-day"}
                      style={{
                        position: "relative",
                        fontWeight: isToday ? "bold" : "normal",
                      }}
                    >
                      {day}
                      {coGhiChu && <div className="event-dot"></div>}
                    </div>
                  );
                })}
              </div>
              {ngayChon && (
                <div className="note-popup-overlay">
                  <div className="note-popup">
                    <h3>Ghi chú ngày {ngayChon}</h3>

                    <textarea
                      value={inputGhiChu}
                      onChange={(e) => setInputGhiChu(e.target.value)}
                      placeholder="Nhập ghi chú..."
                    ></textarea>

                    <div className="popup-buttons">
                      <button onClick={luuGhiChu} className="btn-save">
                        Lưu
                      </button>

                      <button
                        onClick={() => setNgayChon(null)}
                        className="btn-cancel"
                      >
                        Đóng
                      </button>

                      {ghiChu[ngayChon] && (
                        <button onClick={xoaGhiChu} className="btn-delete">
                          Xóa
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <BangVang danhSachNhanVien={danhSachNhanVien} />
        </div>
      </div>
    </div>
  );
};

export default TrangChu;
