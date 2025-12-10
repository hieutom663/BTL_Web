import { NhanVien } from "./TaskData";

const BangVang = (props: { danhSachNhanVien: NhanVien[] }) => {
  const { danhSachNhanVien } = props;
  return (
    <div>
      <div>
        <div>
          <div className="trangchu-content">
            <div className="award">
              <div>
                <h3>Tuyên dương những cá nhân có thành tích tốt</h3>
                <table border={1} cellPadding={10}>
                  <thead>
                    <tr>
                      <th>Số thứ tự</th>
                      <th>Mã nhân viên</th>
                      <th>Tên nhân viên</th>
                    </tr>
                  </thead>
                  <tbody>
                    {danhSachNhanVien
                      .filter(
                        (e) =>
                          (e.maChucVu === "T" || e.maChucVu === "P") &&
                          e.maNhanVien !== "admin"
                      )
                      .map((e, i) => (
                        <tr>
                          <td align="center">{i + 1}</td>
                          <td>{e.maNhanVien}</td>
                          <td>{e.tenNhanVien}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div>
                <h3>Chào mừng các thành viên mới</h3>
                <table border={1} cellPadding={10}>
                  <thead>
                    <tr>
                      <th>Số thứ tự</th>
                      <th>Mã nhân viên</th>
                      <th>Tên nhân viên</th>
                    </tr>
                  </thead>
                  <tbody>
                    {danhSachNhanVien
                      .filter((e) => e.maChucVu === "I")
                      .map((e, i) => (
                        <tr>
                          <td align="center">{i + 1}</td>
                          <td>{e.maNhanVien}</td>
                          <td>{e.tenNhanVien}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BangVang;
