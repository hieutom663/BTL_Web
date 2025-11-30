import { Link, useNavigate } from "react-router-dom";
import logo from "./logo.jpg";
import "./Navbar.css";

const Navbar = () => {
  const loginStatus = localStorage.getItem("token");
  const navigate = useNavigate();
  return (
    <div
      style={{
        border: "0.5px solid black",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div className="logo">
        <img src={logo} alt="anh logo" style={{ width: 50, height: 50 }} />
        <h2>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            StaffM
          </Link>
        </h2>
      </div>
      <div
        style={{
          display: "flex",
          padding: 12,
          gap: 8,
          border: "1px solid black",
          width: 300,
          justifyContent: "space-between",
        }}
      >
        {loginStatus ? (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Đăng xuất
          </button>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            Đăng nhập
          </button>
        )}
        <div className="tb ">TB</div>
        <div className="ttcn">Giap Van Hieu</div>
      </div>
    </div>
  );
};

export default Navbar;
