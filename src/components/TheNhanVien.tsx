import { ngayThang, NhanVien } from "./TaskData";

function TheNhanVien(props: {
  dsNhanVien: NhanVien[];
  setDsNhanVien: any;
  nhanVienHienThi: NhanVien[];

  xuLySua: any;
  xuLyXem: any;
}) {
  const {
    dsNhanVien,
    setDsNhanVien,
    nhanVienHienThi,

    xuLySua,
    xuLyXem,
  } = props;
  const xuLyXoa = async (nv: NhanVien) => {
    if (!window.confirm(`Bạn có chắc muốn xóa nhân viên ${nv.tenNhanVien}?`)) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/api/xoanhanvien/${nv.maNhanVien}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        alert("Xóa thành công");
        setDsNhanVien(dsNhanVien.filter((d) => d.maNhanVien !== nv.maNhanVien));
      }
    } catch {
      alert("Lỗi server");
    }
  };
  return (
    <table className="employee-table" border={1} cellPadding={10}>
      <thead>
        <tr>
          {/* <th>STT</th> */}
          <th>Mã NV</th>
          <th>Họ Tên</th>
          <th>Phòng ban</th>
          <th>Chức vụ</th>
          <th>Lương cơ bản</th>
          <th>Ngày bắt đầu</th>
          <th>Giới tính</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {nhanVienHienThi.map((nv, index) => (
          <tr key={nv.maNhanVien}>
            <td>{nv.maNhanVien}</td>
            <td>{nv.tenNhanVien}</td>
            <td>{nv.tenPhong}</td>
            <td>{nv.chucVu}</td>
            <td>{nv.luongCoBan.toLocaleString()}₫</td>
            <td>{ngayThang(nv.ngayBatDauLamViec)}</td>
            <td>{nv.gioiTinh}</td>
            <td>
              <button onClick={() => xuLySua(nv)}>Sửa</button> |{" "}
              <button onClick={() => xuLyXoa(nv)}>Xóa</button> |{" "}
              <button onClick={() => xuLyXem(nv)}>Chi tiết</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default TheNhanVien;
