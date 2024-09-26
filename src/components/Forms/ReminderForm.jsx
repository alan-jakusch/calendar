import React, { useState } from "react";

import {
  TextField,
  Button,
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  lastBtn: {
    marginLeft: "20px",
  },
}));

const ReminderForm = (props) => {
  const {
    reminder = "",
    date = "",
    time = "",
    city = "",
    onSave,
    onCancel,
  } = props;
  const [_reminder, setReminder] = useState(reminder);
  const [_date, setDate] = useState(date);
  const [_time, setTime] = useState(time);
  const [_city, setCity] = useState(city);
  const [error, setError] = useState(false);

  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      _reminder.length > 30 ||
      _reminder.length < 3 ||
      _date.length !== 10 ||
      _time.length !== 5 ||
      _city.length > 30 ||
      _city.length < 3
    ) {
      return setError(true);
    }

    onSave({
      reminder: _reminder,
      date: _date,
      time: _time,
      city: _city,
    });
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Reminder"
              variant="outlined"
              value={_reminder}
              onChange={(e) => setReminder(e.target.value)}
              error={error && (_reminder.length > 30 || _reminder.length < 3)}
              helperText={
                error && (_reminder.length > 30 || _reminder.length < 3)
                  ? "Min 3 and Max 30 characters"
                  : ""
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="date"
              label="Date"
              variant="outlined"
              value={_date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              error={error && _date.length !== 10}
              helperText={error && _date.length !== 10 ? "Date is invalid" : ""}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="time"
              label="Time"
              variant="outlined"
              value={_time}
              onChange={(e) => setTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
              error={error && _time.length !== 5}
              helperText={error && _time.length !== 5 ? "Date is invalid" : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="City"
              variant="outlined"
              value={_city}
              onChange={(e) => setCity(e.target.value)}
              error={error && (_city.length > 30 || _city.length < 3)}
              helperText={
                error && (_city.length > 30 || _city.length < 3)
                  ? "Min 3 and Max 30 characters"
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
            <Button
              onClick={onCancel}
              color="primary"
              sx={{ marginRight: "10px" }}
              className={classes.lastBtn}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

ReminderForm.propTypes = {
  reminder: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
  city: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ReminderForm;
