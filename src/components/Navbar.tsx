import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          gap: 20,
          justifyContent: "space-between",
          padding: 8,
          backgroundColor: "blue    ",
        }}
      >
        <li style={{ color: "while" }}>
          <Link to={"/"}>Trang chu</Link>
        </li>
        <li>
          <Link to={"/login"}>DangNhap</Link>
        </li>
      </ul>
    </div>
  );
};
export default Navbar;
