import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Button, InputLabel, MenuItem } from "@material-ui/core";

import "./Query.css";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { db, auth } from "./firebase";

function Query({ name, description, queryId, status, time, lastUpdateBy }) {
  const [phase, setPhase] = useState(status);

  const handleChange = (event) => {
    setPhase(event.target.value);
  };

  const updatePhase = () => {
    db.collection("Queris")
      .doc(queryId)
      .update({
        status: phase,
        updatedBy: auth.currentUser.displayName,
      })
      .then(() => {
        alert("Status updated");
      })
      .catch((err) => console.log("Error occured try again later"));
  };

  return (
    <Card className="query__card" variant="outlined">
      <CardContent>
        <div className="query__statusInfo">
          <Typography variant="h6" color="textPrimary" gutterBottom>
            {name}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Status:{status}
          </Typography>
        </div>
        <Typography variant="subtitle2" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions className="query__status">
        <div>
          <FormControl className="query__statusUpdateButton">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={phase}
              onChange={handleChange}
            >
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
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={updatePhase}
          >
            Update Status
          </Button>
        </div>
        <div className="query__lastUpdateBy">
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Last Updated By: {lastUpdateBy}
          </Typography>
        </div>
      </CardActions>
    </Card>
  );
}

export default Query;
