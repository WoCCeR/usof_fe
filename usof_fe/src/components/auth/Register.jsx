import React, { useState } from "react";
import { register } from "../../api/auth";
import { UilUser, UilLock, UilEnvelope } from "@iconscout/react-unicons";

const Register = () => {
  const [user, setUser] = useState({});
  const [additionalPassword, setAdditionalPassword] = useState("");
  const [error, setError] = useState("");

  async function registerUser() {
    if (user.pass !== additionalPassword) {
      console.log.error("Passwords don't match");
    }

    await register(user)
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", response.data.accessToken);
        window.location.href = "/auth";
      })
      .catch((err) => {
        console.log(err.response);
        setError("ERROR");
      });
  }

  return (
    <div className="form signup">
      <span className="title">Registration</span>
      <form action="#">
        <div className="input-field">
          <input
            type="text"
            id="name"
            placeholder="Enter your login"
            onChange={(e) => setUser({ ...user, login: e.target.value })}
            required
          />
          <UilUser className="uil" />
        </div>
        <div className="input-field">
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            onChange={(e) => setUser({ ...user, fullName: e.target.value })}
            required
          />
          <UilUser className="uil" />
        </div>
        <div className="input-field">
          <input
            type="text"
            id="email"
            placeholder="Enter your email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
          <UilEnvelope className="uil uil-envelope icon" />
        </div>
        <div className="input-field">
          <input
            type="password"
            id="password"
            className="password"
            placeholder="Create a password"
            onChange={(e) => setUser({ ...user, pass: e.target.value })}
            required
          />
          <UilLock className="uil uil-lock icon" />
        </div>
        <div className="input-field">
          <input
            type="password"
            id="confirmPassword"
            className="password"
            placeholder="Confirm a password"
            onChange={(e) => setAdditionalPassword(e.target.value)}
            required
          />
          <UilLock className="uil uil-lock icon" />
        </div>
        <div className="input-field button">
          <input type="button" onClick={registerUser} value="Register" />
        </div>
      </form>
    </div>
  );
};

export default Register;
