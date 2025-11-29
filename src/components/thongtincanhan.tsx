import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface ThongTinNguoiDung {
  maNV: string;
  hoTen: string;
  email: string;
  soDienThoai: string;
  phongBan: string;
  viTri: string;
  ngaySinh: string;
  diaChi: string;
}

const duLieuKhoiTao: ThongTinNguoiDung = {
  maNV: "NV001",
  hoTen: "Giáp Văn Hiếu",
  email: "vana@company.com",
  soDienThoai: "0901234567",
  phongBan: "Phòng kĩ thuật (PKT)",
  viTri: "Lập trình viên",
  ngaySinh: "1995-05-15",
  diaChi: "Số 10, Đường ABC, TP. Hà Nội",
};

// -------- STYLES ----------
const kieuTrang = {
  trang: {
    padding: "20px",
    maxWidth: "900px",
    margin: "0 auto",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  tieuDe: {
    color: "#343a40",
    borderBottom: "2px solid #dee2e6",
    paddingBottom: "10px",
    marginBottom: "20px",
  },
  luoiThongTin: {
    display: "grid",
    gridTemplateColumns: "150px 1fr",
    gap: "15px 20px",
    marginBottom: "25px",
  },
  nhan: {
    fontWeight: 600,
    color: "#495057",
    alignSelf: "center",
  },
  oNhap: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #ced4da",
    borderRadius: "4px",
    boxSizing: "border-box" as "border-box",
    transition: "border-color 0.2s",
  },
  oNhapKhoa: {
    backgroundColor: "#e9ecef",
    color: "#6c757d",
    cursor: "not-allowed",
  },
  oVanBan: {
    resize: "vertical" as "vertical",
  },
  khuVucNut: {
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "1px solid #dee2e6",
    display: "flex",
    gap: "10px",
    justifyContent: "space-between",
  },
  nutChinh: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: 500,
    backgroundColor: "#007bff",
    color: "white",
    transition: "background-color 0.2s",
  },
  nutPhu: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: 500,
    backgroundColor: "#6c757d",
    color: "white",
    transition: "background-color 0.2s",
  },
  nutLink: {
    background: "none",
    color: "#007bff",
    textDecoration: "underline",
    marginLeft: "15px",
    padding: "10px 0",
    border: "none",
    cursor: "pointer",
  },
  thongBao: {
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "4px",
    border: "1px solid transparent",
  },
  thongBaoThanhCong: {
    color: "#155724",
    backgroundColor: "#d4edda",
    borderColor: "#c3e6cb",
  },
  thongBaoLoi: {
    color: "#721c24",
    backgroundColor: "#f8d7da",
    borderColor: "#f5c6cb",
  },
};

// ------------- Đổi Mật Khẩu -------------
interface DoiMatKhauProps {
  huyBo: () => void;
  thanhCong: (msg: string) => void;
  datThongBao: (msg: string, isError: boolean) => void;
}

