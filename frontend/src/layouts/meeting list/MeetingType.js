import React, { useState } from "react";
import { TextField, Divider, Grid, Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MeetingEventList from "./components/MeetingEventList";

function MeetingType() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
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
                  Meeting Event Type
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2} pb={2}>
                <TextField
                  placeholder="Search"
                  variant="outlined"
                  fullWidth
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Divider sx={{ my: 2 }} />
                <MeetingEventList searchQuery={searchQuery} />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default MeetingType;
