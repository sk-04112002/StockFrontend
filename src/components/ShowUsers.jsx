import React, { useEffect } from "react";
import { useState } from "react";
import deleteicon from "../assets/deleteicon.png"
import axios from "axios"
import { Link } from "react-router-dom";
function ShowUsers(){
    const [user, setUser] = useState([]);
    axios.defaults.withCredentials = true;
    const UserId = localStorage.getItem("email");
    useEffect(() => {
        axios.get(`http://localhost:5001/api/user/getuserdetails/${UserId}`).then((res) => {
            console.log(res.data);
            setUser(res.data);
        }).catch((err) => console.log(err));
    },[])

    const UserDetails = user.filter(
      (obj) => obj.email !== UserId
    );

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5001/api/user/deleteuser/${id}`).then((res) => {console.log(res);window.location.reload();}).catch((err) => console.log(err));
    }
    return (
      <div>
        <div className="container my-5">
          <div className="d-flex justify-content-between">
            <h1>Your Users,</h1>
            <h5>
              <Link to="/landing" style={{ textDecoration: "none" }}>
                Home
              </Link>
            </h5>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">User Id</th>
                <th scope="col">User Name</th>
                <th scope="col">User Email</th>
                <th scope="col">User Role</th>
                <th scope="col">Admin Id</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {UserDetails.map((user) => {
                return (
                  <tr>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.adminid}</td>
                    <td>
                      <img
                        src={deleteicon}
                        alt="delete"
                        style={{ height: "20px", cursor: "pointer" }}
                        onClick={(e) => handleDelete(user._id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
}
export default ShowUsers;