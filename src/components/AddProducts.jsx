import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AddProducts() {
  const [userName, setUserName] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productBrand, setProductBrand] = useState("");
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("Electronics");
  const [productQuantity, setProductQuantity] = useState("");
  const [productMinQuantity, setProductMinQuantity] = useState("");
  const [productMaxQuantity, setProductMaxQuantity] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  axios.defaults.withCredentials = true;
  const UserId = localStorage.getItem("email");
  const handleImage = (e) => {
    {
       var reader = new FileReader();
       reader.readAsDataURL(e.target.files[0]);
       reader.onload = () => {
          console.log(reader.result)
          setProductImage(reader.result)
       };
       reader.onerror = (err) => {
           console.log(err);
       }           
   }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post(`http://localhost:5001/api/products/${UserId}`, {
        productImage,
        productBrand,
        productName,
        productCategory,
        productQuantity,
        productMinQuantity,
        productMaxQuantity,
        productPrice,
        productDescription,
      })
      .then((result) => {
        console.log(result);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const handleUserName = () => {
    axios.get(`http://localhost:5001/api/user/getuser/${UserId}`).then((response) => {
      console.log(response.data);
      setUserName(response.data);
    }).catch((err) => console.log(err));
  }
  useEffect(() => {
    handleUserName();
  },[])
  
  return (
    <div>
      <div className="container my-5">
        <div className="d-flex justify-content-between">
          <h1>Hi, {userName.name}!</h1>
          <h5>
            <Link to="/landing" style={{ textDecoration: "none" }}>
              Home
            </Link>
          </h5>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="productImage" className="form-label">
                Product Image
              </label>
              <input
                type="file"
                className="form-control"
                id="productImage"
                onChange={handleImage}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productName" className="form-label">
                Product Brand
              </label>
              <input
                type="text"
                className="form-control"
                id="productName"
                value={productBrand}
                onChange={(e) => setProductBrand(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productName" className="form-label">
                Product Name
              </label>
              <input
                type="text"
                className="form-control"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <label htmlFor="category">Choose a Category :</label>
            <select
              id="category"
              name="category"
              className="mx-3 px-5 py-2"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
            >
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="furniture">Furniture</option>
              <option value="accessories">Accessories</option>
            </select>
            <div className="mb-3">
              <label htmlFor="productQuantity" className="form-label">
                Quantity
              </label>
              <input
                type="number"
                className="form-control"
                id="productQuantity"
                value={productQuantity}
                onChange={(e) => setProductQuantity(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productQuantity" className="form-label">
                Minimum Quantity (when the quantity goes less than minimum
                quantity it will appear at Low Stock)
              </label>
              <input
                type="number"
                className="form-control"
                id="productQuantity"
                value={productMinQuantity}
                onChange={(e) => setProductMinQuantity(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productQuantity" className="form-label">
                Maximum Quantity (when the quantity goes more than maximum
                quantity it will appear at Over Stock)
              </label>
              <input
                type="number"
                className="form-control"
                id="productQuantity"
                value={productMaxQuantity}
                onChange={(e) => setProductMaxQuantity(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productPrice" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="productPrice"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </div>

            <div className="form-floating mb-3">
              <textarea
                className="form-control"
                placeholder="Leave a comment here"
                id="floatingTextarea"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              ></textarea>
              <label htmlFor="floatingTextarea">Product Description</label>
            </div>
            <button type="submit" className="btn btn-primary">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProducts;
