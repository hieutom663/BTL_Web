import { Link } from "react-router-dom";

import "./Sidebar.css";

const Sidebar = () => {
  const loginStatus = localStorage.getItem("token");

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
              Trang chủ
            </Link>
          </li>
          {!loginStatus ? (
            <li>
              <Link to={"/login"} style={{ textDecoration: "none" }}>
                Đăng nhập
              </Link>
            </li>
          ) : (
            <Link to={"/profile"} style={{ textDecoration: "none" }}>
              Trang cá nhân
            </Link>
          )}
          <li>
            <Link to={"/departments"} style={{ textDecoration: "none" }}>
              Các phòng, ban
            </Link>
          </li>
          <li>
            <Link to={"/positions"} style={{ textDecoration: "none" }}>
              Danh sách chức vụ
            </Link>
          </li>
          <li>
            <Link to={"/timesheet/:id"} style={{ textDecoration: "none" }}>
              Bảng chấm công
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;
