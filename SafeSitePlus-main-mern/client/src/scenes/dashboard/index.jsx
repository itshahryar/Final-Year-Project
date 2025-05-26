import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';
import FlexBetween from "@components/FlexBetween";
import Header from "@components/Header";
import { Doughnut, Bar } from 'react-chartjs-2';
import { Box, Button, Typography, useTheme, Grid } from "@mui/material";
import StatBox from "@components/StatBox";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
// import SupDash from 'scenes/SupDash';


const Dashboard = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [supervisorData, setSupervisorData] = useState({
    total: 0,
    active: 0,
    suspended: 0,
  });
  const [siteData, setSiteData] = useState({
    total: 0,
    monitored: 0,
    unmonitored: 0,
  });

 const {type} = useParams();
 console.log(type);

 const UserId = useSelector((state) => state.global.userId);

  const fetchyourSites =async ()=>{
    try{
      const response = await axios.get('http://localhost:5000/Site/myAll',{UserId})
      AllSites = response.data;

      const updatedSiteData = {
        total: allSites.length,
        // monitored: allSites.filter(site => site.monitored).length,
        // unmonitored: allSites.filter(site => !site.monitored).length,
      };

      setSiteData(updatedSiteData)
    }
  
  catch(E) {

  }
}

  // Fetch Supervisor Stats
  const fetchSupervisors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/supervisor/All');
      const allSupervisors = response.data;

      const updatedSupervisorData = {
        total: allSupervisors.length,
        active: 0,
        suspended: 0,
      };

      allSupervisors.forEach((supervisor) => {
        if (supervisor.status === 'active') {
          updatedSupervisorData.active++;
        } else if (supervisor.status === 'suspended') {
          updatedSupervisorData.suspended++;
        }
      });

      setSupervisorData(updatedSupervisorData);
    } catch (error) {
      console.error("Error fetching supervisor data:", error);
    }
  };

  // Fetch Site Stats
  const fetchSites = async () => {
    try {
      const response = await axios.get('http://localhost:5000/Site/All');
      const allSites = response.data;

      const updatedSiteData = {
        total: allSites.length,
        monitored: allSites.filter(site => site.monitored).length,
        unmonitored: allSites.filter(site => !site.monitored).length,
        
      };

      setSiteData(updatedSiteData);
    } catch (error) {
      console.error("Error fetching site data:", error);
    }
  };

  useEffect(() => {
    if(type == 'admin'){
      fetchSupervisors();
      fetchSites();
    }
    else if(type =='supervisor'){
      fetchyourSites();
    }
   
  
  }, []);

  const supervisorChartData = {
    labels: ['Active', 'Suspended'],
    datasets: [
      {
        data: [supervisorData.active, supervisorData.suspended],
        backgroundColor: ['#66BB6A', '#FF7043'],
        hoverBackgroundColor: ['#43A047', '#D84315'],
        borderWidth: 2,
      },
    ],
  };

  const siteChartData = {
    labels: ['Monitored', 'Unmonitored'],
    datasets: [
      {
        data: [siteData.monitored, siteData.unmonitored],
        backgroundColor: ['#29B6F6', '#FFCA28'],
        hoverBackgroundColor: ['#0288D1', '#FFA000'],
        borderWidth: 2,
      },
    ],
  };

  return (
    <Box m="1.5rem 2.5rem">
      {/* Header */}
      <FlexBetween>
        <Header title="ADMIN DASHBOARD" subtitle="Overview of Safesite Plus" />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      {/* Grid Layout */}
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: "span 12" },
        }}
      >
        {/* Stat Boxes */}
        <StatBox
          title="Total Supervisors"
          value={supervisorData.total}
          description="Number of supervisors in the system"
          icon={<Typography sx={{ fontSize: "30px", color: theme.palette.secondary[300] }}>👷‍♂️</Typography>}
        />
        <StatBox
          title="Active Supervisors"
          value={supervisorData.active}
          description="Supervisors currently active"
          icon={<Typography sx={{ fontSize: "30px", color: theme.palette.secondary[300] }}>✅</Typography>}
        />
        <StatBox
          title="Suspended Supervisors"
          value={supervisorData.suspended}
          description="Supervisors currently suspended"
          icon={<Typography sx={{ fontSize: "30px", color: theme.palette.secondary[300] }}>❌</Typography>}
        />
        <StatBox
          title="Total Sites"
          value={siteData.total}
          description="Total number of construction sites"
          icon={<Typography sx={{ fontSize: "30px", color: theme.palette.secondary[300] }}>🏗️</Typography>}
        />
        <StatBox
          title="Monitored Sites"
          value={siteData.monitored}
          description="Sites being actively monitored"
          icon={<Typography sx={{ fontSize: "30px", color: theme.palette.secondary[300] }}>📹</Typography>}
        />
        <StatBox
          title="Unmonitored Sites"
          value={siteData.unmonitored}
          description="Sites not being monitored"
          icon={<Typography sx={{ fontSize: "30px", color: theme.palette.secondary[300] }}>⚠️</Typography>}
        />

        {/* Charts */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              backgroundColor={theme.palette.background.alt}
              p="1.5rem"
              borderRadius="0.55rem"
            >
              <Typography variant="h6" gutterBottom>
                Supervisor Status
              </Typography>
              <Doughnut data={supervisorChartData} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              backgroundColor={theme.palette.background.alt}
              p="1.5rem"
              borderRadius="0.55rem"
            >
              <Typography variant="h6" gutterBottom>
                Site Monitoring Status
              </Typography>
              <Doughnut data={siteChartData} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
