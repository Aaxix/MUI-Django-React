import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format, startOfDay, addMinutes } from "date-fns";

const timeSlots = (duration) => {
  const slots = [];
  const startTime = startOfDay(new Date()).setHours(8, 0, 0, 0);
  const endTime = startOfDay(new Date()).setHours(18, 0, 0, 0);

  let currentTime = startTime;
  while (currentTime <= endTime) {
    slots.push(format(currentTime, "h:mm a"));
    currentTime = addMinutes(currentTime, duration);
  }

  return slots;
};

function PreviewMeeting({ formValue }) {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedTime, setSelectedTime] = React.useState(null);

  const slots = timeSlots(formValue.duration || 30);

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  return (
    <Grid container spacing={2} style={{ margin: "16px" }}>
      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              {formValue.eventName || "No Event Name"}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Duration: {formValue.duration ? `${formValue.duration} Min` : "No Duration"}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Location: {formValue.locationType || "No Location Type"}
            </Typography>
            {formValue.locationUrl && (
              <Typography variant="body2" color="textSecondary">
                Location URL: <a href={formValue.locationUrl}>{formValue.locationUrl}</a>
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
              Calendar
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "300px",
                }}
              >
                <CalendarPicker
                  date={selectedDate}
                  onChange={(newDate) => setSelectedDate(newDate)}
                  minDate={startOfDay(new Date())}
                  disableHighlightToday
                  sx={{
                    "& .MuiPickersCalendarHeader-label": {
                      fontSize: "0.5rem", // Adjust the size as needed
                    },
                    "& .MuiPickersCalendarHeader-switchViewButton": {
                      fontSize: "1rem", // Adjust the size as needed
                    },
                  }}
                />
              </div>
            </LocalizationProvider>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
              Available Time Slots
            </Typography>
            <div
              style={{
                maxHeight: "300px",
                overflowY: "auto",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              {slots.map((slot, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  style={{
                    margin: "4px",
                    display: "block",
                    width: "calc(100% - 8px)",
                    borderColor: selectedTime === slot ? "#3f51b5" : "#ccc",
                    color: selectedTime === slot ? "#3f51b5" : "#000",
                    backgroundColor: selectedTime === slot ? "#f0f0f0" : "#fff",
                  }}
                  onClick={() => handleTimeClick(slot)}
                >
                  {slot}
                </Button>
              ))}
            </div>
            {selectedTime && (
              <Typography variant="body2" color="textSecondary" style={{ marginTop: "10px" }}>
                Selected Time: {selectedTime}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

PreviewMeeting.propTypes = {
  formValue: PropTypes.shape({
    eventName: PropTypes.string,
    duration: PropTypes.number,
    locationType: PropTypes.string,
    locationUrl: PropTypes.string,
  }).isRequired,
};

export default PreviewMeeting;
