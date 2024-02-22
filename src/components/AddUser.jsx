import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AddUser() {
     const [name, setName] = useState();
     const [email, setEmail] = useState();
     const [password, setPassword] = useState();
     const role = "supervisor";
     const UserId = localStorage.getItem("email");
     const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5001/api/user/createuser/${UserId}`,{name,email,password,role}).then((res) => {console.log(res);window.location.reload();
      }).catch((err) => console.log(err));
     }
  return (
    <div>
      <div className="container">
        <div className="my-5 d-flex justify-content-between">
          <h1>Add User</h1>
          <h5>
            <Link to="/landing" style={{ textDecoration: "none" }}>
              Home
            </Link>
          </h5>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
export default AddUser;
