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
        src="data:image/jpeg;base64,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"
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
