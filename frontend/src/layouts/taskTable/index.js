import React, { Component } from "react";
import CustomModals from "./components/Modals";
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
import TextField from "@mui/material/TextField";

class TaskTables extends Component {
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
        phone: "",
        email: "",
        gender: "",
        age: "",
        status: "",
      },
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("http://localhost:8000/api/employee/")
      .then((res) => {
        // Update both taskList and originalTaskList
        this.setState({ taskList: res.data, originalTaskList: res.data });
      })
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/employee/${item.id}/`, item)
        .then((res) => this.refreshList());
    } else {
      axios.post("http://localhost:8000/api/employee/", item).then((res) => this.refreshList());
    }
  };

  handleDelete = (item) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      axios
        .delete(`http://localhost:8000/api/employee/${item.id}/`)
        .then((res) => this.refreshList());
    }
  };

  createItem = () => {
    const item = { name: "", phone: "", email: "", status: true };
    this.setState({ activeItem: item, modal: true });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: true });
  };

  handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    const filteredList = this.state.originalTaskList.filter((task) => {
      return (
        task.name.toLowerCase().includes(value) ||
        task.email.toLowerCase().includes(value) ||
        task.phone.toLowerCase().includes(value) ||
        task.gender.toLowerCase().includes(value) ||
        task.age.toString().includes(value) ||
        task.status.toLowerCase().includes(value)
      );
    });
    this.setState({ taskList: filteredList });
  };

  handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleSearch(e);
    }
  };

  handleClearSearch = () => {
    this.setState({ taskList: this.state.originalTaskList });
  };

  handleFilter = (status) => {
    const filteredList = this.state.originalTaskList.filter(
      (task) => task.status.toLowerCase() === status.toLowerCase()
    );
    this.setState({ taskList: filteredList });
  };

  render() {
    const columns = [
      { Header: "Number", accessor: "index" },
      { Header: "ID", accessor: "id" },
      { Header: "Name", accessor: "name" },
      { Header: "Phone", accessor: "phone" },
      { Header: "Email", accessor: "email" },
      { Header: "Gender", accessor: "gender" },
      { Header: "Age", accessor: "age" },
      { Header: "Status", accessor: "status" },
      { Header: "Actions", accessor: "actions" },
    ];

    const rows = this.state.taskList.map((item) => ({
      index: this.state.taskList.indexOf(item) + 1,
      id: item.id,
      name: item.name,
      phone: item.phone,
      email: item.email,
      gender: item.gender,
      age: item.age,
      status: item.status,
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
                    Employee Tables
                  </MDTypography>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <TextField
                      variant="outlined"
                      type="text"
                      placeholder="Search..."
                      onChange={this.handleSearch}
                      onKeyPress={this.handleSearchKeyPress}
                      style={{
                        borderRight: "0",
                      }}
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
                    Add Employee
                  </Button>
                </MDBox>
                <MDBox pt={2}>
                  <Button
                    variant="contained"
                    color="white"
                    sx={{
                      color: "#257eea",
                      backgroundColor: "white",
                      "&:hover": { backgroundColor: "#257eea", color: "#ffffff" },
                      spacing: "alignItems",
                    }}
                    style={{
                      margin: "10px",
                    }}
                    onClick={() => this.handleFilter("Active")}
                  >
                    Active
                  </Button>
                  <Button
                    variant="contained"
                    color="white"
                    sx={{
                      color: "#257eea",
                      backgroundColor: "white",
                      "&:hover": { backgroundColor: "#257eea", color: "#ffffff" },
                      spacing: "alignItems",
                    }}
                    onClick={() => this.handleFilter("Inactive")}
                  >
                    Inactive
                  </Button>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                  <Dialog open={this.state.modal} onClose={this.toggle}>
                    <CustomModals
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
      </DashboardLayout>
    );
  }
}

export default TaskTables;
