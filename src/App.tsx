import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Trangchu from "./components/Trangchu";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Trangchu />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
