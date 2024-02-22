import React, { useEffect, useState } from "react";
import logo from "../assets/warehouse.png"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import update from "../assets/update.png";
import deleteicon from "../assets/deleteicon.png";
import eye from "../assets/eye.png";
function LandingPage() {
  const [productData, setProductData] = useState([]);
  const [role, setRole] = useState("");
   
  axios.defaults.withCredentials = true
  const navigate = useNavigate();
  const UserId = localStorage.getItem("email");

  const findRole = () => {
    axios.get(`http://localhost:5001/api/user/findrole/${UserId}`).then((res) => {console.log(res.data);setRole(res.data.role)}).catch((err) => console.log(err));
  }

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/landing")
      .then((result) => {
        console.log(result)
        if (
          result.data !== "Successfull" ||
          result.data === "Missing token" ||
          result.data === "Invalid token"
        ) {
          navigate("/");
        }else{
          axios
            .get(`http://localhost:5001/api/products/getproducts/${UserId}`)
            .then((result) => {
              
              setProductData(result.data);
            }).catch((err) => console.log(err));
        }
      }).catch((error) => {
         if (error.response) {
           // The request was made, but the server responded with a non-2xx status code
           console.error(
             "Server responded with an error:",
             error.response.data
           );
         } else if (error.request) {
           // The request was made, but no response was received
           console.error("No response received from the server");
         } else {
           // Something happened in setting up the request that triggered an error
           console.error("Error setting up the request:", error.message);
         }
      })
      findRole();
  },[])
  const handleLogout = () => {
    axios.post(`http://localhost:5001/api/user/logout`).then((response) => console.log(response)).catch((err) => console.log(err));
  }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5001/api/products/deleteproduct/${id}`).then((result) => {console.log(result);window.location.reload();}).catch((err) => console.log(err));
  }

  let content;
  let contents;
  let contentss;
  if(role === "admin"){
      content = (
        <Link
          to="/AddProducts"
          className="mx-3"
          style={{ textDecoration: "none" }}
        >
          Add Items
        </Link>
      );
      contents = (
        <Link to="/AddUser" className="mx-3" style={{ textDecoration: "none" }}>
          Add User
        </Link>
      );
      contentss = (
        <Link
          to="/ShowUsers"
          className="mx-3"
          style={{ textDecoration: "none" }}
        >
          Show Users
        </Link>
      );
    
    
  }else{
    content = <div></div>
    contents = <div></div>
    contentss = <div></div>
  }
  return (
    <div>
      <div className="container d-flex justify-content-between">
        <div className="d-flex">
          <img
            src={logo}
            alt="logo"
            style={{ height: "40px", width: "40px" }}
            className="my-3"
          />
          <h3 className="mx-2 my-4">Stock Management App</h3>
        </div>

        <h6
          className="my-4"
          style={{ cursor: "pointer", textDecoration: "none" }}
        >
          {/* <Link to="/AddProducts" className="mx-3">Add Items</Link>
          <Link to="/AddUser" className="mx-3">Add User</Link> */}
          {content}
          {contents}
          {contentss}
          <Link
            to="/"
            onClick={handleLogout}
            style={{ textDecoration: "none" }}
          >
            Logout
          </Link>
        </h6>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-9 col-sm-12 table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Product Image</th>
                  <th scope="col">Product Brand</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {productData.map((product) => {
                  return (
                    <tr>
                      <td>
                        <img
                          src={product.productImage}
                          alt="Product Image"
                          style={{
                            height: "80px",
                            width: "80px",
                            objectFit: "cover",
                            borderRadius: "10px",
                          }}
                        />
                      </td>
                      <td>{product.productBrand}</td>
                      <td>{product.productName}</td>
                      <td>{product.productCategory}</td>
                      <td>{product.productQuantity}</td>
                      <td>{product.productPrice}</td>
                      <td>
                        <Link to={`/UpdateProducts/${product._id}`}>
                          <img
                            src={update}
                            alt="update"
                            className="px-3"
                            style={{ height: "20px" }}
                          />
                        </Link>
                        <img
                          src={deleteicon}
                          alt="delete"
                          style={{ height: "20px", cursor: "pointer" }}
                          onClick={(e) => handleDelete(product._id)}
                        />
                        <Link to={`/ShowProduct/${product._id}`}>
                          <img
                            src={eye}
                            alt="show"
                            className="px-3"
                            style={{ height: "20px" }}
                          />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="col-md-3 col-sm-12">
            <Link to="/OverStock" style={{ textDecoration: "none" }}>
              <div
                style={{
                  height: "100px",
                  backgroundColor: "green",
                  color: "white",
                  borderRadius: "5px",
                  fontSize: "2rem",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
                className=" d-flex align-items-center justify-content-center my-3"
              >
                Over Stock
              </div>
            </Link>
            <Link to="/LowStock" style={{ textDecoration: "none" }}>
              <div
                style={{
                  height: "100px",
                  backgroundColor: "orange",
                  color: "white",
                  borderRadius: "5px",
                  fontSize: "2rem",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
                className=" d-flex align-items-center justify-content-center my-3"
              >
                Low Stock
              </div>
            </Link>
            <Link to="/OutOfStock" style={{ textDecoration: "none" }}>
              <div
                style={{
                  height: "100px",
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "5px",
                  fontSize: "2rem",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
                className=" d-flex align-items-center justify-content-center my-3"
              >
                Out of Stock
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LandingPage;
