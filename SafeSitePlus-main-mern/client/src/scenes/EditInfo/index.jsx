import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Typography, MenuItem, IconButton, Chip, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from "@mui/material/styles";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditInfoForm = () => {
  const { id } = useParams();
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [supervisor, setSupervisor] = useState({
    name: '',
    email: '',
    phone: '',
    alternateEmail: '',
    alternateContact: '',
    status: '',
    siteAssigned: [], // Store selected site IDs
  });

  const [loading, setLoading] = useState(true);
  const [sites, setSites] = useState([]); // Store all available sites
  const [unmonitoredSites, setUnmonitoredSites] = useState([]); // Sites where monitored == false
  const [selectedSite, setSelectedSite] = useState(''); // Single selection before adding

  useEffect(() => {
    const fetchSupervisorData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/supervisor/supervisors/${id}`);
        setSupervisor(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching supervisor data:', error);
        setLoading(false);
      }
    };

    const fetchSites = async () => {
      try {
        // Fetch all sites
        const response = await axios.get('http://localhost:5000/Site/All');
        const allSites = response.data;

        // Filter sites where monitored == false
        const unmonitored = allSites.filter((site) => !site.monitored);
        setUnmonitoredSites(unmonitored);

        // Fetch supervisor's already assigned sites
        const response2 = await axios.get(`http://localhost:5000/Site/myAll/${id}`);
        const mySites = response2.data;

        // Set supervisor's existing sites
        setSupervisor((prev) => ({
          ...prev,
          siteAssigned: mySites.map((site) => site._id), // Store only site IDs
        }));

        // Set all sites
        setSites(allSites);
      } catch (error) {
        console.error('Error fetching sites:', error);
      }
    };

    fetchSupervisorData();
    fetchSites();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSupervisor((prev) => ({ ...prev, [name]: value }));
  };

  // Handle adding site to the array
  const handleAddSite = () => {
    if (selectedSite && !supervisor.siteAssigned.includes(selectedSite)) {
      setSupervisor((prev) => ({
        ...prev,
        siteAssigned: [...prev.siteAssigned, selectedSite],
      }));
      setSelectedSite('');
    }
  };

  // Handle removing a site from the array
  const handleRemoveSite = (siteId) => {
    setSupervisor((prev) => ({
      ...prev,
      siteAssigned: prev.siteAssigned.filter((id) => id !== siteId),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update supervisor data
      await axios.put(`http://localhost:5000/supervisor/edit/${id}`, supervisor);
      // console.log('Supervisor updated successfully');
     

      // Update monitored status of newly assigned sites
      for (const siteId of supervisor.siteAssigned) {
        await axios.put(`http://localhost:5000/Site/update/${siteId}`, {
          monitored: true,
        });
      }
      toast.success("Supervisor Updated Successfully", {
        position: "top-right",
        autoClose: 3000,
        });

      // Navigate back or show success message
      navigate('/dashboard/admin/updatesupervisor');
    } catch (error) {
      console.error('Error updating supervisor:', error);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Edit Supervisor Information</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Name" name="name" variant="outlined" fullWidth margin="normal" value={supervisor.name} onChange={handleInputChange} />
        <TextField label="Email" name="email" variant="outlined" fullWidth margin="normal" value={supervisor.email} onChange={handleInputChange} />
        <TextField label="Phone" name="phone" variant="outlined" fullWidth margin="normal" value={supervisor.phone} onChange={handleInputChange} />
        <TextField label="Alternate Contact" name="alternateContact" variant="outlined" fullWidth margin="normal" value={supervisor.alternateContact} onChange={handleInputChange} />
        <TextField label="Alternate Email" name="alternateEmail" variant="outlined" fullWidth margin="normal" value={supervisor.alternateEmail} onChange={handleInputChange} />
        
        <TextField select label="Status" name="status" value={supervisor.status} onChange={handleInputChange} fullWidth margin="normal">
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
          <MenuItem value="suspended">Suspended</MenuItem>
        </TextField>

        {/* Multi-select Site Assignment */}
        <Box display="flex" alignItems="center" gap={1} mt={2} mb={2}>
          <TextField
            select
            label="Assign Site"
            value={selectedSite}
            onChange={(e) => setSelectedSite(e.target.value)}
            fullWidth
            margin="normal"
          >
            {unmonitoredSites.map((site) => (
              <MenuItem key={site._id} value={site._id}>
                {site.SiteName}
              </MenuItem>
            ))}
          </TextField>
          <IconButton color="primary" onClick={handleAddSite}>
            <AddIcon />
          </IconButton>
        </Box>

        {/* Display selected sites */}
        <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
          {supervisor.siteAssigned.map((siteId) => {
            const site = sites.find((s) => s._id === siteId);
            return site ? (
              <Chip
                key={siteId}
                label={site.SiteName}
                onDelete={() => handleRemoveSite(siteId)}
                deleteIcon={<CloseIcon />}
                color="primary"
              />
            ) : null;
          })}
        </Box>

        <Button type="submit" variant="contained" color="primary">Save Changes</Button>
      </form>
    </Container>
  );
};

export default EditInfoForm;