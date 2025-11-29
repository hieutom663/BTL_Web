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
  const sinhId = () => {
    const id1 = nhanVien.maPhong.substring(0, 4);
    const id2 = nhanVien.maViTri.substring(0, 4);
    return id1 + id2 + String(stt).padStart(4, "0");
  };
  return (
    <tr>
      <td style={{ padding: "8px 12px" }}>{stt}</td>
      <td style={{ padding: "8px 12px" }}>{sinhId()}</td>
      <td style={{ padding: "8px 12px" }}>{nhanVien.ten}</td>
      <td style={{ padding: "8px 12px" }}>{ngayThang(nhanVien.namSinh)}</td>
      <td style={{ padding: "8px 12px" }}>{nhanVien.gioiTinh}</td>
      <td style={{ padding: "8px 12px" }}>{ngayThang(nhanVien.ngayBatDau)}</td>
      <td style={{ padding: "8px 12px" }}>{nhanVien.tenViTri}</td>
      <td style={{ padding: "8px 12px" }}>{nhanVien.tenPhong}</td>
      <td style={{ padding: "8px 12px" }}>{nhanVien.luongCoBan} VND</td>
      <td style={{ padding: "8px 12px" }} align="center">
        <button style={{ color: "black" }}>Xem chi tiết</button> |{" "}
        <button style={{ backgroundColor: "yellow", color: "black" }}>
          Sửa
        </button>{" "}
        |{" "}
        <button style={{ backgroundColor: "red", color: "black" }}>Xóa</button>
      </td>
    </tr>
  );
};
export default TheNhanVien;
