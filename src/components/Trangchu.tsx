import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import TheNhanVien from "./TheNhanVien";
import { NhanVien } from "./TaskData";

const Trangchu = (props: { danhSachNhanVien: NhanVien[] }) => {
  const { danhSachNhanVien } = props;
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex " }}>
        <Sidebar />
        {danhSachNhanVien.map((item) => (
          <TheNhanVien nhanVien={item} danhSachNhanVien={danhSachNhanVien} />
        ))}
      </div>
    </div>
  );
};
export default Trangchu;
