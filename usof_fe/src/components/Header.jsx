import "./styles/Header.scss";
import React from "react";

import { UilSignout, UilUserCircle } from "@iconscout/react-unicons";

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../api/auth";
import { removeUser } from "../store/authSlice";
import { useAuth } from "../hooks/useAuth";
import { useUserAvatar } from "../hooks/useUserAvatar";

const Header = () => {
  const dispatch = useDispatch();

  const { isAuth, userData, userId } = useAuth();
  const { avatar } = useUserAvatar(userId);

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(removeUser());
      localStorage.removeItem("token");
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
      <div className="header-container">
        <header className="header">
          <Link to="/" className="logo-link">
            <div className="header-left">
              <img src="/logo.png" alt="USOF Logo" className="logo-image"/>
              {/*<h1>USOF</h1>*/}
            </div>

          </Link>
          <div className="header-right">
            {!isAuth ? (
                <>
                  <Link to="/auth?state=login">
                    <button className="btn btn-outline">Sign Up</button>
                  </Link>
                  <Link to="/auth?state=register">
                    <button className="btn btn-primary">Log In</button>
                  </Link>
                </>
            ) : (
                <>
                  <span className="username">{`${userData.login}`}</span>
                  {avatar ? (
                      <img
                          className="avatar"
                          src={avatar}
                          alt="User Avatar"
                          width={35}
                          height={35}
                      />
                  ) : (
                      <UilUserCircle size="35" color="#757575" />
                  )}
                  <button className="btn logout" onClick={handleLogout}>
                    <UilSignout />
                  </button>
                </>
            )}
          </div>
        </header>
        <hr className="divider" />
      </div>
  );
};

export default Header;
