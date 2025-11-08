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
          onSubmit={(e) => {
            e.preventDefault();
            if (xacMinh()) {
              alert("Đăng nhập thành công");
            }
            navigate("/");
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
          <div className="optional">
            <div className="checkingBox">
              <input type="checkbox" id="remeber" />
              <span>Ghi nhớ đăng nhập </span>
            </div>
            <div>
              <Link to={"/reset"}>Quên mật khẩu</Link>
            </div>
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

        <div>
          Nếu bạn chưa có tài khoản thì hãy
          <Link to={"/register"}>Đăng kí</Link>
        </div>
      </div>
    </div>
  );
};
export default Login;