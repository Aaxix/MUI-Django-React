import React from "react";
import { TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import PropTypes from "prop-types";

function TimeDateSelection({
  date,
  enableTimeSlot,
  handleDateChange,
  setSelectedTime,
  timeSlots,
  selectedTime,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="p-4 border-r">
        <DatePicker
          label="Pick a Date"
          value={date}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
        {enableTimeSlot ? (
          <div className="p-2 flex flex-col gap-2">
            <Typography>Select a time:</Typography>
            {timeSlots.map((time, index) => (
              <div
                key={index}
                className={`p-2 border cursor-pointer ${
                  selectedTime === time ? "border-primary" : "border-neutral"
                }`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </div>
            ))}
          </div>
        ) : (
          <Typography className="text-center p-5 text-red-400">
            No time slots available for the selected day.
          </Typography>
        )}
      </div>
    </LocalizationProvider>
  );
}

TimeDateSelection.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  enableTimeSlot: PropTypes.bool.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  setSelectedTime: PropTypes.func.isRequired,
  timeSlots: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedTime: PropTypes.string,
};

export default TimeDateSelection;
