import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const role = localStorage.getItem("role");
  const [activePath, setActivePath] = useState(window.location.pathname);
  const handleLinkClick = (path: string) => {
    setActivePath(path);
  };

  return (
    <div className="sidebar-container">
      <ul className="sidebar-menu">
        <h3 className="menu-group-title">Dashboard</h3>

        <li className="menu-item">
          <Link
            to={"/"}
            className={`menu-link ${activePath === "/" ? "active-link" : ""}`}
            onClick={() => handleLinkClick("/")}
          >
            Trang chủ
          </Link>
        </li>

        {}
        {role === "admin" && (
          <li className="menu-item">
            <Link
              to={"/departments"}
              className={`menu-link ${
                activePath === "/departments" ? "active-link" : ""
              }`}
              onClick={() => handleLinkClick("/departments")}
            >
              Các phòng, ban
            </Link>
          </li>
        )}

        {}
        <li className="menu-item">
          <Link
            to={"/employeelist"}
            className={`menu-link ${
              activePath === "/employeelist" ? "active-link" : ""
            }`}
            onClick={() => handleLinkClick("/employeelist")}
          >
            Danh sách nhân viên
          </Link>
        </li>

        <li className="menu-item">
          <Link
            to={"/department"}
            className={`menu-link ${
              activePath === "/department" ? "active-link" : ""
            }`}
            onClick={() => handleLinkClick("/department")}
          >
            Phòng ban của tôi
          </Link>
        </li>

        <li className="menu-item">
          <Link
            to={"/timesheet/"}
            className={`menu-link ${
              activePath === "/timesheet/" ? "active-link" : ""
            }`}
            onClick={() => handleLinkClick("/timesheet/")}
          >
            Bảng chấm công
          </Link>
        </li>
        <li className="menu-item">
          <Link
            to={"/salarysheet/"}
            className={`menu-link ${
              activePath === "/salarysheet/" ? "active-link" : ""
            }`}
            onClick={() => handleLinkClick("/salarysheet/")}
          >
            Bảng lương
          </Link>
        </li>
      </ul>

      {}
    </div>
  );
};
export default Sidebar;
