import { ThongTinChamCongThang } from "./TaskData";

const ngayThang = (str: Date) => {
  const time = new Date(str).toLocaleDateString();
  let [month, day, year] = time.split("/");
  const ketQua = `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
  return ketQua;
};

const TheChamCong = (props: { thongTinChamCong: ThongTinChamCongThang }) => {
  const { thongTinChamCong } = props;
  //   const sinhId = () => {
  //     const id1 = nhanVien.maPhong.substring(0, 4);
  //     const id2 = nhanVien.maChucVu.substring(0, 4);
  //     return id1 + id2 + String(stt).padStart(4, "0");
  //   };
  return (
    <tr>
      {/* <td style={{ padding: "8px 12px" }}>{stt}</td> */}
      <td style={{ padding: "8px 12px" }}>{thongTinChamCong.maNhanVien}</td>
      <td style={{ padding: "8px 12px" }}>{thongTinChamCong.tenNhanVien}</td>
      <td style={{ padding: "8px 12px" }}>
        {ngayThang(thongTinChamCong.ngayLam)}
      </td>
      <td style={{ padding: "8px 12px" }}>{thongTinChamCong.gioVaoLam}</td>
      <td style={{ padding: "8px 12px" }}>{thongTinChamCong.gioTanLam}</td>
      <td style={{ padding: "8px 12px" }}>{thongTinChamCong.tongGioLam}</td>
      {/* <td align="center" style={{ padding: "8px 12px" }}>
        <button>Xem chi tiết</button>
      </td> */}
    </tr>
  );
};
export default TheChamCong;
