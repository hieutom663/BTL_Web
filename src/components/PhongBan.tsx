import axios from "axios";
import { useEffect, useState } from "react";
import { NhanVien } from "./TaskData";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const PhongBan = () => {
  const [danhSachNhanVien, setDanhSachNhanVien] = useState<NhanVien[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/danhsachnhanvien")
      .then((res) => setDanhSachNhanVien(res.data))
      .catch((err) => console.log("Lỗi", err));
  }, []);
  const currentUserId = localStorage.getItem("tenDangNhap");
  const [nhanVienTrongBan, setNhanVienTrongBan] = useState<NhanVien[]>([]);
  const [myInfo, setMyInfo] = useState<NhanVien | null>(null);

  useEffect(() => {
    const me = danhSachNhanVien.find((e) => e.maNhanVien === currentUserId);
    setMyInfo(me || null);

    if (me) {
      const list = danhSachNhanVien.filter((e) => e.maPhong === me.maPhong);
      setNhanVienTrongBan(list);
    }
  }, [danhSachNhanVien, currentUserId]);

  if (!myInfo)
    return (
      <div>
        <Navbar />
        <div style={{ display: "flex " }}>
          <Sidebar />
          Đang tải thông tin...
        </div>
      </div>
    );

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex " }}>
        <Sidebar />
        <div
          style={{
            padding: "20px",
            fontFamily: "sans-serif",
            border: "solid black 1px",
            borderRadius: 8,
            width: 960,
            margin: "0 auto",
            marginTop: 8,
            maxHeight: 480,
          }}
        >
          <h2 style={{ color: "#0056b3" }}>Phòng ban của bạn</h2>

          <div
            style={{
              marginBottom: "20px",
              background: "#f0f8ff",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <p>
              Xin chào: <strong>{myInfo.tenNhanVien}</strong>
            </p>
            <p>
              Bạn đang xem danh sách nhân sự phòng:{" "}
              <strong>{myInfo.tenPhong}</strong>
            </p>
          </div>

          <table
            border={1}
            cellPadding={10}
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#0056b3", color: "white" }}>
                <th>Mã NV</th>
                <th>Họ Tên</th>
                <th>Giới Tính</th>
                <th>Chức Vụ</th>
              </tr>
            </thead>
            <tbody>
              {nhanVienTrongBan.map((emp) => (
                <tr
                  key={emp.maNhanVien}
                  style={{
                    backgroundColor:
                      emp.maNhanVien === currentUserId ? "#fff3cd" : "white",
                  }}
                >
                  <td>{emp.maNhanVien}</td>
                  <td>
                    {emp.tenNhanVien}{" "}
                    {emp.maNhanVien === currentUserId && "(Bạn)"}
                  </td>
                  <td>{emp.gioiTinh}</td>
                  <td>{emp.chucVu}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <br />
          <Link to="/departments">Quay về</Link>
        </div>
      </div>
    </div>
  );
};

export default PhongBan;
