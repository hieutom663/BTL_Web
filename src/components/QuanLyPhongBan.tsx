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
      <div className="qlpb-container">
        <div className="container">
          <h2 className="qlpb-title">Quản lý Danh sách Phòng ban</h2>

          <h3>Số phòng ban: {danhSachPhongBan.length}</h3>

          <button className="btn-add" onClick={() => setFlag(true)}>
            Thêm phòng ban mới
          </button>

          <table border={1} cellPadding={10} className="qlpb-table">
            <thead>
              <tr className="qlpb-thead">
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
                      className="btn-detail"
                      onClick={() => navigate(`/departments/${d.maPhong}`)}
                    >
                      Chi tiết
                    </button>
                    |
                    <button
                      className="btn-edit"
                      onClick={() => {
                        setFormSua(true);
                        setFormData(d);
                        setFlag(true);
                      }}
                    >
                      Sửa
                    </button>
                    |
                    <button
                      className="btn-delete"
                      onClick={async () => {
                        if (
                          !window.confirm(
                            `Bạn chắc chắn muốn xóa ${d.tenPhong}?`
                          )
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
        </div>

        <br />
      </div>
    </>
  );
};

export default QuanLyPhongBan;
