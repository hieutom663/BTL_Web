import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "./TrangChu.css";

const TrangChu = () => {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const [notes, setNotes] = useState<Record<string, string>>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [noteInput, setNoteInput] = useState("");

  const weekdays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  let startDay = new Date(currentYear, currentMonth, 1).getDay();
  if (startDay === 0) startDay = 7;

  const calendarCells: (string | number)[] = [];

  for (let i = 1; i < startDay; i++) calendarCells.push("");
  for (let i = 1; i <= daysInMonth; i++) calendarCells.push(i);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else setCurrentMonth(currentMonth - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else setCurrentMonth(currentMonth + 1);
  };

  const makeKey = (y: number, m: number, d: number) => `${y}-${m + 1}-${d}`;

  const openNotePopup = (day: number) => {
    const key = makeKey(currentYear, currentMonth, day);
    setSelectedDate(key);
    setNoteInput(notes[key] || "");
  };

  const saveNote = () => {
    if (selectedDate) {
      setNotes({
        ...notes,
        [selectedDate]: noteInput,
      });
    }
    setSelectedDate(null);
  };

  const deleteNote = () => {
    if (selectedDate) {
      const temp = { ...notes };
      delete temp[selectedDate];
      setNotes(temp);
    }
    setSelectedDate(null);
  };

  return (
    <div className="trangchu-container">
      <Navbar />

      <div className="trangchu-body">
        <Sidebar />

        <div className="trangchu-content">
          <div className="welcome-card">
            <div className="welcome-icon">✌️</div>
            <div>
              <div className="welcome-text">Xin chào,</div>
              <div className="welcome-text">mừng bạn quay lại</div>
            </div>
          </div>

          <div className="calendar-card">
            <div className="calendar-header">
              <div className="calendar-title">Lịch</div>
              <div className="calendar-viewall">Xem tất cả</div>
            </div>

            <div className="calendar-month-row">
              <button className="arrow-btn" onClick={prevMonth}>
                {"<"}
              </button>

              <div className="calendar-month">
                Tháng {currentMonth + 1}/{currentYear}
              </div>

              <button className="arrow-btn" onClick={nextMonth}>
                {">"}
              </button>
            </div>

            <div className="calendar-grid">
              {weekdays.map((d) => (
                <div key={d} className="calendar-day-header">
                  {d}
                </div>
              ))}

              {calendarCells.map((day, index) => {
                const isToday =
                  day === today.getDate() &&
                  currentMonth === today.getMonth() &&
                  currentYear === today.getFullYear();

                const key =
                  typeof day === "number"
                    ? makeKey(currentYear, currentMonth, day)
                    : "";

                const hasNote = typeof day === "number" && notes[key];

                return (
                  <div
                    key={index}
                    onClick={() => typeof day === "number" && openNotePopup(day)}
                    className={isToday ? "calendar-today" : "calendar-day"}
                    style={{ position: "relative" }}
                  >
                    {day}

                    {hasNote && <div className="event-dot"></div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ===== POPUP GHI CHÚ ===== */}
      {selectedDate && (
        <div className="note-popup-overlay">
          <div className="note-popup">
            <h3>Ghi chú ngày {selectedDate}</h3>

            <textarea
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder="Nhập ghi chú..."
            ></textarea>

            <div className="popup-buttons">
              <button onClick={saveNote} className="btn-save">
                Lưu
              </button>

              <button onClick={() => setSelectedDate(null)} className="btn-cancel">
                Đóng
              </button>

              {notes[selectedDate] && (
                <button onClick={deleteNote} className="btn-delete">
                  Xóa
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrangChu;
