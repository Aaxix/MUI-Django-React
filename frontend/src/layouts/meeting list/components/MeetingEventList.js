import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  IconButton,
  Card,
  CardContent,
  Typography,
  Divider,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import { Settings, Edit, Delete, ContentCopy, AccessTime, Room } from "@mui/icons-material";
import axios from "axios";

function MeetingEventList({ searchQuery }) {
  const [eventList, setEventList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [businessInfo, setBusinessInfo] = useState(null);

  useEffect(() => {
    getEventList();
    getBusinessInfo();
  }, []);

  const getEventList = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/meeting-events/`);
      setEventList(response.data);
    } catch (err) {
      console.error("Error fetching meeting events:", err);
    }
  };

  const getBusinessInfo = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/businessName/`);
      setBusinessInfo(response.data);
    } catch (err) {
      console.error("Error fetching business info:", err);
    }
  };

  const handleDelete = async (event) => {
    try {
      await axios.delete(`http://localhost:8000/api/meeting-events/${event.id}/`);
      getEventList();
      alert("Meeting Event Deleted!");
    } catch (err) {
      console.error("Error deleting meeting event:", err);
      alert("Failed to delete meeting event.");
    }
  };

  const handleCopy = (event) => {
    if (!businessInfo || !event.eventName) {
      alert("Error: Unable to generate link.");
      return;
    }
    const meetingEventUrl = `${process.env.REACT_APP_API_URL}/${businessInfo.businessName}/${event.eventName}`;
    navigator.clipboard
      .writeText(meetingEventUrl)
      .then(() => {
        alert("URL Copied to Clipboard");
      })
      .catch(() => {
        alert("Error copying URL.");
      });
  };

  const handleMenuClick = (event, selectedEvent) => {
    setAnchorEl(event.currentTarget);
    setSelectedEvent(selectedEvent);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedEvent(null);
  };

  const filteredEvents = eventList.filter((event) =>
    event.eventName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      style={{
        marginTop: "20px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", // Ensures up to 4 cards per row
        gap: "20px",
        justifyContent: "center", // Center the cards horizontally
      }}
    >
      {filteredEvents.length > 0 ? (
        filteredEvents.map((event, index) => (
          <Card key={index} style={{ borderTop: `4px solid ${event.themeColor}` }}>
            <CardContent>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton onClick={(e) => handleMenuClick(e, event)}>
                  <Settings />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && selectedEvent === event}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => alert("Edit clicked")}>
                    <Edit /> Edit
                  </MenuItem>
                  <MenuItem onClick={() => handleDelete(event)}>
                    <Delete /> Delete
                  </MenuItem>
                </Menu>
              </div>
              <Typography variant="h6" component="h2">
                {event.eventName}
              </Typography>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                <Typography variant="body2" color="textSecondary">
                  <AccessTime /> {event.duration} min
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <Room /> {event.locationType}
                </Typography>
              </div>
              <Divider style={{ margin: "20px 0" }} />
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <Button
                  onClick={() => handleCopy(event)}
                  variant="outlined"
                  startIcon={<ContentCopy />}
                  sx={{
                    color: "gray",
                  }}
                >
                  Copy Link
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    color: "#ffffff",
                  }}
                >
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="h6" component="h2">
          No events found.
        </Typography>
      )}
    </div>
  );
}

// Define PropTypes
MeetingEventList.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default MeetingEventList;
