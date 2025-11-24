import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      {/* <Link to={"/login"}>Đăng nhập</Link> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
