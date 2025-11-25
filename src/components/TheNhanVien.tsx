import { NhanVien } from "./TaskData";

const ngayThang = (str: Date) => {
  const day = String(str.getDate()).padStart(2, "0");
  const month = String(str.getMonth() + 1).padStart(2, "0");
  const year = str.getFullYear();
  const ketQua = `${day}/${month}/${year}`;
  return ketQua;
};

const TheNhanVien = (props: {
  nhanVien: NhanVien;
  danhSachNhanVien: NhanVien[];
  stt: number;
}) => {
  const { nhanVien, stt } = props;

  return (
    <tr>
      <td style={{ padding: "8px 12px" }}>{stt}</td>
      <td style={{ padding: "8px 12px" }}>{nhanVien.id}</td>
      <td style={{ padding: "8px 12px" }}>{nhanVien.ten}</td>
      <td style={{ padding: "8px 12px" }}>{ngayThang(nhanVien.namSinh)}</td>
      <td style={{ padding: "8px 12px" }}>{nhanVien.gioiTinh}</td>
      <td style={{ padding: "8px 12px" }}>{ngayThang(nhanVien.ngayBatDau)}</td>
      <td style={{ padding: "8px 12px" }}>{nhanVien.tenViTri}</td>
      <td style={{ padding: "8px 12px" }}>{nhanVien.tenPhong}</td>
      <td style={{ padding: "8px 12px" }} align="center">
        <button>Xem chi tiết</button> | <button>Sửa</button> |{" "}
        <button>Xóa</button>
      </td>
    </tr>
  );
};
export default TheNhanVien;
