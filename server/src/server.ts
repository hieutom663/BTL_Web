import dotenv from "dotenv";
import express from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import cors from "cors";
import pool from "./database";
//import { error } from "console";

const app = express();
const port = 3000;
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use(express.json());

const dinhDang = (dateStr: string) => {
  if (!dateStr) return null;
  return new Date(dateStr).toISOString().split("T")[0];
};

// login
app.post("/api/login", async (req, res) => {
  const { tenDangNhap, matKhau } = req.body;
  try {
    const [users] = await pool.query<any[]>(
      "SELECT * FROM taikhoan WHERE tenDangNhap = ?",
      [tenDangNhap]
    );
    const user = users[0];

    if (!user) {
      return res.json({ message: "Tài khoản không tồn tại" });
    }

    if (matKhau !== user.matKhau) {
      return res.json({ message: "Mật khẩu nhập vào không đúng" });
    }

    const token = jwt.sign(
      { tenDangNhap: user.tenDangNhap, role: user.role },
      process.env.JWT_SECRET || "1039789354860",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Đăng nhập thành công",
      token,
      tenDangNhap: user.tenDangNhap,
      role: user.vaiTro,
      ten: user.tenNhanVien,
    });
  } catch (error) {
    console.error(error);
    res.json({ message: "Lỗi server" });
  }
});

//them phong ban
app.post("/api/themphongban", async (req, res) => {
  const { maPhong, tenPhong, namThanhLap, trangThai } = req.body;
  if (!maPhong || !tenPhong) {
    return res.json({
      message: "Mã và tên phòng là bắt buộc không được để trống",
    });
  }
  await pool.execute(
    "INSERT INTO phongban (maPhong, tenPhong, namThanhLap, trangThai) VALUES (?, ?, ?, ?)",
    [maPhong, tenPhong, namThanhLap, trangThai]
  );
  return res.json({ message: "Thêm thành công", data: req.body });
});

//xoa phong ban
app.delete("/api/xoaphongban/:id", async (req, res) => {
  const { id } = req.params;
  await pool.execute("DELETE FROM phongban WHERE (maPhong = ?)", [id]);
  return res.json({ message: "Xóa thành công" });
});

//Sua phong ban
app.put("/api/suaphongban/:id", async (req, res) => {
  const { id } = req.params;
  const { maPhong, tenPhong, namThanhLap, trangThai } = req.body;
  try {
    await pool.execute(
      "UPDATE phongban SET maPhong=?, tenPhong=?, namThanhLap=?, trangThai=? WHERE maPhong=?",
      [maPhong, tenPhong, namThanhLap, trangThai, id]
    );

    return res.json({ message: "Sửa thành công" });
  } catch (error) {
    console.error(error);
    return res.json({ message: "Lỗi server" });
  }
});

