import { Link } from "react-router-dom";
import logo from "./logo.jpg";
import "./Navbar.css";

const Navbar = () => {
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
          width: 200,
          justifyContent: "space-between",
        }}
      >
        <div className="tb ">TB</div>
        <div className="ttcn">Giap Van Hieu</div>
      </div>
    </div>
  );
};
export default Navbar;
