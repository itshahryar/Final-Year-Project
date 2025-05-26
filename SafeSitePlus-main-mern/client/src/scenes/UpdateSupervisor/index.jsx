import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, FormControl, Select, MenuItem, InputLabel, Avatar, Alert } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { BlockOutlined, DeleteForeverOutlined, EditAttributesOutlined } from '@mui/icons-material';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const UpdateSupervisor = () => {
  const navigate = useNavigate(); 
  const [datas, setDatas] = useState([]);
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterstatus, setFilterstatus] = useState('');

  const formatLogTime = (log) => {
    const date = new Date(log.createdAt);
    return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
  };

  const SuspendAcc = async (id) => {
    try {
      console.log("Account suspend hony laga");
  
      const response = await axios.put(`http://localhost:5000/supervisor/suspend/${id}`);
  
      if (response.status === 200) {
        toast.success("Supervisor Account Suspended Successfully", {
          position: "top-right",
          autoClose: 3000,
          });
        console.log("Account suspended Successfully");
  
        // Update state to toggle status
        setDatas((prevDatas) =>
          prevDatas.map((data) =>
            data._id === id
              ? { ...data, status: data.status === "suspended" ? "active" : "suspended" }
              : data
          )
        );
  
        setFilteredDatas((prevFilteredDatas) =>
          prevFilteredDatas.map((data) =>
            data._id === id
              ? { ...data, status: data.status === "suspended" ? "active" : "suspended" }
              : data
          )
        );
      }
    } catch (error) {
      console.error("Failed to suspend account:", error);
      toast.error("Account not Suspended  ", {
        position: "top-right",
        autoClose: 3000,
        });
    }
  };
  



const EditInfo = (id) => {
  console.log("ye chalaa");
  //// Hook to programmatically navigate
  
  // Navigate to /edit with the id as part of the URL
  navigate(`editsupervisor/${id}`);
};

  

  const Deletesupervisor = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/supervisor/Delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setDatas((prevDatas) => prevDatas.filter((data) => data._id !== id));
        setFilteredDatas((prevFilteredDatas) => prevFilteredDatas.filter((data) => data._id !== id));
        toast.success("Supervisor Deleted Successfully", {
          position: "top-right",
          autoClose: 3000,
          });
        console.log("Supervisor deleted successfully");
      } else {
        console.error("Failed to delete supervisor");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("Supervisor Not Deleted ", {
        position: "top-right",
        autoClose: 3000,
        });
    }
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={params.row.name} sx={{ marginRight: 1 }}>{params.row.name.charAt(0)}</Avatar>
          {params.row.name}
        </div>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 300,
      renderCell: (params) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          {/* Edit Button */}
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditAttributesOutlined />}
            onClick={() => EditInfo(params.row._id)}
          >
            Edit
          </Button>
    
          {/* Delete Button */}
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteForeverOutlined />}
            onClick={() => Deletesupervisor(params.row._id)}
          >
            Delete
          </Button>
    
          {/* Suspend Button */}
          <Button
            variant="contained"
            color="warning"
            startIcon={<BlockOutlined />}
            onClick={() => SuspendAcc(params.row._id)}
          >
            {params.row.status === 'suspended' ? 'Unsuspend' : 'Suspend'} 
          </Button>
        </div>
      ),
    }
    

  ];

  const fetchLogged = async () => {
    try {
      const response = await axios.get('http://localhost:5000/supervisor/All');
      setDatas(response.data);
      setFilteredDatas(response.data);
    } catch (error) {
      console.error("Failed to fetch supervisors:", error);
    }
  };

  useEffect(() => {
    fetchLogged();
  }, []);

  useEffect(() => {
    let filtered = datas;
    if (searchQuery) {
      filtered = filtered.filter((data) =>
        data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.status.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filterstatus) {
      filtered = filtered.filter((data) => data.status === filterstatus);
    }
    setFilteredDatas(filtered);
  }, [searchQuery, filterstatus, datas]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 4 }}>Audit Logging</Typography>

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
          <MenuItem value=""><em>All</em></MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </Select>
      </FormControl>

      <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
        <DataGrid
          rows={filteredDatas}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </Container>
  );
};

export default UpdateSupervisor;
