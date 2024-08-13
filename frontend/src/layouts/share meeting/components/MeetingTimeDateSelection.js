import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format, startOfDay, addMinutes } from "date-fns";
import UserFormInfo from "./UserFormInfo";

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

function MeetingTimeDateSelection({
  eventInfo,
  businessInfo,
  userName,
  setUserName,
  userEmail,
  setUserEmail,
  userNote,
  setUserNote,
  onSubmit,
}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [timeSlotsList, setTimeSlotsList] = useState([]);
  const [enableTimeSlot, setEnableTimeSlot] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (eventInfo?.duration) {
      setTimeSlotsList(timeSlots(eventInfo.duration));
    }
  }, [eventInfo]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const day = format(date, "EEEE");
    setEnableTimeSlot(businessInfo?.daysAvailable?.[day] || false);
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const handleNext = () => {
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <Grid container spacing={2} style={{ margin: "16px" }}>
      <Grid item xs={3}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              {businessInfo?.businessName}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {eventInfo?.eventName || "Meeting Name"}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Duration: {eventInfo?.duration} Min
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Location: {eventInfo?.locationType}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Date: {selectedDate ? format(selectedDate, "PPP") : "No Date Selected"}
            </Typography>
            {selectedTime && (
              <Typography variant="body2" color="textSecondary">
                Time: {selectedTime}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>

      {step === 1 && (
        <>
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
                      onChange={(newDate) => handleDateChange(newDate)}
                      minDate={startOfDay(new Date())}
                      disableHighlightToday
                      sx={{
                        "& .MuiPickersCalendarHeader-label": {
                          fontSize: "0.5rem",
                        },
                        "& .MuiPickersCalendarHeader-switchViewButton": {
                          fontSize: "1rem",
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
                    padding: "8px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {timeSlotsList.map((slot, index) => (
                    <Button
                      key={index}
                      variant="outlined"
                      style={{
                        margin: "4px",
                        display: "block",
                        width: "calc(100% - 8px)",
                        borderColor: selectedTime === slot ? "#3f51b5" : "#ccc",
                        color: selectedTime === slot ? "#3f51b5" : "#000",
                      }}
                      onClick={() => handleTimeClick(slot)}
                      disabled={!enableTimeSlot}
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Grid>
        </>
      )}

      {step === 2 && (
        <>
          <Grid item xs={8}>
            <Card>
              <CardContent>
                <UserFormInfo
                  setUserName={setUserName}
                  setUserEmail={setUserEmail}
                  setUserNote={setUserNote}
                />
              </CardContent>
            </Card>
          </Grid>
        </>
      )}

      <Grid item xs={11} style={{ textAlign: "right" }}>
        {step === 2 && (
          <Button
            variant="outlined"
            onClick={handleBack}
            style={{ marginRight: "8px" }}
            sx={{
              color: "gray",
            }}
          >
            Back
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={step === 1 ? handleNext : handleSubmit}
          disabled={step === 1 && !selectedTime}
          sx={{
            color: "#ffffff",
          }}
        >
          {step === 1 ? "Next" : "Schedule"}
        </Button>
      </Grid>
    </Grid>
  );
}

MeetingTimeDateSelection.propTypes = {
  eventInfo: PropTypes.object.isRequired,
  businessInfo: PropTypes.object.isRequired,
  userName: PropTypes.string.isRequired,
  setUserName: PropTypes.func.isRequired,
  userEmail: PropTypes.string.isRequired,
  setUserEmail: PropTypes.func.isRequired,
  userNote: PropTypes.string.isRequired,
  setUserNote: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default MeetingTimeDateSelection;
