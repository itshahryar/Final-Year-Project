import FlexBetween from "@components/FlexBetween";
import Header from "@components/Header";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie , Line  , Doughnut , Radar} from 'react-chartjs-2';

import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
  
} from "@mui/icons-material";

import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Grid
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "@components/BreakdownChart";
import OverviewChart from "@components/OverviewChart";
import StatBox from "@components/StatBox";
import { useGetDashboardQuery } from "@state/api";

const Dashboard2 = () => {
  const theme = useTheme();
  const [datas, setDatas] = useState([]);
    const isNonMediumScreens = useMediaQuery("(min-width:1200px)");

  const { data, isLoading } = useGetDashboardQuery();
  console.log("Dashboard:", data);


  const [supervisorData, setSupervisorData] = useState({
    total: 0,
    active: 0,
    suspended: 0,
    recentActivity: [], // Data for trends (optional)
  });



  const fetchLogged = async () => {
    try {
      const response = await axios.get('http://localhost:5000/supervisor/All');
      setDatas(response.data);

      const allSupervisors = response.data;


      const updatedSupervisorData = {
        total: allSupervisors.length,
        active: 0,
        suspended: 0,
      };

      

      // Count active and suspended supervisors
      allSupervisors.forEach((supervisor) => {
        if (supervisor.status === 'active') {
          updatedSupervisorData.active++;
        } else if (supervisor.status === 'suspended') {
          updatedSupervisorData.suspended++;
        }
      });

      // Update state with the processed data
      setSupervisorData(updatedSupervisorData);
      console.log("my stats" + updatedSupervisorData.active)
      // console.log("length is " + response.data.length);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchLogged();
  }, []);


  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },

    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },

    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  const Doughnutdata = {
    labels: ['Active', 'Suspended'],
    datasets: [
      {
        data: [
          supervisorData.active,
          supervisorData.suspended,
        ],
        backgroundColor: ['#66BB6A', '#FF7043'], // Colors for each slice
        hoverBackgroundColor: ['#43A047', '#D84315'],
        borderWidth: 2,
      },
    ],
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

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
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total Supervisors"
          // value={data && data.totalCustomers}
          value={datas.length}
          increase="+14%"
          description="Since last month"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

          <Grid item xs={12} md={6}>
          <Typography variant="h6">Supervisors Status</Typography>
          <Doughnut data={Doughnutdata} />
        </Grid>
        <StatBox
          title="Sales Today"
          value={data && data.todayStats.totalSales}
          increase="+21%"
          description="Since last month"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales" isDashboard={true} />
        </Box>
        <StatBox
          title="Monthly Sales"
          value={data && data.thisMonthStats.totalSales}
          increase="+5%"
          description="Since last month"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Yearly Sales"
          value={data && data.yearlySalesTotal}
          increase="+43%"
          description="Since last month"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data && data.transactions) || []}
            columns={columns}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Sales By Category
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Breakdown of real states and information via category for revenue
            made for this year and total sales.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard2;
