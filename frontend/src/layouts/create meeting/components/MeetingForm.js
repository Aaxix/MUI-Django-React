import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import locationOptions from "./LocationOptions"; // Ensure the path is correct

function MeetingForm({ setFormValue }) {
  const [eventName, setEventName] = useState("");
  const [duration, setDuration] = useState(30);
  const [locationUrl, setLocationUrl] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [urlError, setUrlError] = useState(""); // State to handle URL validation error
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false); // State to handle loading indicator

  useEffect(() => {
    setFormValue({
      eventName,
      duration,
      locationType: selectedLocation,
      locationUrl,
      startDate,
      endDate,
    });
  }, [eventName, duration, selectedLocation, locationUrl, startDate, endDate, setFormValue]);

  const validateUrl = (url) => {
    const urlPattern = /^(https?:\/\/)/;
    if (!urlPattern.test(url)) {
      setUrlError("Invalid URL. It must start with http:// or https://");
      return false;
    } else {
      setUrlError("");
      return true;
    }
  };

  const handleCreateClick = () => {
    if (!validateUrl(locationUrl)) {
      return;
    }

    const newEvent = {
      eventName,
      duration,
      locationType: selectedLocation,
      locationUrl,
      startDate,
      endDate,
    };

    setLoading(true); // Start loading state

    axios
      .post("http://localhost:8000/api/meeting-events/", newEvent)
      .then(() => {
        alert("New Meeting Event Created!");
        // Reset form fields
        setEventName("");
        setDuration(30);
        setLocationUrl("");
        setSelectedLocation(null);
        setStartDate("");
        setEndDate("");
      })
      .catch((err) => {
        console.error("Error creating meeting event:", err);
        alert("Error creating meeting event.");
      })
      .finally(() => {
        setLoading(false); // End loading state
      });
  };

  // Get current date in YYYY-MM-DD format
  const todayDate = new Date().toISOString().split("T")[0];

  return (
    <div style={{ padding: "16px", maxWidth: "600px", margin: "auto" }}>
      <TextField
        label="Event Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Duration</InputLabel>
        <Select
          label="Duration"
          value={duration}
          sx={{ padding: "8px" }}
          onChange={(e) => setDuration(e.target.value)}
        >
          <MenuItem sx={{ padding: "5px" }} value={15}>
            15 Min
          </MenuItem>
          <MenuItem sx={{ padding: "5px" }} value={30}>
            30 Min
          </MenuItem>
          <MenuItem sx={{ padding: "5px" }} value={45}>
            45 Min
          </MenuItem>
          <MenuItem sx={{ padding: "5px" }} value={60}>
            60 Min
          </MenuItem>
        </Select>
      </FormControl>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          padding: "8px 0",
        }}
      >
        {locationOptions.map((option) => (
          <Card
            key={option.name}
            onClick={() => setSelectedLocation(option.name)}
            style={{
              flex: "0 0 auto",
              width: "102px",
              height: "85px",
              cursor: "pointer",
              border: `2px solid ${selectedLocation === option.name ? "#3f51b5" : "#ccc"}`,
              transition: "border-color 0.3s",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "5px",
              boxSizing: "border-box",
            }}
          >
            <img
              src={option.icon}
              alt={option.name}
              style={{ width: 35, height: 35, marginBottom: 0 }}
            />
            <CardContent>
              <Typography variant="h6">{option.name}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
      <TextField
        label="Location URL"
        variant="outlined"
        fullWidth
        margin="normal"
        value={locationUrl}
        onChange={(e) => {
          setLocationUrl(e.target.value);
          validateUrl(e.target.value);
        }}
        error={!!urlError}
        helperText={urlError}
      />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Start Date"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: todayDate,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="End Date"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: startDate ? startDate : todayDate,
            }}
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleCreateClick}
        disabled={
          !eventName || !duration || !selectedLocation || !locationUrl || !!urlError || loading
        }
        sx={{
          color: "#ffffff",
          mt: 2,
        }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Create"}
      </Button>
    </div>
  );
}

MeetingForm.propTypes = {
  setFormValue: PropTypes.func.isRequired,
};

export default MeetingForm;
