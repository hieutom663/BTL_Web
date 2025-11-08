import "./Login.css";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="bg">
      <div className="loginContainer">
        <div className="loginHeader">
          <h1>Chào mừng</h1>
          <p>Đăng ký tài khoản mới nào</p>
        </div>

        <form className="loginForm">
          <div className="formGroup">
            <input
              className="input"
              type="text"
              id="name"
              placeholder="Tên hiển thị"
            />
            <span className="massageError" id="nameError"></span>
          </div>
          <div className="formGroup">
            <input
              className="input"
              type="text"
              id="email"
              placeholder="Email"
            />
            <span className="massageError" id="emailError"></span>
          </div>
          <div className="formGroup">
            <input
              className="input"
              type="text"
              id="username"
              placeholder="Tên đăng nhập"
            />
            <span className="massageError" id="usernameError"></span>
          </div>
          <div className="formGroup">
            <input
              className="input"
              type="password"
              id="password"
              placeholder="Mật khẩu     "
            />
            <span className="massageError" id="passwordError"></span>
          </div>
          <div className="formGroup">
            <input
              className="input"
              type="password"
              id="confirmPassword"
              placeholder="Nhập lại mật khẩu     "
            />
            <span className="massageError" id="confirmPasswordError"></span>
          </div>
        </form>
        <div
          style={{
            padding: 20,
          }}
        >
          <button type="submit" className="submitButton" onClick={() => {}}>
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};
export default Register;
