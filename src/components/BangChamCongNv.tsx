import { NhanVien, ThongTinChamCongThang, maNv, ngayThang } from "./TaskData";
import TheChamCong from "./TheChamCong";

const BangChamCongNv = (props: {
  thongTinNhanVien: NhanVien;
  bangThongTinChamCong: ThongTinChamCongThang[];
  thang: number;
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
  return (
    <div style={{ width: "85vw" }}>
      <h2>Bảng chấm công tháng: {thang}</h2>
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

      <hr></hr>
      <table border={1} cellPadding={10}>
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
          {bangThongTinNv.map((e) => (
            <TheChamCong thongTinChamCong={e} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default BangChamCongNv;
