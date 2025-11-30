import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import TheNhanVien from "./TheNhanVien";
import { PhongBan, NhanVien } from "./TaskData";

const Trangchu = (props: {
  danhSachNhanVien: NhanVien[];
  danhSachPhongBan: PhongBan[];
}) => {
  const { danhSachNhanVien, danhSachPhongBan } = props;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [phongBan, setPhongBan] = useState("Tất cả");
  const timKiemTheoTenHoacId = danhSachNhanVien.filter(
    (e) =>
      e.tenNhanVien.toLowerCase().includes(search.toLowerCase()) ||
      e.maNhanVien.toLowerCase().includes(search.toLowerCase())
  );
  let locThemPhongBan = timKiemTheoTenHoacId;
  if (phongBan !== "Tất cả") {
    locThemPhongBan = timKiemTheoTenHoacId.filter(
      (e) => e.tenPhong === phongBan
    );
  }

  const duLieuTrongMotTrang = 10;
  const viTriBatDau = (page - 1) * duLieuTrongMotTrang;
  const duLieuTamThoi = locThemPhongBan.slice(
    viTriBatDau,
    viTriBatDau + duLieuTrongMotTrang
  );

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex ", gap: 8 }}>
        <Sidebar />

        <div style={{}}>
          <h2>Danh sách nhân viên:</h2>
          <div>
            <h3>Tổng số nhân viên: {danhSachNhanVien.length}</h3>{" "}
            <button>Thêm nhân viên</button>
          </div>
          <div>
            <input
              placeholder="Tìm kiếm nhân viên"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              onChange={(e) => {
                setPhongBan(e.target.value);
              }}
            >
              <option key={"Tất cả"} value={"Tất cả"}>
                Tất cả
              </option>
              {danhSachPhongBan.map((e) => (
                <option key={e.tenPhong} value={e.tenPhong}>
                  {e.tenPhong}
                </option>
              ))}
            </select>
          </div>
          <div
            style={{ height: 558, width: "85vw", border: "black solid 1px" }}
          >
            <table
              border={1}
              cellPadding={10}
              style={{
                width: "100%",
                height: "50%",
                borderCollapse: "collapse",
                marginTop: 8,
              }}
            >
              <thead>
                <tr>
                  <th style={{ padding: "8px 12px" }}>STT</th>
                  <th style={{ padding: "8px 12px" }}>Mã nhân viên</th>
                  <th style={{ padding: "8px 12px" }}>Họ và tên </th>
                  <th style={{ padding: "8px 12px" }}>Ngày sinh </th>
                  <th style={{ padding: "8px 12px" }}>Giới tính </th>
                  <th style={{ padding: "8px 12px" }}>Ngày bắt đầu làm </th>
                  <th style={{ padding: "8px 12px" }}>Vị trí làm việc </th>
                  <th style={{ padding: "8px 12px" }}>Thuộc phòng/ban </th>
                  <th style={{ padding: "8px 12px" }}>Lương cơ bản </th>
                  <th style={{ backgroundColor: "green", padding: "8px 12px" }}>
                    Quản lý{" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                {duLieuTamThoi.map((item, index) => (
                  <TheNhanVien
                    nhanVien={item}
                    danhSachNhanVien={danhSachNhanVien}
                    stt={(page - 1) * duLieuTrongMotTrang + index + 1}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              padding: 8,
            }}
          >
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
              Prev
            </button>
            <div>Trang hiện tại: {page}</div>
            <button
              onClick={() => setPage(page + 1)}
              disabled={
                viTriBatDau + duLieuTrongMotTrang >= locThemPhongBan.length
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Trangchu;
