import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "./ThongTinCaNhan.css";

const ThongTinCaNhan = () => {
  const duLieuKhoiTao = {
    maNV: "NV001",
    hoTen: "Giáp Văn Hiếu",
    email: "vana@company.com",
    soDienThoai: "0901234567",
    phongBan: "Phòng kĩ thuật (PKT)",
    chucVu: "Lao công",
    ngaySinh: "1995-05-15",
    diaChi: "Số 10, Đường ABC, TP. Hà Nội",
  };

  const [thongTinCaNhan, setThongTinCaNhan] = useState(duLieuKhoiTao);
  const [dangChinhSua, setDangChinhSua] = useState(false);
  const [moFormDoiMatKhau, setMoFormDoiMatKhau] = useState(false);
  const [thongTinMatKhau, setThongTinMatKhau] = useState({
    hienTai: "",
    moi: "",
    xacNhan: "",
  });
  const [thongBao, setThongBao] = useState("");

  // --- Lưu thông tin cá nhân ---
  const luuThongTin = () => {
    setThongBao("Cập nhật thông tin thành công!");
    setDangChinhSua(false);
  };

  // --- Hủy chỉnh sửa ---
  const huyChinhSua = () => {
    setThongTinCaNhan(duLieuKhoiTao);
    setDangChinhSua(false);
    setThongBao("Đã hủy thay đổi");
  };

  // --- Đổi mật khẩu ---
  const luuMatKhau = () => {
    if (!thongTinMatKhau.hienTai || !thongTinMatKhau.moi || !thongTinMatKhau.xacNhan) {
      setThongBao("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    if (thongTinMatKhau.moi !== thongTinMatKhau.xacNhan) {
      setThongBao("Mật khẩu mới không khớp!");
      return;
    }
    if (thongTinMatKhau.moi.length < 6) {
      setThongBao("Mật khẩu mới phải ít nhất 6 ký tự!");
      return;
    }
    setThongBao("Đổi mật khẩu thành công!");
    setMoFormDoiMatKhau(false);
    setThongTinMatKhau({ hienTai: "", moi: "", xacNhan: "" });
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ padding: 20, flex: 1 }}>
          <h2>Thông tin cá nhân</h2>
          {thongBao && <div className="thongBao">{thongBao}</div>}

          {!moFormDoiMatKhau ? (
            <>
              <div className="luoiThongTin">
                <label>Mã nhân viên:</label>
                <input value={thongTinCaNhan.maNV} disabled />

                <label>Họ và tên:</label>
                <input
                  value={thongTinCaNhan.hoTen}
                  disabled={!dangChinhSua}
                  onChange={(e) =>
                    setThongTinCaNhan({ ...thongTinCaNhan, hoTen: e.target.value })
                  }
                />

                <label>Email:</label>
                <input
                  value={thongTinCaNhan.email}
                  disabled={!dangChinhSua}
                  onChange={(e) =>
                    setThongTinCaNhan({ ...thongTinCaNhan, email: e.target.value })
                  }
                />

                <label>Số điện thoại:</label>
                <input
                  value={thongTinCaNhan.soDienThoai}
                  disabled={!dangChinhSua}
                  onChange={(e) =>
                    setThongTinCaNhan({ ...thongTinCaNhan, soDienThoai: e.target.value })
                  }
                />

                <label>Phòng ban:</label>
                <input value={thongTinCaNhan.phongBan} disabled />

                <label>Chức vụ:</label>
                <input value={thongTinCaNhan.chucVu} disabled />

                <label>Ngày sinh:</label>
                <input
                  type="date"
                  value={thongTinCaNhan.ngaySinh}
                  disabled={!dangChinhSua}
                  onChange={(e) =>
                    setThongTinCaNhan({ ...thongTinCaNhan, ngaySinh: e.target.value })
                  }
                />
              </div>

              <div style={{ marginTop: 10 }}>
                {dangChinhSua ? (
                  <>
                    <button onClick={luuThongTin}>Lưu thay đổi</button>
                    <button onClick={huyChinhSua}>Hủy</button>
                  </>
                ) : (
                  <button onClick={() => setDangChinhSua(true)}>Chỉnh sửa</button>
                )}
                <button onClick={() => setMoFormDoiMatKhau(true)}>Đổi mật khẩu</button>
              </div>
            </>
          ) : (
            <>
              <div className="luoiThongTin">
                <label>Mật khẩu hiện tại:</label>
                <input
                  type="password"
                  value={thongTinMatKhau.hienTai}
                  onChange={(e) =>
                    setThongTinMatKhau({ ...thongTinMatKhau, hienTai: e.target.value })
                  }
                />

                <label>Mật khẩu mới:</label>
                <input
                  type="password"
                  value={thongTinMatKhau.moi}
                  onChange={(e) =>
                    setThongTinMatKhau({ ...thongTinMatKhau, moi: e.target.value })
                  }
                />

                <label>Xác nhận mật khẩu:</label>
                <input
                  type="password"
                  value={thongTinMatKhau.xacNhan}
                  onChange={(e) =>
                    setThongTinMatKhau({ ...thongTinMatKhau, xacNhan: e.target.value })
                  }
                />
              </div>

              <div style={{ marginTop: 10 }}>
                <button onClick={luuMatKhau}>Lưu mật khẩu</button>
                <button onClick={() => setMoFormDoiMatKhau(false)}>Hủy</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThongTinCaNhan;
