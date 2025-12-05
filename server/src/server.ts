import dotenv from "dotenv";
import express from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import cors from "cors";
import pool from "./database";
import { error } from "console";

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

// login
app.post("/api/login", async (req, res) => {
  const { tenDangNhap, matKhau } = req.body;
  const response = await axios.get("http://localhost:3000/taikhoan");
  const users = response.data;
  const user = users.find((e: any) => e.tenDangNhap === tenDangNhap);
  const kiemTra = matKhau === user.matKhau;

  if (!user) {
    return res.status(400).json({ message: "Tài khoản không tồn tại" });
  }

  if (!kiemTra) {
    return res.status(400).json({ message: "Mật khẩu nhập vào không đúng" });
  }

  const token = jwt.sign(
    { tenDangNhap: user.tenDangNhap, role: user.role },
    process.env.JWT_SECRET || "1039789354860",
    {
      expiresIn: "1h",
    }
  );

  res.json({
    message: "Đăng nhập thành công",
    token,
    tenDangNhap: user.tenDangNhap,
    role: user.vaiTro,
  });
});

// danh sach nhan vien
app.get("/danhsachnhanvien", (req, res) => {
  pool.query(
    "SELECT * FROM nhanvien ORDER BY thuTuTheoNgayVaoLam ASC",
    (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Lỗi" });
      }
      res.json(result);
    }
  );
});

//bang cham cong
app.get("/bangchamcong", (req, res) => {
  pool.query("SELECT * FROM bangchamcong", (error, result) => {
    if (error) {
      return res.status(500).json({ message: "Lỗi" });
    }
    res.json(result);
  });
});

// danh sach phong ban
app.get("/danhsachphongban", (req, res) => {
  pool.query("SELECT * FROM phongban", (error, result) => {
    if (error) {
      return res.status(500).json({ message: "Lỗi" });
    }
    res.json(result);
  });
});

app.get("/taikhoan", (req, res) => {
  pool.query("SELECT * FROM taikhoan", (error, result) => {
    if (error) {
      return res.status(500).json({ message: "Lỗi" });
    }
    res.json(result);
  });
});
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});

//
