import React, { useState, useEffect } from "react";
import Register from "../components/auth/Register";
import LoginPage from "../components/auth/LoginPage";
import { useLocation } from "react-router-dom";
import "./styles/Auth.scss";

const Auth = () => {
  const location = useLocation();
  const state = new URLSearchParams(location.search).get("state"); // Get query parameter
  const [activeTab, setActiveTab] = useState(state === "login");

  useEffect(() => {
    setActiveTab(state === "login"); // Sync activeTab with query parameter
  }, [state]);

  return (
      <div className="authStyle">
        <div className={`container ${activeTab ? "active" : ""}`}>
          <div className="forms">
            <LoginPage />
            <Register />
          </div>

          <div className="login-signup">
          {/*<span className="text">*/}
          {/*  {(!activeTab ? "Not a member?" : "Already a member?") + "|"}*/}
          {/*  <span*/}
          {/*      className="text signup-link"*/}
          {/*      onClick={() => setActiveTab(!activeTab)}*/}
          {/*  >*/}
          {/*    {!activeTab ? "Register now" : "Login now"}*/}
          {/*  </span>*/}
          {/*</span>*/}
          {/*  <br /> <br />*/}
            <span className="text">Forgot password?</span>
          </div>
        </div>
      </div>
  );
};

export default Auth;
