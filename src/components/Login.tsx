import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
//import axios from "axios";

interface ThongTin {
  username: string;
  password: string;
}

interface LoiDangNhap {
  username?: string;
  password?: string;
}

const Login = () => {
  const [thongTinNguoiDungNhap, setThongTinNguoiDungNhap] = useState<ThongTin>({
    username: "",
    password: "",
  });
  const [loi, setLoi] = useState<LoiDangNhap>({});
  const navigate = useNavigate();
  const xacMinh = () => {
    const temp: LoiDangNhap = {};
    if (!thongTinNguoiDungNhap.username) {
      temp.username = "Tên đăng nhập không được bỏ trống!";
    }
    if (!thongTinNguoiDungNhap.password) {
      temp.password = "Mật khẩu không được bỏ trống!";
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

            // Kiểm tra thông tin đầu vào
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
                // Nếu API trả về lỗi
                alert(data.message || "Đăng nhập thất bại");
                return;
              }

              localStorage.setItem("token", data.token);

              alert("Đăng nhập thành công");
              navigate("/");
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
              id="username"
              placeholder="Tên đăng nhập"
              onChange={(e) => {
                setThongTinNguoiDungNhap({
                  ...thongTinNguoiDungNhap,
                  username: e.target.value,
                });
              }}
            />
            <span className="messageError" id="usernameError">
              {loi ? loi.username : ""}
            </span>
          </div>
          <div className="formGroup">
            <input
              className="input"
              type="password"
              id="password"
              placeholder="Mật khẩu     "
              onChange={(e) => {
                setThongTinNguoiDungNhap({
                  ...thongTinNguoiDungNhap,
                  password: e.target.value,
                });
              }}
            />
            <span className="messageError" id="passwordError">
              {loi ? loi.password : ""}
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
