import React, { Component } from "react";
import PropTypes from "prop-types";
import SubscriptionPlanModal from "./components/SubscriptionPlanModal";
import "./index.css";
import axios from "axios";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import Footer from "examples/Footer";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";

class Subcribtion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      viewCompleted: false,
      taskList: [],
      originalTaskList: [], // Add originalTaskList in state
      activeItem: {
        id: null,
        name: "",
        price: "",
        description: "",
        duration: "",
      },
    };
  }

  // Fetch subscription data from API
  fetchSubscriptions = () => {
    axios
      .get("http://localhost:8000/api/subscriptions/")
      .then((response) => {
        this.setState({
          taskList: response.data,
          originalTaskList: response.data, // Save original data for potential filtering
        });
      })
      .catch((error) => {
        console.error("There was an error fetching the subscription data!", error);
      });
  };

  componentDidMount() {
    this.fetchSubscriptions();
  }

  // Toggle the modal state
  toggleModal = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  // Handle saving of subscription plan
  handleSave = (item) => {
    if (item.id) {
      // Update existing subscription
      axios
        .put(`http://localhost:8000/api/subscriptions/${item.id}/`, item)
        .then(() => {
          this.fetchSubscriptions(); // Refresh the list
          this.toggleModal(); // Close the modal
        })
        .catch((error) => {
          console.error("There was an error updating the subscription plan!", error);
        });
    } else {
      // Create new subscription
      axios
        .post("http://localhost:8000/api/subscriptions/", item)
        .then(() => {
          this.fetchSubscriptions(); // Refresh the list
          this.toggleModal(); // Close the modal
        })
        .catch((error) => {
          console.error("There was an error creating the subscription plan!", error);
        });
    }
  };

  // Open the modal for creating a new subscription plan
  handleAddClick = () => {
    this.setState(
      {
        activeItem: {
          id: null,
          name: "",
          price: "",
          description: "",
          duration: "",
        },
      },
      this.toggleModal
    );
  };

  // Open the modal for editing an existing subscription plan
  handleEditClick = (item) => {
    this.setState(
      {
        activeItem: item,
      },
      this.toggleModal
    );
  };

  render() {
    const { modal, taskList, activeItem } = this.state;

    const columns = [
      { Header: "Subscription Name", accessor: "name" },
      { Header: "Price", accessor: "price" },
      { Header: "Description", accessor: "description" },
      { Header: "Duration (days)", accessor: "duration" },
    ];

    const rows = taskList.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description,
      duration: item.duration,
    }));

    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <MDTypography variant="h6" color="white">
                    Subscriptions
                  </MDTypography>
                  <Button
                    variant="contained"
                    color="white"
                    sx={{
                      color: "#257eea",
                      backgroundColor: "white",
                      "&:hover": { backgroundColor: "#257eea", color: "#ffffff" },
                    }}
                    onClick={this.handleAddClick}
                  >
                    Add Subscription
                  </Button>
                </MDBox>
                <MDBox pt={2}>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                  <Dialog open={this.state.modal} onClose={this.toggle}>
                    <SubscriptionPlanModal
                      activeItem={this.state.activeItem}
                      toggle={this.toggle}
                      onSave={this.handleSubmit}
                    />
                  </Dialog>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        <Footer />
        {modal && (
          <SubscriptionPlanModal
            activeItem={activeItem}
            toggle={this.toggleModal}
            onSave={this.handleSave}
          />
        )}
      </DashboardLayout>
    );
  }
}

// Define PropTypes for the `Subcribtion` component
Subcribtion.propTypes = {
  subscriptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired,
    })
  ),

  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

Subcribtion.defaultProps = {
  subscriptions: [], // Default to an empty array
  onUpdate: () => {},
  onDelete: () => {},
  loading: false,
  error: null,
};

export default Subcribtion;
