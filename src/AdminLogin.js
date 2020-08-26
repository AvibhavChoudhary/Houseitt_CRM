import React, { useState } from "react";
import "./AdminLogin.css";
import { TextField, Button } from "@material-ui/core";
import { auth } from "./firebase";
import { Redirect, useHistory } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        auth.currentUser.updateProfile({
          displayName: name,
        });
        setEmail("");
        setPassword("");
        history.push("/adminDashboard");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="adminLogin__main">
      <img
        className="adminLogin__logo"
        src="https://houseitt.in/static/img/logos/Logo_main.png"
        alt="House_itt"
      />

      <div className="adminLogin__form">
        <form className="admin__data">
          <TextField
            type="text"
            margin="normal"
            className="adminLogin__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            id="standard-required"
            label="Name"
          />
          <TextField
            type="email"
            margin="normal"
            className="adminLogin__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            id="standard-required"
            label="Email"
          />

          <TextField
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="adminLogin__input"
            required
            id="standard-required "
            label="Password"
          />

          <Button
            variant="contained"
            disabled={!name || !email || !password}
            color="primary"
            onClick={handleLogin}
            className="adminLogin__submitButton"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
