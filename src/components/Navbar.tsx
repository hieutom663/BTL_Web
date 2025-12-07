import { Link, useNavigate } from "react-router-dom";
import logo from "./logo.jpg";
import { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(
    !!localStorage.getItem("token")
  );
  const [username, setUsername] = useState(
    localStorage.getItem("tenDangNhap") || ""
  );
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tenDangNhap");
    localStorage.removeItem("role");
    setLoginStatus(false);
    setUsername("");
    setShowDropdown(false);
    navigate("/login");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLoginStatus(!!localStorage.getItem("token"));
      setUsername(localStorage.getItem("tenDangNhap") || "");
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <h2>
          <Link to="/">StaffM</Link>
        </h2>
      </div>

      <div className="profile-container">
        {loginStatus ? (
          <div className="profile-dropdown">
            <button
              className="profile-button"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {username || "User"}
            </button>

            <div className={`dropdown-menu ${showDropdown ? "show" : ""}`}>
              <button
                className="dropdown-item"
                onClick={() => {
                  navigate("/profile");
                  setShowDropdown(false);
                }}
              >
                Thông tin cá nhân
              </button>
              <button className="dropdown-item" onClick={handleLogout}>
                Đăng xuất
              </button>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate("/login")}>Đăng nhập</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
