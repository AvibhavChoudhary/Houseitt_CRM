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
  const [query, setQuery] = useState([]);
  const history = useHistory();
  const [phase, setPhase] = useState("All");

  useEffect(() => {
    if (auth.currentUser != null) {
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
    } else {
      history.push("/adminLogin");
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
          src="data:image/png;base64,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"
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
