import React, { useState } from "react";
import { Input, Button, TextField, Box } from "@material-ui/core";
import "./QueryForm.css";
import { db } from "./firebase";
import firebase from "firebase";

function QueryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Yet to contact");

  const handleSubmit = () => {
    db.collection("Queris")
      .add({
        customerName: name,
        customerEmail: email,
        customerNumber: number,
        description: description,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        status: status,
        updatedBy: "Not updated yet",
      })
      .then(() => {
        alert("Your complain has been registerd");
      })
      .catch((err) => {
        alert("Submission failed try again later");
      });
    setName("");
    setEmail("");
    setNumber("");
    setDescription("");
  };
  return (
    <div className="query__main">
      <img
        className="queryForm__logo"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsqzmsPP2bWbXM7NhQ5TA-4redDqsWmr7ZXg&usqp=CAU"
        alt="House_itt"
      />

      <div className="query__form">
        <form className="query__data">
          <TextField
            margin="normal"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="standard-required"
            label="Name"
            className="query__input"
          />

          <TextField
            type="email"
            margin="normal"
            className="query__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            id="standard-required"
            label="Email"
          />

          <TextField
            margin="normal"
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="query__input"
            required
            id="standard-required "
            label="Phone Number"
          />

          <TextField
            type="text"
            margin="normal"
            className="query__input"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="standard-required"
            rows="5"
            label="Problem Description"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!name || !number || !description || !email}
            className="query__submitButton"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default QueryForm;
