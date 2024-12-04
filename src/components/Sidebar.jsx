import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");

    // Redirect to the login page
    navigate("/");
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link align-middle px-0">
                  <i className="fs-4 bi-house"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/helpers" className="nav-link px-0 align-middle">
                  <i className="fs-4 bi-people"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Helpers</span>
                </Link>
              </li>
              <li>
              <Link to="/categories" className="nav-link px-0 align-middle">
              <i class="fs-4 bi-tags-fill"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Categories</span>
                </Link>
                </li>
                <li>
              <Link to="/products" className="nav-link px-0 align-middle">
                  <i class="fs-4 bi-basket2-fill"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Products</span>
                </Link>
                </li>
            </ul>
            <div className="mt-auto">
              <button
                className="btn btn-danger w-100 mt-3"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className="col py-3">
          <Outlet /> {/* This is where child routes are rendered */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
