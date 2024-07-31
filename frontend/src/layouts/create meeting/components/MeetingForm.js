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
} from "@mui/material";
import axios from "axios";
import locationOptions from "./LocationOptions"; // Ensure the path is correct

function MeetingForm({ setFormValue }) {
  const [eventName, setEventName] = useState("");
  const [duration, setDuration] = useState(30);
  const [locationUrl, setLocationUrl] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    setFormValue({
      eventName,
      duration,
      locationType: selectedLocation,
      locationUrl,
    });
  }, [eventName, duration, selectedLocation, locationUrl, setFormValue]);

  const handleCreateClick = async () => {
    const newEvent = {
      eventName,
      duration,
      locationType: selectedLocation,
      locationUrl,
    };

    try {
      await axios.post("http://localhost:8000/api/create-event", newEvent);
      alert("New Meeting Event Created!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "8px" }}>
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
          value={duration}
          sx={{ padding: "15px" }}
          onChange={(e) => setDuration(e.target.value)}
        >
          <MenuItem value={15}>15 Min</MenuItem>
          <MenuItem value={30}>30 Min</MenuItem>
          <MenuItem value={45}>45 Min</MenuItem>
          <MenuItem value={60}>60 Min</MenuItem>
        </Select>
      </FormControl>
      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          gap: "8px", // Uniform gap between cards
          padding: "0px 0px", // Space above and below the row
        }}
      >
        {locationOptions.map((option) => (
          <Card
            key={option.name}
            onClick={() => setSelectedLocation(option.name)}
            style={{
              flex: "0 0 auto", // Prevents shrinking and wrapping
              width: "105px", // Adjust width to your preference
              height: "85px", // Adjust height to your preference
              cursor: "pointer",
              border: `2px solid ${selectedLocation === option.name ? "#3f51b5" : "#ccc"}`,
              transition: "border-color 0.3s",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "5px", // Add padding inside the card
              boxSizing: "border-box", // Includes padding and border in the element's total width and height
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
        onChange={(e) => setLocationUrl(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleCreateClick}
        sx={{
          color: "#ffffff",
        }}
        disabled={!eventName || !duration || !selectedLocation || !locationUrl}
      >
        Create
      </Button>
    </div>
  );
}

MeetingForm.propTypes = {
  setFormValue: PropTypes.func.isRequired,
};

export default MeetingForm;
