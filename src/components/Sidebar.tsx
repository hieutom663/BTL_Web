import { Link } from "react-router-dom";
import "./Sidebar.css";

const Navbar = () => {
  return (
    <div>
      <div style={{ border: "solid black 1px", height: "960px" }}>
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            width: 200,
            listStyle: "none",
            gap: 20,
            justifyContent: "space-between",
            padding: 8,
            backgroundColor: "#00DEFF",
          }}
        >
          <li>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              Trang chu
            </Link>
          </li>
          <li>
            <Link to={"/login"} style={{ textDecoration: "none" }}>
              DangNhap
            </Link>
          </li>
          <li>
            <Link to={"/department"} style={{ textDecoration: "none" }}>
              Phòng, ban của bạn
            </Link>
          </li>
          <li>
            <Link to={"/departments"} style={{ textDecoration: "none" }}>
              Các phòng, ban
            </Link>
          </li>
          <li>
            <Link to={"/employees"} style={{ textDecoration: "none" }}>
              Danh sách nhân viên
            </Link>
          </li>
          <li>
            <Link to={"/positions"} style={{ textDecoration: "none" }}>
              Danh sách chức vụ
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
