import { Link, useNavigate } from "react-router-dom";
import logo from "./logo.jpg";
import { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const dieuHuong = useNavigate();
  const [dangNhap, setDangNhap] = useState(!!localStorage.getItem("token"));
  const [tenNguoiDung, setTenNguoiDung] = useState(
    localStorage.getItem("tenDangNhap") || ""
  );
  const [hienMenuXuong, setHienMenuXuong] = useState(false);

  const xuLyDangXuat = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tenDangNhap");
    localStorage.removeItem("role");
    setDangNhap(false);
    setTenNguoiDung("");
    setHienMenuXuong(false);
    dieuHuong("/login");
  };

  useEffect(() => {
    const capNhatTrangThai = setInterval(() => {
      setDangNhap(!!localStorage.getItem("token"));
      setTenNguoiDung(localStorage.getItem("tenDangNhap") || "");
    }, 200);
    return () => clearInterval(capNhatTrangThai);
  }, []);

  return (
    <div className="thanh-dieu-huong">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <h2>
          <Link to="/">StaffM</Link>
        </h2>
      </div>

      <div className="khung-ho-so">
        {dangNhap ? (
          <div className="menu-ho-so">
            <button
              className="nut-ho-so"
              onClick={() => setHienMenuXuong(!hienMenuXuong)}
            >
              {tenNguoiDung || "Người dùng"}
            </button>

            <div className={`menu-xuong ${hienMenuXuong ? "hien" : ""}`}>
              <button
                className="item-menu"
                onClick={() => {
                  dieuHuong("/profile");
                  setHienMenuXuong(false);
                }}
              >
                Thông tin cá nhân
              </button>
              <button className="item-menu" onClick={xuLyDangXuat}>
                Đăng xuất
              </button>
            </div>
          </div>
        ) : (
          <button onClick={() => dieuHuong("/login")}>Đăng nhập</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
