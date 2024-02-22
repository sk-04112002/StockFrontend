import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import LandingPage from "./components/LandingPage";
import AddProducts from "./components/AddProducts";
import UpdateProducts from "./components/UpdateProducts";
import AddUser from "./components/AddUser";
import ShowUsers from "./components/ShowUsers";
import OverStock from "./components/OverStock";
import LowStock from "./components/LowStock";
import OutOfStock from "./components/OutOfStock";
import ShowProduct from "./components/ShowProduct";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/AddProducts" element={<AddProducts />} />
        <Route path="/UpdateProducts/:id" element={<UpdateProducts />} />
        <Route path="/AddUser" element={<AddUser />} />
        <Route path="/ShowUsers" element={<ShowUsers />} />
        <Route path="/OverStock" element={<OverStock />} />
        <Route path="/LowStock" element={<LowStock />} />
        <Route path="/OutOfStock" element={<OutOfStock />} />
        <Route path="/ShowProduct/:id" element={<ShowProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
