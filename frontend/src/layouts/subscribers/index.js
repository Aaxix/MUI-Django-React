import React, { Component } from "react";
import UserSubscriptionModal from "./components/UserSubscriptionModal";
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
import TextField from "@mui/material/TextField";

class Subscribers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      taskList: [],
      originalTaskList: [],
      activeItem: {
        user: "",
        plan: "",
        start_date: new Date().toISOString().split("T")[0], // Today's date
        end_date: "", // Automatically calculated in the backend
      },
      users: [], // To store users
      plans: [], // To store plans
    };
  }

  componentDidMount() {
    this.refreshList();
    this.fetchUsers();
    this.fetchPlans();
  }

  fetchUsers = () => {
    axios
      .get("http://localhost:8000/api/employee/")
      .then((res) => {
        this.setState({ users: res.data });
      })
      .catch((err) => console.error("Error fetching users:", err));
  };

  fetchPlans = () => {
    axios
      .get("http://localhost:8000/api/subscriptions/")
      .then((res) => {
        console.log("Fetched plans:", res.data); // Log the fetched plans
        this.setState({ plans: res.data });
      })
      .catch((err) => console.error("Error fetching plans:", err));
  };

  refreshList = () => {
    axios
      .get("http://localhost:8000/api/user-subscriptions/")
      .then((res) => this.setState({ taskList: res.data, originalTaskList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/user-subscriptions/${item.id}/`, item)
        .then((res) => {
          this.refreshList();
        })
        .catch((err) => console.error("Error updating subscription:", err));
    } else {
      axios
        .post("http://localhost:8000/api/user-subscriptions/", item)
        .then((res) => {
          this.refreshList();
        })
        .catch((err) => console.error("Error creating subscription:", err));
    }
  };

  handleDelete = (item) => {
    if (window.confirm("Are you sure you want to delete this subscription?")) {
      axios
        .delete(`http://localhost:8000/api/user-subscriptions/${item.id}/`)
        .then((res) => this.refreshList());
    }
  };

  createItem = () => {
    const item = {
      user: "",
      plan: "",
      start_date: new Date().toISOString().split("T")[0], // Today's date
      end_date: "", // End date calculated automatically
    };
    this.setState({ activeItem: item, modal: true });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: true });
  };

  handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    const filteredList = this.state.originalTaskList.filter((task) => {
      return (
        task.user_name.toLowerCase().includes(value) ||
        task.plan_name.toLowerCase().includes(value) ||
        task.start_date.toString().includes(value) ||
        task.end_date.toString().includes(value)
      );
    });
    this.setState({ taskList: filteredList });
  };

  handleClearSearch = () => {
    this.setState({ taskList: this.state.originalTaskList });
  };

  render() {
    const { taskList, users, plans, modal, activeItem } = this.state;

    const columns = [
      { Header: "Number", accessor: "index" },
      { Header: "User", accessor: "user_name" },
      { Header: "Plan", accessor: "plan_name" },
      { Header: "Start Date", accessor: "start_date" },
      { Header: "End Date", accessor: "end_date" },
      { Header: "Actions", accessor: "actions" },
    ];

    const rows = taskList.map((item, index) => ({
      index: index + 1,
      user_name: item.user_name,
      plan_name: item.plan_name,
      start_date: new Date(item.start_date).toLocaleDateString(),
      end_date: new Date(item.end_date).toLocaleDateString(),
      actions: (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button variant="primary" onClick={() => this.editItem(item)}>
            Edit
          </Button>
          <Button variant="secondary" onClick={() => this.handleDelete(item)}>
            Delete
          </Button>
        </Box>
      ),
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
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <TextField
                      variant="outlined"
                      type="text"
                      placeholder="Search..."
                      onChange={this.handleSearch}
                      style={{ borderRight: "0" }}
                      InputProps={{ style: { backgroundColor: "white" } }}
                    />
                    <Button
                      variant="contained"
                      color="white"
                      sx={{
                        color: "white",
                        backgroundColor: "white",
                        "&:hover": { backgroundColor: "#257eea", color: "#ffffff" },
                      }}
                      style={{
                        borderRadius: "0",
                        borderTopRightRadius: "4px",
                        borderBottomRightRadius: "4px",
                      }}
                      onClick={this.handleClearSearch}
                    >
                      Clear
                    </Button>
                  </div>
                  <Button
                    variant="contained"
                    color="white"
                    sx={{
                      color: "#257eea",
                      backgroundColor: "white",
                      "&:hover": { backgroundColor: "#257eea", color: "#ffffff" },
                    }}
                    onClick={this.createItem}
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
                  <UserSubscriptionModal
                    activeItem={activeItem}
                    toggle={this.toggle}
                    onSave={this.handleSubmit}
                    users={users}
                    plans={plans}
                    open={modal}
                  />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }
}

export default Subscribers;
