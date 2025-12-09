import { ChucVu, NhanVien, PhongBan, chucVuMap } from "./TaskData";

function FormQuanLyNhanVien(props: {
  duLieuForm: NhanVien;
  setDuLieuForm: any;
  dsPhongBan: PhongBan[];
  dsNhanVien: NhanVien[];
  dsChucVu: ChucVu[];
  cheDoHopThoai: string;
}) {
  const {
    duLieuForm,
    dsPhongBan,
    dsNhanVien,
    dsChucVu,
    cheDoHopThoai,
    setDuLieuForm,
  } = props;
  const maPhongMap = Object.fromEntries(
    dsPhongBan.map((e) => [e.tenPhong, e.maPhong])
  );

  return (
    <div className="employee-form">
      {cheDoHopThoai === "them" ? (
        <div className="nhanInput">
          <label>STT: </label>
          <input
            placeholder="Mã nhân viên"
            value={(dsNhanVien.length + 1).toString()}
            onSelect={(e) =>
              setDuLieuForm({
                ...duLieuForm,
                thuTuTheoNgayVaoLam: (e.target as HTMLInputElement).value,
              })
            }
          />
        </div>
      ) : (
        <></>
      )}
      <div className="nhanInput">
        <label>Mã nhân viên: </label>
        <input
          placeholder="Mã nhân viên"
          value={
            duLieuForm.maPhong +
            duLieuForm.maChucVu +
            String(duLieuForm.thuTuTheoNgayVaoLam).padStart(5, "0")
          }
          onSelect={(e) =>
            setDuLieuForm({
              ...duLieuForm,
              maNhanVien: (e.target as HTMLInputElement).value,
            })
          }
        />
      </div>

      <div className="nhanInput">
        <label>Họ và tên</label>
        <input
          placeholder="Họ tên"
          value={duLieuForm.tenNhanVien}
          onChange={(e) =>
            setDuLieuForm({
              ...duLieuForm,
              tenNhanVien: e.target.value,
            })
          }
          disabled={cheDoHopThoai === "xem"}
        />
      </div>
      <div className="nhanInput">
        <label>Email:</label>
        <input
          placeholder="Email"
          value={duLieuForm.emailNhanVien || ""}
          onChange={(e) =>
            setDuLieuForm({
              ...duLieuForm,
              emailNhanVien: e.target.value,
            })
          }
          disabled={cheDoHopThoai === "xem"}
        />
      </div>
      <div className="nhanInput">
        <label>Số điện thoại:</label>
        <input
          placeholder="Số điện thoại"
          value={duLieuForm.soLienLac || ""}
          onChange={(e) =>
            setDuLieuForm({
              ...duLieuForm,
              soLienLac: e.target.value,
            })
          }
          disabled={cheDoHopThoai === "xem"}
        />
      </div>
      <div className="nhanInput">
        <label>Phòng ban:</label>
        <select
          value={duLieuForm.tenPhong}
          onChange={(e) =>
            setDuLieuForm({
              ...duLieuForm,
              tenPhong: e.target.value,
              maPhong: maPhongMap[e.target.value],
            })
          }
          disabled={cheDoHopThoai === "xem"}
        >
          <option>Chọn phòng ban</option>
          {dsPhongBan.map((e) => (
            <option>{e.tenPhong}</option>
          ))}
        </select>
      </div>
      <div className="nhanInput">
        <label>Mã phòng ban:</label>
        <input
          type="text"
          value={duLieuForm.maPhong}
          readOnly
          disabled={cheDoHopThoai === "xem"}
        ></input>
      </div>
      <div className="nhanInput">
        <label>Chức vụ:</label>
        <select
          value={duLieuForm.chucVu}
          onChange={(e) => {
            const chucVu = e.target.value;
            setDuLieuForm({
              ...duLieuForm,
              chucVu: e.target.value,
              maChucVu: chucVuMap[chucVu],
            });
          }}
          disabled={cheDoHopThoai === "xem"}
        >
          <option>Chọn chức vụ</option>
          {dsChucVu.map((e) => (
            <option>{e.tenChucVu}</option>
          ))}
        </select>
      </div>
      <div className="nhanInput">
        <label>Mã chức vụ:</label>
        <input
          type="text"
          value={duLieuForm.maChucVu}
          readOnly
          disabled={cheDoHopThoai === "xem"}
        ></input>
      </div>
      <div className="nhanInput">
        <label>Lương cơ bản:</label>
        <input
          type="number"
          placeholder="Lương cơ bản"
          value={duLieuForm.luongCoBan}
          onChange={(e) =>
            setDuLieuForm({
              ...duLieuForm,
              luongCoBan: Number(e.target.value),
            })
          }
          disabled={cheDoHopThoai === "xem"}
        />
      </div>
      <div className="nhanInput">
        <label>Ngày sinh:</label>
        <input
          type="date"
          value={new Date(duLieuForm.ngaySinh).toISOString().split("T")[0]}
          onChange={(e) =>
            setDuLieuForm({
              ...duLieuForm,
              ngaySinh: new Date(e.target.value),
            })
          }
          disabled={cheDoHopThoai === "xem"}
        />
      </div>
      <div className="nhanInput">
        <label>Ngày bắt đầu làm:</label>
        <input
          type="date"
          value={
            new Date(duLieuForm.ngayBatDauLamViec).toISOString().split("T")[0]
          }
          onChange={(e) =>
            setDuLieuForm({
              ...duLieuForm,
              ngayBatDauLamViec: new Date(e.target.value),
            })
          }
          disabled={cheDoHopThoai === "xem"}
        />
      </div>

      <div className="nhanInput">
        <label>Giới tính:</label>
        <select
          value={duLieuForm.gioiTinh}
          onChange={(e) =>
            setDuLieuForm({
              ...duLieuForm,
              gioiTinh: e.target.value,
            })
          }
          style={{ width: 200 }}
          disabled={cheDoHopThoai === "xem"}
        >
          <option value="">Chọn giới tính</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>
      </div>
    </div>
  );
}

export default FormQuanLyNhanVien;
