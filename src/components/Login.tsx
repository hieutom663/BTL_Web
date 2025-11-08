import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="bg">
      <div className="loginContainer">
        <div className="loginHeader">
          <h1>Chào mừng trở lại</h1>
          <p>Đăng nhập vào tài khoản của bạn</p>
        </div>

        <form className="loginForm">
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
          <div className="optional">
            <div className="checkingBox">
              <input type="checkbox" id="remeber" />
              <span>Ghi nhớ đăng nhập </span>
            </div>
            <div>
              <Link to={"/reset"}>Quên mật khẩu</Link>
            </div>
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
        <div>
          Nếu bạn chưa có tài khoản thì hãy
          <Link to={"/register"}>Đăng kí</Link>
        </div>
      </div>
    </div>
  );
};
export default Login;
