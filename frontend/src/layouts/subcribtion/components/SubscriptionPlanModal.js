import React, { Component } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

class SubscriptionPlanModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      errors: {
        subname: false,
        price: false,
        description: false,
        duration_day: false,
      },
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      activeItem: { ...prevState.activeItem, [name]: value },
    }));
  };

  handleSubmit = () => {
    const { activeItem } = this.state;
    console.log("Submitting item:", activeItem); // Log the item being saved
    const errors = {
      subname: !activeItem.subname.trim(),
      price: isNaN(activeItem.price) || activeItem.price <= 0,
      description: !activeItem.description.trim(),
      duration_day: isNaN(activeItem.duration_day) || activeItem.duration_day <= 0,
    };
    console.log("Validation errors:", errors); // Log validation errors

    if (!errors.subname && !errors.price && !errors.description && !errors.duration_day) {
      console.log("Calling onSave with item:", activeItem);
      this.props.onSave(activeItem);
      this.props.toggle(); // Optionally close the modal
    } else {
      this.setState({ errors });
    }
  };

  render() {
    const { toggle } = this.props;
    const { errors } = this.state;

    return (
      <Dialog open={true} onClose={toggle}>
        <DialogTitle>Subscription Plan</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Subscription Name"
              name="subname"
              value={this.state.activeItem.subname}
              onChange={this.handleChange}
              fullWidth
              margin="dense"
              error={errors.subname}
              helperText={errors.subname ? "Subscription name is required" : ""}
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={this.state.activeItem.price}
              onChange={this.handleChange}
              fullWidth
              margin="dense"
              error={errors.price}
              helperText={errors.price ? "Price must be a positive number" : ""}
            />
            <TextField
              label="Description"
              name="description"
              value={this.state.activeItem.description}
              onChange={this.handleChange}
              fullWidth
              margin="dense"
              error={errors.description}
              helperText={errors.description ? "Description is required" : ""}
            />
            <TextField
              label="Duration (days)"
              name="duration_day"
              type="number"
              value={this.state.activeItem.duration_day}
              onChange={this.handleChange}
              fullWidth
              margin="dense"
              error={errors.duration_day}
              helperText={errors.duration_day ? "Duration must be a positive number" : ""}
            />
          </form>
        </DialogContent>
        <DialogActions>
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

SubscriptionPlanModal.propTypes = {
  activeItem: PropTypes.shape({
    id: PropTypes.number,
    subname: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.string.isRequired,
    duration_day: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  toggle: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default SubscriptionPlanModal;
