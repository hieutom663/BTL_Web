import { PhongBan } from "./TaskData";
import { useNavigate } from "react-router-dom";

const QuanLyPhongBan = (props: {
  danhSachPhongBan: PhongBan[];
  setDanhSachPhongBan: any;
  setFlag: any;
  setFormSua: any;
  setFormData: any;
}) => {
  const {
    danhSachPhongBan,
    setDanhSachPhongBan,
    setFlag,
    setFormSua,
    setFormData,
  } = props;
  const navigate = useNavigate();
  return (
    <>
      <div style={{ padding: "20px", fontFamily: "sans-serif", width: "85vw" }}>
        <h2 style={{ color: "#0056b3", marginBottom: 8 }}>
          Quản lý Danh sách Phòng ban
        </h2>
        <h3>Số phòng ban: {danhSachPhongBan.length}</h3>
        <button
          style={{
            backgroundColor: "#0056b3",
            color: "white",
            border: "none",
            padding: "8px 16px",
            cursor: "pointer",
            textDecoration: "none",
            margin: "8px 8px 8px 0px",
          }}
          onClick={() => {
            setFlag(true);
          }}
        >
          Thêm phòng ban mới
        </button>
        <hr></hr>
        <table
          border={1}
          cellPadding={10}
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
            marginTop: 8,
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#0056b3",
                color: "white",
              }}
            >
              <th>Mã Phòng</th>
              <th>Tên Phòng Ban</th>
              <th>Năm Thành Lập</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {danhSachPhongBan.map((d) => (
              <tr key={d.maPhong}>
                <td>{d.maPhong}</td>
                <td>{d.tenPhong}</td>
                <td>{d.namThanhLap}</td>
                <td>{d.trangThai}</td>
                <td>
                  <button
                    onClick={() => {
                      navigate(`/departments/${d.maPhong}`);
                    }}
                    style={{
                      marginRight: "5px",
                      marginLeft: "5px",
                      cursor: "pointer",
                      backgroundColor: "#24d48bff",
                      border: "none",
                      padding: "5px 10px",
                    }}
                  >
                    Chi tiết
                  </button>
                  |{" "}
                  <button
                    style={{
                      marginRight: "5px",
                      cursor: "pointer",
                      backgroundColor: "#ffc107",
                      border: "none",
                      padding: "5px 10px",
                    }}
                    onClick={async () => {
                      setFormSua(true);
                      setFormData(d);
                      setFlag(true);
                    }}
                  >
                    Sửa
                  </button>
                  |{" "}
                  <button
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      textDecoration: "none",
                    }}
                    onClick={async () => {
                      if (
                        !window.confirm(`Bạn chắc chắn muốn xóa ${d.tenPhong}?`)
                      )
                        return;
                      try {
                        const response = await fetch(
                          `http://localhost:3000/api/xoaphongban/${d.maPhong}`,
                          { method: "DELETE" }
                        );
                        if (response.ok) {
                          alert("Xóa thành công");
                          setDanhSachPhongBan(
                            danhSachPhongBan.filter(
                              (p) => p.maPhong !== d.maPhong
                            )
                          );
                        }
                      } catch {
                        alert("Lỗi server!");
                      }
                    }}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
      </div>
      ;
    </>
  );
};
export default QuanLyPhongBan;
