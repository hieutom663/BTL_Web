import { NhanVien } from "./TaskData";
import { useNavigate } from "react-router-dom";

const TheNhanVien = (props: {
  nhanVien: NhanVien;
  danhSachNhanVien: NhanVien[];
}) => {
  const { nhanVien, danhSachNhanVien } = props;
  const navigate = useNavigate();

  return (
    <div>
      <h3>Họ và tên: {nhanVien.ten}</h3>
      <div>Ngày sinh: {nhanVien.namSinh.toDateString()}</div>
      <div>Giới tính: {nhanVien.gioiTinh}</div>
      <div>Ngày bắt đầu làm: {nhanVien.ngayBatDau.toDateString()}</div>
      <div>Vị trí làm việc: {nhanVien.tenViTri}</div>
      <div>Thuộc phòng/ban: {nhanVien.tenPhong}</div>
      <div>Lương cơ bản: {nhanVien.luongCoBan}</div>
    </div>
  );
};
export default TheNhanVien;
