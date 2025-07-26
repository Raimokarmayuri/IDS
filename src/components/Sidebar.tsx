import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="sideNavBar show p-4">
      <ul className="navbar-nav">
        <li className="nav-item mt-0">
          <a className="nav-link active" aria-current="page" href="#">
            <i className="fa-solid fa-house"></i> Dashboard
          </a>
        </li>
      </ul>

      <p className="fs-6 fw-semibold mt-3 mb-2">ACCOUNT PAGES</p>

      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" aria-current="page" href="#">
            <i className="fa-solid fa-user"></i> Profile
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" aria-current="page" href="#">
            <i className="fa-solid fa-file"></i> Sign In
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" aria-current="page" href="#">
            <i className="fa-solid fa-rocket"></i> Sign Up
          </a>
        </li>
      </ul>

      <div className="menu_info_card mt-3">
        <div className="col-12 mb-3">
          <i className="fa-solid fa-circle-question"></i>
        </div>
        <div className="col-12 mb-3">
          <p className="fs-6 fw-semibold mb-0">Need help?</p>
          <small>Please check our docs</small>
        </div>
        <div className="col-12">
          <button type="button" className="btn btn-light w-100">
            DOCUMENTATION
          </button>
        </div>

        <span className="circle bg_circle1"></span>
        <span className="circle bg_circle2"></span>
        <span className="circle bg_circle3"></span>
        <span className="circle bg_circle4"></span>
      </div>
    </div>
  );
};

export default Sidebar;
