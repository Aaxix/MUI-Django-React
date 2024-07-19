import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

const UserSubscriptionModal = ({ activeItem, toggle, onSave, users, plans, open }) => {
  const [form, setForm] = useState(activeItem);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(activeItem);
  }, [activeItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleStartDateChange = (date) => {
    setForm({ ...form, start_date: date.toISOString().split("T")[0] });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.user) newErrors.user = "User is required";
    if (!form.plan) newErrors.plan = "Plan is required";
    if (!form.start_date) newErrors.start_date = "Start Date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(form);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={toggle}
      sx={{ "& .MuiDialog-paper": { width: "500px", maxWidth: "600px" } }}
    >
      <DialogTitle>{form.id ? "Edit Subscription" : "Add Subscription"}</DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <FormControl fullWidth margin="normal" error={!!errors.user}>
            <InputLabel id="user-label">User</InputLabel>
            <Select
              labelId="user-label"
              name="user"
              sx={{ padding: "15px" }}
              value={form.user}
              onChange={handleChange}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
            {errors.user && <p style={{ color: "red" }}>{errors.user}</p>}
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.plan}>
            <InputLabel id="plan-label">Plan</InputLabel>
            <Select
              labelId="plan-label"
              name="plan"
              sx={{ padding: "15px" }}
              value={form.plan}
              onChange={handleChange}
            >
              {plans.map((plan) => (
                <MenuItem key={plan.id} value={plan.id}>
                  {plan.name}
                </MenuItem>
              ))}
            </Select>
            {errors.plan && <p style={{ color: "red" }}>{errors.plan}</p>}
          </FormControl>

          <DatePicker
            label="Start Date"
            value={form.start_date ? new Date(form.start_date) : null}
            onChange={handleStartDateChange}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                margin="normal"
                error={!!errors.start_date}
                helperText={errors.start_date}
              />
            )}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggle} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

UserSubscriptionModal.propTypes = {
  activeItem: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  plans: PropTypes.arrayOf(PropTypes.object).isRequired,
  open: PropTypes.bool.isRequired,
};

export default UserSubscriptionModal;