const FormDoiMatKhau: React.FC<DoiMatKhauProps> = ({
  huyBo,
  thanhCong,
  datThongBao,
}) => {
  const [matKhau, setMatKhau] = useState({
    hienTai: "",
    moi: "",
    xacNhan: "",
  });
  const [dangXuLy, setDangXuLy] = useState(false);

  const thayDoi = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMatKhau((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const luuMatKhau = async () => {
    datThongBao("", false);

    const { hienTai, moi, xacNhan } = matKhau;

    if (!hienTai || !moi || !xacNhan) {
      datThongBao("Vui lòng điền đầy đủ thông tin", true);
      return;
    }

    if (moi !== xacNhan) {
      datThongBao("Mật khẩu mới không khớp", true);
      return;
    }

    if (moi.length < 6) {
      datThongBao("Mật khẩu phải có ít nhất 6 kí tự", true);
      return;
    }

    setDangXuLy(true);
    await new Promise((r) => setTimeout(r, 1500));

    setDangXuLy(false);
    thanhCong("Đổi mật khẩu thành công!");
  };

  return (
    <div>
      <h3 style={{ ...kieuTrang.tieuDe, fontSize: "1.5rem" }}>Đổi mật khẩu</h3>

      <div style={kieuTrang.luoiThongTin}>
        <label style={kieuTrang.nhan}>Mật khẩu hiện tại:</label>
        <input
          type="password"
          name="hienTai"
          value={matKhau.hienTai}
          onChange={thayDoi}
          disabled={dangXuLy}
          style={kieuTrang.oNhap}
        />

        <label style={kieuTrang.nhan}>Mật khẩu mới:</label>
        <input
          type="password"
          name="moi"
          value={matKhau.moi}
          onChange={thayDoi}
          disabled={dangXuLy}
          style={kieuTrang.oNhap}
        />

        <label style={kieuTrang.nhan}>Xác nhận mật khẩu:</label>
        <input
          type="password"
          name="xacNhan"
          value={matKhau.xacNhan}
          onChange={thayDoi}
          disabled={dangXuLy}
          style={kieuTrang.oNhap}
        />
      </div>

      <div style={kieuTrang.khuVucNut}>
        <button
          onClick={luuMatKhau}
          disabled={dangXuLy}
          style={kieuTrang.nutChinh}
        >
          {dangXuLy ? "Đang lưu..." : "Lưu mật khẩu"}
        </button>
        <button onClick={huyBo} disabled={dangXuLy} style={kieuTrang.nutPhu}>
          Hủy
        </button>
      </div>
    </div>
  );
};

// ------------- Thông Tin Cá Nhân -------------
const ThongTinCaNhan: React.FC = () => {
  const [thongTin, setThongTin] = useState<ThongTinNguoiDung>(duLieuKhoiTao);
  const [dangChinhSua, setDangChinhSua] = useState(false);
  const [banSaoGoc, setBanSaoGoc] = useState<ThongTinNguoiDung>(duLieuKhoiTao);
  const [dangXuLy, setDangXuLy] = useState(false);
  const [thongBao, setThongBao] = useState("");
  const [loi, setLoi] = useState(false);

  const [moFormMatKhau, setMoFormMatKhau] = useState(false);

  useEffect(() => {
    setThongTin(duLieuKhoiTao);
    setBanSaoGoc(duLieuKhoiTao);
  }, []);

  const datThongBao = (msg: string, isError: boolean) => {
    setThongBao(msg);
    setLoi(isError);
  };

  const thayDoi = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setThongTin((prev) => ({ ...prev, [name]: value }));
  };

  const batDauChinhSua = () => {
    setDangChinhSua(true);
    setThongBao("");
    setLoi(false);
  };

  const huyChinhSua = () => {
    setThongTin(banSaoGoc);
    setDangChinhSua(false);
    datThongBao("Đã hủy thay đổi", true);
  };

  const luuThongTin = async () => {
    setDangXuLy(true);
    setThongBao("");
    setLoi(false);

    await new Promise((r) => setTimeout(r, 1500));

    setBanSaoGoc(thongTin);
    setDangChinhSua(false);
    setDangXuLy(false);
    datThongBao("Cập nhật thông tin thành công!", false);
  };

  const doiMatKhauThanhCong = (msg: string) => {
    setMoFormMatKhau(false);
    datThongBao(msg, false);
  };

  // --- Nếu đang mở form đổi mật khẩu ---
  if (moFormMatKhau) {
    return (
      <div style={kieuTrang.trang}>
        <h2 style={kieuTrang.tieuDe}>Thông tin cá nhân</h2>

        {thongBao && (
          <div
            style={{
              ...kieuTrang.thongBao,
              ...(loi ? kieuTrang.thongBaoLoi : kieuTrang.thongBaoThanhCong),
            }}
          >
            {thongBao}
          </div>
        )}

        <FormDoiMatKhau
          huyBo={() => setMoFormMatKhau(false)}
          thanhCong={doiMatKhauThanhCong}
          datThongBao={datThongBao}
        />
      </div>
    );
  }

  return (
    <div style={kieuTrang.trang}>
      <h2 style={kieuTrang.tieuDe}>👤 Thông tin cá nhân</h2>

      {thongBao && (
        <div
          style={{
            ...kieuTrang.thongBao,
            ...(loi ? kieuTrang.thongBaoLoi : kieuTrang.thongBaoThanhCong),
          }}
        >
          {thongBao}
        </div>
      )}

      <div style={kieuTrang.luoiThongTin}>
        <label style={kieuTrang.nhan}>Mã nhân viên:</label>
        <input
          type="text"
          name="maNV"
          value={thongTin.maNV}
          disabled
          style={{ ...kieuTrang.oNhap, ...kieuTrang.oNhapKhoa }}
        />

        <label style={kieuTrang.nhan}>Họ và tên:</label>
        <input
          type="text"
          name="hoTen"
          value={thongTin.hoTen}
          onChange={thayDoi}
          disabled={!dangChinhSua}
          style={
            !dangChinhSua
              ? { ...kieuTrang.oNhap, ...kieuTrang.oNhapKhoa }
              : kieuTrang.oNhap
          }
        />

        <label style={kieuTrang.nhan}>Email:</label>
        <input
          type="email"
          name="email"
          value={thongTin.email}
          onChange={thayDoi}
          disabled={!dangChinhSua}
          style={
            !dangChinhSua
              ? { ...kieuTrang.oNhap, ...kieuTrang.oNhapKhoa }
              : kieuTrang.oNhap
          }
        />

        <label style={kieuTrang.nhan}>Số điện thoại:</label>
        <input
          type="tel"
          name="soDienThoai"
          value={thongTin.soDienThoai}
          onChange={thayDoi}
          disabled={!dangChinhSua}
          style={
            !dangChinhSua
              ? { ...kieuTrang.oNhap, ...kieuTrang.oNhapKhoa }
              : kieuTrang.oNhap
          }
        />

        <label style={kieuTrang.nhan}>Phòng ban:</label>
        <input
          type="text"
          name="phongBan"
          value={thongTin.phongBan}
          disabled
          style={{ ...kieuTrang.oNhap, ...kieuTrang.oNhapKhoa }}
        />

        <label style={kieuTrang.nhan}>Vi tri:</label>
        <input
          type="text"
          name="viTri"
          value={thongTin.viTri}
          disabled
          style={{ ...kieuTrang.oNhap, ...kieuTrang.oNhapKhoa }}
        />

        <label style={kieuTrang.nhan}>Ngày sinh:</label>
        <input
          type="date"
          name="ngaySinh"
          value={thongTin.ngaySinh}
          onChange={thayDoi}
          disabled={!dangChinhSua}
          style={
            !dangChinhSua
              ? { ...kieuTrang.oNhap, ...kieuTrang.oNhapKhoa }
              : kieuTrang.oNhap
          }
        />

        <label style={kieuTrang.nhan}>Địa chỉ:</label>
        <textarea
          name="diaChi"
          value={thongTin.diaChi}
          onChange={thayDoi}
          disabled={!dangChinhSua}
          rows={3}
          style={
            !dangChinhSua
              ? { ...kieuTrang.oNhap, ...kieuTrang.oNhapKhoa }
              : kieuTrang.oNhap
          }
        ></textarea>
      </div>

      <div style={kieuTrang.khuVucNut}>
        <Link to="/" style={{ marginTop: 8 }}>
          Trang chủ
        </Link>
        <div>
          {dangChinhSua ? (
            <>
              <button
                onClick={luuThongTin}
                disabled={dangXuLy}
                style={kieuTrang.nutChinh}
              >
                {dangXuLy ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
              <button
                onClick={huyChinhSua}
                disabled={dangXuLy}
                style={kieuTrang.nutPhu}
              >
                Hủy
              </button>
            </>
          ) : (
            <button onClick={batDauChinhSua} style={kieuTrang.nutChinh}>
              Chỉnh sửa
            </button>
          )}

          <button
            onClick={() => setMoFormMatKhau(true)}
            style={kieuTrang.nutLink}
          >
            Đổi mật khẩu
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThongTinCaNhan;
