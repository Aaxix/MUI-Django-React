import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MeetingForm from "./components/MeetingForm"; // Adjust path if needed
import PreviewMeeting from "./components/PreviewMeeting"; // Adjust path if needed

function CreateMeeting() {
  const [formValue, setFormValue] = useState({});

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={4}>
          {/* Meeting Form Section */}
          <Grid item xs={12} md={4}>
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
              >
                <MDTypography variant="h6" color="white">
                  Create Meeting
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2} pb={2}>
                <MeetingForm setFormValue={setFormValue} />
              </MDBox>
            </Card>
          </Grid>

          {/* Preview Section */}
          <Grid item xs={12} md={8}>
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
              >
                <MDTypography variant="h6" color="white">
                  Preview
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2} pb={2}>
                <PreviewMeeting formValue={formValue} />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default CreateMeeting;
