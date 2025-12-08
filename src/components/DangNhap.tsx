import "./DangNhap.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
//import axios from "axios";

interface ThongTin {
  tenDangNhap: string;
  matKhau: string;
}

interface LoiDangNhap {
  tenDangNhap?: string;
  matKhau?: string;
}

const Login = () => {
  const [thongTinNguoiDungNhap, setThongTinNguoiDungNhap] = useState<ThongTin>({
    tenDangNhap: "",
    matKhau: "",
  });
  const [loi, setLoi] = useState<LoiDangNhap>({});
  const navigate = useNavigate();
  const xacMinh = () => {
    const temp: LoiDangNhap = {};

    if (!thongTinNguoiDungNhap.tenDangNhap) {
      temp.tenDangNhap = "Tên đăng nhập không được bỏ trống!";
    }
    if (!thongTinNguoiDungNhap.matKhau) {
      temp.matKhau = "Mật khẩu không được bỏ trống!";
    }

    setLoi(temp);

    return Object.keys(temp).length === 0;
  };
  return (
    <div className="bg">
      <div className="loginContainer">
        <div className="loginHeader">
          <h1>Chào mừng trở lại</h1>
          <p>Đăng nhập vào tài khoản của bạn</p>
        </div>

        <form
          className="loginForm"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!xacMinh()) return;

            try {
              const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(thongTinNguoiDungNhap),
              });

              const data = await response.json();

              if (!response.ok) {
                alert(data.message || "Đăng nhập thất bại");
                return;
              }

              localStorage.setItem("tenDangNhap", data.tenDangNhap);
              localStorage.setItem("role", data.role);
              localStorage.setItem("token", data.token);
              alert("Đăng nhập thành công");
              navigate("/");
              window.location.reload();
            } catch (error) {
              console.error("Lỗi kết nối API:", error);
              alert("Lỗi server, vui lòng thử lại");
            }
          }}
        >
          <div className="formGroup">
            <input
              className="input"
              type="text"
              id="tenDangNhap"
              placeholder="Tên đăng nhập"
              onChange={(e) => {
                setThongTinNguoiDungNhap({
                  ...thongTinNguoiDungNhap,
                  tenDangNhap: e.target.value,
                });
              }}
            />
            <span className="messageError" id="tenDangNhapError">
              {loi ? loi.tenDangNhap : ""}
            </span>
          </div>
          <div className="formGroup">
            <input
              className="input"
              type="password"
              id="matKhau"
              placeholder="Mật khẩu     "
              onChange={(e) => {
                setThongTinNguoiDungNhap({
                  ...thongTinNguoiDungNhap,
                  matKhau: e.target.value,
                });
              }}
            />
            <span className="messageError" id="matKhauError">
              {loi ? loi.matKhau : ""}
            </span>
          </div>
          <div
            style={{
              padding: 20,
            }}
          >
            <button type="submit" className="submitButton" onClick={() => {}}>
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
