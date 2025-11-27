export interface NhanVien {
  employee_ID: string;
  full_name: string;
  department_code: string;
  position_code: string;
  base_salary: number;
  status: "shown" | "hidden";
  start_date: string;
}

export const danhSachNhanVien: NhanVien[] = [
  {
    employee_ID: "E001",
    full_name: "Tran Nam Khanh",
    department_code: "Chuyên Lọ",
    position_code: "Lọ Vương",
    base_salary: 5000000,
    status: "shown",
    start_date: "2025-01-01",
  },
];
