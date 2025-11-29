import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import TheNhanVien from "./TheNhanVien";
import { danhSachPhongBan, NhanVien } from "./TaskData";

const Trangchu = (props: { danhSachNhanVien: NhanVien[] }) => {
  const { danhSachNhanVien } = props;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [phongBan, setPhongBan] = useState("Tất cả");
  const timKiemTheoTenHoacId = danhSachNhanVien.filter(
    (e) =>
      e.ten.toLowerCase().includes(search.toLowerCase()) ||
      e.id.toLowerCase().includes(search.toLowerCase())
  );
  let locThemPhongBan = timKiemTheoTenHoacId;
  if (phongBan !== "Tất cả") {
    locThemPhongBan = timKiemTheoTenHoacId.filter(
      (e) => e.tenPhong === phongBan
    );
  }

  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const currentData = locThemPhongBan.slice(
    startIndex,
    startIndex + itemsPerPage
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
                <option key={e.ten} value={e.ten}>
                  {e.ten}
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
                {currentData.map((item, index) => (
                  <TheNhanVien
                    nhanVien={item}
                    danhSachNhanVien={danhSachNhanVien}
                    stt={(page - 1) * itemsPerPage + index + 1}
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
              disabled={startIndex + itemsPerPage >= locThemPhongBan.length}
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
