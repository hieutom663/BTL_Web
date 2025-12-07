const SuaThongTinPhong = (props: {
  formData: any;
  formSua: any;
  setFormSua: any;
  setFlag: any;
  setFormData: any;
}) => {
  const { formData, formSua, setFormSua, setFlag, setFormData } = props;
  const kiemTra = () => {
    if (formData.maPhong.length !== 3 || formData.tenPhong.length < 10) {
      return false;
    }
    return true;
  };
  return (
    <>
      <div style={{ padding: "20px", fontFamily: "sans-serif", width: "85vw" }}>
        <h2 style={{ color: "#0056b3", marginBottom: 8 }}>Quản lý phòng ban</h2>
        <hr />
        <form
          style={{
            border: "1px solid black",
            borderRadius: 8,
            margin: "8px 8px 8px 0px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            padding: 20,
          }}
          onSubmit={async (e) => {
            e.preventDefault();
            if (!kiemTra()) {
              alert("Vui lòng nhập đầy đủ thông tin phòng ban !");
              return;
            }
            try {
              const url = formSua
                ? `http://localhost:3000/api/suaphongban/${formData.maPhong}`
                : "http://localhost:3000/api/themphongban";
              const method = formSua ? "PUT" : "POST";

              const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
              });
              const data = await response.json();
              if (!response.ok) {
                alert(data.message || "Lỗi");
              } else {
                alert(formSua ? "Sửa thành công" : "Thêm thành công");
                setFlag(false);
                setFormSua(false);
                setFormData({
                  maPhong: "",
                  tenPhong: "",
                  namThanhLap: new Date().getFullYear(),
                  trangThai: "Hoạt động",
                });

                window.location.reload();
              }
            } catch {
              alert("Lỗi server");
            }
          }}
        >
          <h3>{formSua ? "Sửa phòng ban" : "Thêm phòng ban mới"}</h3>

          <div style={{ border: "" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 16,
              }}
            >
              <label>Mã phòng:</label>
              <input
                type="text"
                placeholder="Mã phòng"
                value={formData.maPhong}
                onChange={(e) => {
                  setFormData({ ...formData, maPhong: e.target.value });
                }}
                disabled={formSua}
              ></input>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 16,
              }}
            >
              <label>Tên phòng:</label>
              <input
                type="text"
                placeholder="Tên phòng"
                value={formData.tenPhong}
                onChange={(e) => {
                  setFormData({ ...formData, tenPhong: e.target.value });
                }}
              ></input>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 16,
              }}
            >
              <label>Năm thành lập:</label>
              <input
                type="text"
                placeholder="Mã phòng"
                value={formData.namThanhLap}
                disabled={formSua}
              ></input>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 16,
              }}
            >
              <label>Trạng thái:</label>
              <select
                onChange={(e) => {
                  setFormData({ ...formData, trangThai: e.target.value });
                }}
                disabled={!formSua}
              >
                <option>Hoạt động</option>
                <option>Không hoạt động</option>
              </select>
            </div>
            <button style={{ marginLeft: 60 }}>Lưu</button>
          </div>
        </form>
        <button
          onClick={() => {
            setFlag(false);
            setFormSua(false);
            setFormData({
              maPhong: "",
              tenPhong: "",
              namThanhLap: new Date().getFullYear(),
              trangThai: "Hoạt động",
            });
          }}
        >
          Quay lại
        </button>
      </div>
    </>
  );
};
export default SuaThongTinPhong;