// Them nhan vien
app.post("/api/themnhanvien", async (req, res) => {
  const conn = await pool.getConnection();
  try {
    const {
      maNhanVien,
      tenNhanVien,
      emailNhanVien,
      soLienLac,
      tenPhong,
      chucVu,
      gioiTinh,
      ngaySinh,
      ngayBatDauLamViec,
      luongCoBan,
      maPhong,
      maChucVu,
      thuTuTheoNgayVaoLam,
    } = req.body;

    await conn.beginTransaction();

    // thêm nhân viên
    await conn.execute(
      `INSERT INTO nhanvien (maNhanVien, tenNhanVien, gioiTinh, ngaySinh, soLienLac, ngayBatDauLamViec, trangThai, luongCoBan, maPhong, maChucVu, thuTuTheoNgayVaoLam, tenPhong, chucVu, emailNhanVien)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        maNhanVien,
        tenNhanVien,
        gioiTinh,
        dinhDang(ngaySinh),
        soLienLac,
        dinhDang(ngayBatDauLamViec),
        "Hiện",
        Number(luongCoBan),
        maPhong,
        maChucVu,
        thuTuTheoNgayVaoLam,
        tenPhong,
        chucVu,
        emailNhanVien,
      ]
    );

    // thêm tài khoản
    await conn.execute(
      `INSERT INTO taikhoan (maNhanVien, tenDangNhap, matKhau, maPhong, vaiTro)
       VALUES (?, ?, ?, ?, ?)`,
      [maNhanVien, maNhanVien, "123456", maPhong, "user"]
    );

    await conn.commit();
    res.json({
      message: "Thêm nhân viên + tài khoản thành công",
    });
  } catch (err) {
    await conn.rollback();
    console.log(err);
    res.json({ message: "Lỗi khi thêm nhân viên/tài khoản" });
  } finally {
    conn.release();
  }
});

// Sua nhan vien
app.put("/api/suanhanvien/:id", async (req, res) => {
  const { id } = req.params;
  const {
    maNhanVien,
    tenNhanVien,
    emailNhanVien,
    soLienLac,
    tenPhong,
    chucVu,
    gioiTinh,
    ngaySinh,
    ngayBatDauLamViec,
    luongCoBan,
    maPhong,
    maChucVu,
    thuTuTheoNgayVaoLam,
  } = req.body;
  try {
    const safe = (val: any) => (val === undefined ? null : val);

    await pool.execute(
      "UPDATE nhanvien SET maNhanVien = ?, tenNhanVien = ?, gioiTinh = ?, ngaySinh = ?,soLienLac = ?,ngayBatDauLamViec = ?,trangThai = ?,luongCoBan = ?,maPhong = ?,maChucVu = ?, thuTuTheoNgayVaoLam = ?, tenPhong = ?, chucVu = ?,emailNhanVien = ? WHERE maNhanVien = ?",
      [
        safe(maNhanVien),
        safe(tenNhanVien),
        safe(gioiTinh),
        safe(dinhDang(ngaySinh)),
        safe(soLienLac),
        safe(dinhDang(ngayBatDauLamViec)),
        "Hiện",
        safe(Number(luongCoBan)),
        safe(maPhong),
        safe(maChucVu),
        safe(thuTuTheoNgayVaoLam),
        safe(tenPhong),
        safe(chucVu),
        safe(emailNhanVien),
        id,
      ]
    );
    return res.json({ message: "Sửa thành công", data: req.body });
  } catch (err) {
    console.error("SQL Error:", err);
    return res.json({ message: "Lỗi SQL" });
  }
});

//xoa nhan vien
app.delete("/api/xoanhanvien/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.execute("DELETE FROM nhanvien WHERE maNhanVien = ?", [id]);
    res.json({ message: "Xóa nhân viên thành công" });
  } catch (error) {
    console.error(error);
    res.json({ message: "Lỗi server khi xóa nhân viên" });
  }
});

//them gioi cham cong den
app.post("/api/chamcongden", async (req, res) => {
  try {
    const { maNhanVien, tenNhanVien, ngayLam, gioVaoLam, gioTanLam } = req.body;
    console.log(req.body);
    await pool.execute(
      "INSERT INTO bangchamcong (maNhanVien, tenNhanVien, ngayLam, gioVaoLam, gioTanLam) VALUES (?,?,?,?,?)",
      [maNhanVien, tenNhanVien, dinhDang(ngayLam), gioVaoLam, gioTanLam]
    );
    res.json({ massege: "Xin cảm ơn!" });
  } catch (err) {
    console.log(err);
    res.json({ message: "Lỗi server" });
  }
});

//cham cong ve
app.put("/api/chamcongve", async (req, res) => {
  try {
    const { gioTanLam, ngayLam } = req.body;
    await pool.execute(
      "UPDATE bangchamcong SET gioTanLam = ? WHERE ngayLam = ?",
      [gioTanLam, dinhDang(ngayLam)]
    );
    res.json({ message: "Xin cảm ơn" });
  } catch (err) {
    console.log(err);
    res.json({ message: "Lỗi server" });
  }
});

//Doi mat khau
app.put("/api/doimatkhau/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { hienTai, moi, xacNhan } = req.body;
    await pool.execute("UPDATE taikhoan SET matKhau = ? WHERE maNhanVien = ?", [
      moi,
      id,
    ]);
    res.json({ massege: "Đổi mật khẩu thành công" });
  } catch (err) {
    console.log(err);
    res.json({ massage: "Lỗi" });
  }
});

// danh sach nhan vien
app.get("/danhsachnhanvien", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM nhanvien ORDER BY thuTuTheoNgayVaoLam ASC"
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.json({ message: "Lỗi server" });
  }
});

//bang cham cong
app.get("/bangchamcong", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM bangchamcong");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.json({ message: "Lỗi server" });
  }
});

// danh sach phong ban
app.get("/danhsachphongban", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM phongban");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.json({ message: "Lỗi server" });
  }
});

// danh sach chuc vu
app.get("/chucvu", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM chucvu");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.json({ message: "Lỗi server" });
  }
});

// tai khoan
app.get("/taikhoan", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM taikhoan");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.json({ message: "Lỗi server" });
  }
});

//Bang luong thang
app.get("/bangluongthang", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM bangluongthang");
    res.json(rows);
  } catch (error) {
    res.json({ message: "Lỗi server" });
  }
});

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
