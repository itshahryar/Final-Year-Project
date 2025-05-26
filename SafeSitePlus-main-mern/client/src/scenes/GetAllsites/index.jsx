import React, { useEffect, useState } from 'react';
import { Container, Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow, TextField, Button, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Avatar, MenuItem, Select, InputLabel, FormControl ,   useTheme, } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Search } from '@mui/icons-material';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";

const GetAllsites = () => {
  const theme = useTheme();
  const [filter, setFilter] = useState('');
  const [datas, setDatas] = useState([]);
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterstatus, setFilterstatus] = useState('');

  const formatLogTime = (log) => {
    const date = new Date(log.createdAt);
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
    return formattedDate;
  };

  const downloadExcel = () => {

    console.log("about to download")
    const filteredDataWithoutPassword = filteredDatas.map(({ password, ...rest }) => rest);
    const worksheet = XLSX.utils.json_to_sheet(filteredDataWithoutPassword);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Supervisors');
  
    XLSX.writeFile(workbook, 'supervisors.xlsx');
    toast.success("Sites List Excel downloaded!", {
      position: "top-right",
      autoClose: 3000,
      });
  };


  // for custom headers

  // const downloadExcel = () => {
  //   // Step 1: Filter out the 'password' field from each object
  //   const filteredDataWithoutPassword = filteredDatas.map(({ password, ...rest }) => rest);
  
  //   // Step 2: Convert to worksheet with custom headers
  //   const worksheet = XLSX.utils.json_to_sheet(filteredDataWithoutPassword);
  
  //   // Step 3: Customize headers if needed
  //   const headers = ["Name", "Status", "Created At"]; // Custom headers as per your data fields
  //   XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A1" });
  
  //   // Step 4: Create workbook and append the worksheet
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Supervisors');
  
  //   // Step 5: Save file
  //   XLSX.writeFile(workbook, 'supervisors.xlsx');
  // };
  



const downloadPDF = () => {
  const doc = new jsPDF();
  doc.text("Site Table", 20, 10);  // 20, 10 are cordinates
  doc.autoTable({
    head: [['Site ID', 'Site Name' , 'Sensitivity' , 'Assigned']],
    body: filteredDatas.map(data => [data.SiteID, data.SiteName , data.Sensitivity,data.monitored==true ? 'Assined' : 'Not Assigned']),
  });
  doc.save('My Sites.pdf');
  toast.success("Sites List  PDF downloaded!", {
    position: "top-right",
    autoClose: 3000,
    });
};



  const columns = [
    {
      field: ' SiteID',
      headerName: ' SiteID',
      width: 200,
      headerClassName: 'bg-primary text-white',
      cellClassName: 'bg-light',
      sortable: true,
      renderCell: (params) => (
        <div className="d-flex align-items-center">
          <Avatar alt={params.row.SiteID} className="me-2">
            {params.row.name.charAt(0)}
          </Avatar>
          <div>{params.row.name}</div>
        </div>
      ),
    },
    {
      field: ' SiteAddress',
      headerName: 'Status',
      width: 150,
      headerClassName: 'bg-primary text-white',
      cellClassName: 'bg-light',
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      headerClassName: 'bg-primary text-white',
      cellClassName: 'bg-light',
      renderCell: () => (
        <Button variant="contained" startIcon={<EditIcon />} ></Button>
      ),
    },
  ];

  const fetchLogged = async () => {
    try {
      const response = await axios.get('http://localhost:5000/Site/All');
      setDatas(response.data);
      setFilteredDatas(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchLogged();
  }, []);

  useEffect(() => {
    let filtered = datas;

    if (searchQuery) {
      filtered = filtered.filter((data) =>
        data.SiteID.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.SiteName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterstatus) {
      filtered = filtered.filter((data) => data.Sensitivity === filterstatus);
    }

    setFilteredDatas(filtered);
  }, [searchQuery, filterstatus, datas]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 4 }}>ALL SITES</Typography>
      <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "12px",
              fontWeight: "bold",
              padding: "10px 20px",
            
            }}
            onClick={downloadExcel}
          >
      <DownloadOutlined sx={{ mr: "10px" }} />
     
            Download Reports as EXCEL
          </Button>

          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "12px",
              fontWeight: "bold",
              padding: "10px 20px",
            
            }}
            onClick={downloadPDF}
          >
      <DownloadOutlined sx={{ mr: "10px" }} />
     
            Download Reports as PDF
          </Button>

      <TextField
        label="Filter by User or Status"
        variant="outlined"
        fullWidth
        sx={{ mb: 4 }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <FormControl variant="outlined" size="small" sx={{ mb: 4 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={filterstatus}
          onChange={(e) => setFilterstatus(e.target.value)}
          label="Status"
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </Select>
      </FormControl>

      <Card>
        <CardContent>
          <Typography variant="h6">Activity Logs</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Site ID</TableCell>
                <TableCell>Site Name</TableCell>
                <TableCell>Sensitivity</TableCell>
              
                <TableCell>SiteMonitered</TableCell>
              
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDatas.map((log, index) => (
                <TableRow key={index}>
                  <TableCell>{log.SiteID}</TableCell>
                  <TableCell>{log.SiteName}</TableCell>
                  <TableCell>{log.Sensitivity}</TableCell>
                  <TableCell>{log.monitored === false ? "Not Assigned" : "Assigned"}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    
    </Container>
  );
};

export default GetAllsites;
