import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import Query from "./Query";
import {
  FormControl,
  InputLabel,
  Select,
  Button,
  MenuItem,
} from "@material-ui/core";
import { db, auth } from "./firebase";
import { useHistory } from "react-router-dom";

function AdminDashboard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [query, setQuery] = useState([]);
  const [status, setStatus] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const history = useHistory();
  const [phase, setPhase] = useState("All");

  useEffect(() => {
    if (phase == "All") {
      db.collection("Queris")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setQuery(
            snapshot.docs.map((doc) => ({ id: doc.id, query: doc.data() }))
          );
        });
    } else {
      db.collection("Queris")
        .where("status", "==", phase)
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setQuery(
            snapshot.docs.map((doc) => ({ id: doc.id, query: doc.data() }))
          );
        });
    }
  }, [phase]);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        history.push("/adminLogin");
      })
      .catch((err) => alert(err.message));
  };

  const handleFilter = (event) => {
    setPhase(event.target.value);
  };

  return (
    <div className="adminDashboard__main">
      <div className="adminDashboard__navbar">
        <img
          className="adminDashboard__logo"
          src="https://houseitt.in/static/img/logos/Logo_main.png"
          alt=""
        />
        <div className="adminDashboard__filter">
          <div className="adminDashboard__queryFilter">
            <FormControl className="query__filter">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleFilter}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Yet to contact">Yet to contact</MenuItem>
                <MenuItem value="No response from customer">
                  No response from customer
                </MenuItem>
                <MenuItem value="In progress">In progress</MenuItem>
                <MenuItem value="Success">Success</MenuItem>
                <MenuItem value="Failure">Failure</MenuItem>
                <MenuItem value="Not interested right now but will be in future">
                  Not interested right now but will be in future
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <Button
            className="adminDashboard__signoutButton"
            variant="contained"
            color="secondary"
            onClick={handleSignOut}
          >
            Sign out
          </Button>
        </div>
      </div>
      {query.map(({ id, query }) => (
        <Query
          key={id}
          queryId={id}
          name={query.customerName}
          description={query.description}
          number={query.customerNumber}
          status={query.status}
          time={query.timestamp}
          lastUpdateBy={query.updatedBy}
        />
      ))}
    </div>
  );
}

export default AdminDashboard;
