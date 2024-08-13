import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MeetingTimeDateSelection from "./components/MeetingTimeDateSelection";
import axios from "axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Card, Grid } from "@mui/material";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const mockBusinessData = {
  businessName: "Mock Business",
  email: "contact@mockbusiness.com",
  daysAvailable: {
    Monday: true,
    Tuesday: true,
    Wednesday: false,
    Thursday: true,
    Friday: true,
  },
};

const mockEventData = {
  id: "123",
  eventName: "Mock Event",
  duration: 30,
  locationType: "Online",
  locationUrl: "https://example.com",
  themeColor: "#FF5733",
};

function SharedMeeting({ params }) {
  const [businessInfo, setBusinessInfo] = useState(null);
  const [eventInfo, setEventInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMeetingBusinessAndEventDetails();
  }, []);

  const getMeetingBusinessAndEventDetails = async () => {
    setLoading(true);
    try {
      setBusinessInfo(mockBusinessData);
      setEventInfo(mockEventData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

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
                  Shared Meeting
                </MDTypography>
              </MDBox>
              <div>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  businessInfo &&
                  eventInfo && (
                    <MeetingTimeDateSelection
                      eventInfo={eventInfo}
                      businessInfo={businessInfo}
                      userName=""
                      setUserName={() => {}}
                      userEmail=""
                      setUserEmail={() => {}}
                      userNote=""
                      setUserNote={() => {}}
                      onSubmit={() => {}}
                    />
                  )
                )}
              </div>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

SharedMeeting.propTypes = {
  params: PropTypes.shape({
    business: PropTypes.string.isRequired,
    MeetingEventId: PropTypes.string.isRequired,
  }).isRequired,
};

export default SharedMeeting;
