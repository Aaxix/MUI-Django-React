import React, { Component } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

class CustomModal extends Component {
  constructor(props) {
    super(props);
    // Initialize state with activeItem and errors
    this.state = {
      activeItem: this.props.activeItem,
      errors: {
        name: false,
        email: false,
      },
    };
  }

  // Handler for input changes
  handleChange = (e) => {
    let { name, value } = e.target;
    // Convert status value to "active" or "inactive"
    if (name === "status") {
      value = value;
    }
    // Update the activeItem state with the new value
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };

  // Handler for form submission
  handleSubmit = () => {
    const { activeItem } = this.state;
    // Validate form fields
    const errors = {
      name: !activeItem.name.trim(),
      email: !activeItem.email.trim(),
    };

    // If there are no validation errors
    if (!errors.name && !errors.email) {
      // Validate email format
      if (!this.validateEmail(activeItem.email)) {
        errors.email = true;
      } else {
        // Call onSave prop function with the activeItem as parameter
        this.props.onSave(activeItem);
        return;
      }
    }

    // Update state with validation errors
    this.setState({ errors });
  };

  // Function to validate email format
  validateEmail = (email) => {
    // Regular expression for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  render() {
    const { toggle } = this.props;
    const { errors } = this.state;
    return (
      <Dialog open={true} onClose={toggle}>
        <DialogTitle>Employee Table</DialogTitle>
        <DialogContent>
          <form>
            {/* Input fields for employee details */}
            <TextField
              label="Name"
              name="name"
              value={this.state.activeItem.name}
              onChange={this.handleChange}
              fullWidth
              margin="dense"
              error={errors.name}
              helperText={errors.name ? "Name is required" : ""}
            />
            <TextField
              label="Phone Number"
              name="phone"
              value={this.state.activeItem.phone}
              onChange={this.handleChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={this.state.activeItem.email}
              onChange={this.handleChange}
              fullWidth
              margin="dense"
              error={errors.email}
              helperText={errors.email ? "Please enter a valid email address" : ""}
            />
            <FormControl fullWidth>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                name="gender"
                sx={{ padding: "15px" }}
                value={this.state.activeItem.gender}
                onChange={this.handleChange}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Age"
              name="age"
              type="number"
              value={this.state.activeItem.age}
              onChange={this.handleChange}
              fullWidth
              margin="dense"
            />
            <FormControl fullWidth error={errors.status}>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status"
                name="status"
                sx={{ padding: "15px" }}
                value={this.state.activeItem.status}
                onChange={this.handleChange}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          {/* Cancel and Save buttons */}
          <Button onClick={toggle} color="secondary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

// Prop types for CustomModal component
CustomModal.propTypes = {
  activeItem: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    gender: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    status: PropTypes.string,
  }).isRequired,
  toggle: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default CustomModal;
