// DangNhap.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface TaiKhoan {
  tenDangNhap: string;
  matKhau: string;
  role: "admin" | "user";
}

const danhSachTaiKhoan: TaiKhoan[] = [
  { tenDangNhap: "admin", matKhau: "123", role: "admin" },
  { tenDangNhap: "user", matKhau: "123", role: "user" },
];

const DangNhap: React.FC = () => {
  const navigate = useNavigate();
  const [tenDangNhap, setTenDangNhap] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [loi, setLoi] = useState("");

  const handleLogin = () => {
    const tk = danhSachTaiKhoan.find(
      (t) => t.tenDangNhap === tenDangNhap && t.matKhau === matKhau
    );

    if (tk) {
      navigate("/payroll-salary", { state: { role: tk.role, tenDangNhap: tk.tenDangNhap } });
    } else {
      setLoi("Tên đăng nhập hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", padding: 20, border: "1px solid #ccc", borderRadius: 10 }}>
      <h2>Đăng nhập</h2>
      <div>
        <label>Tên đăng nhập:</label>
        <input
          type="text"
          value={tenDangNhap}
          onChange={(e) => setTenDangNhap(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />
      </div>
      <div>
        <label>Mật khẩu:</label>
        <input
          type="password"
          value={matKhau}
          onChange={(e) => setMatKhau(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />
      </div>
      {loi && <p style={{ color: "red" }}>{loi}</p>}
      <button onClick={handleLogin} style={{ padding: "8px 12px" }}>
        Đăng nhập
      </button>
    </div>
  );
};

export default DangNhap;
