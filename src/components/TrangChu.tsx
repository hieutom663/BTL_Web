import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "./TrangChu.css";
import { maNv, NhanVien } from "./TaskData";
import axios from "axios";
import BangVang from "./BangVang";

const TrangChu = () => {
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
          </div>

          <BangVang danhSachNhanVien={danhSachNhanVien} />
        </div>
      </div>
    </div>
  );
};

export default TrangChu;
