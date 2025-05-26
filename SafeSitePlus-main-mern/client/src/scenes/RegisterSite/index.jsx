import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Grid, Card, CardContent, Select , MenuItem } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const RegisterSite = () => {
  const [formData, setFormData] = useState({
    siteId: '',
    siteName: '',
    address: '',
    city: '',
    Sensitivity: 'Low',
    lat: '',
    long: '',
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.siteId) newErrors.siteId = 'Site ID is required';
    if (!formData.siteName) newErrors.siteName = 'Site Name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    // if (!formData.lat) newErrors.lat = 'Latitude is required';
    // if (!formData.long) newErrors.long = 'Longitude is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    console.log('Form Data:', formData.Sensitivity);
    e.preventDefault();
    if (validateForm()) {
      // Submit the data to the backend
      // Use axios or fetch to send formData to the backen
      try {
        const response = await axios.post('http://localhost:5000/Site/Register', {formData});
        const result= await response.json();
      if (result.ok) {
        toast.success("Supervisor Updated Successfully", {
          position: "top-right",
          autoClose: 3000,
          });
        // alert("Site added successfully")
      }
        
      } catch (e) {
        console.error(e);
        toast.error("Site not Added Successfully" ,e, {
          position: "top-right",
          autoClose: 3000,
          });
      }
    
      console.log('Form submitted:', formData);
      // Reset the form on success
      setFormData({
        siteId: '',
        siteName: '',
        address: '',
        city: '',
        lat: '',
        long: '',
        Sensitivity: 'Low',
      });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Register Site
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Site ID"
                  name="siteId"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.siteId}
                  onChange={handleChange}
                  error={Boolean(errors.siteId)}
                  helperText={errors.siteId}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Site Name"
                  name="siteName"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.siteName}
                  onChange={handleChange}
                  error={Boolean(errors.siteName)}
                  helperText={errors.siteName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  name="address"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.address}
                  onChange={handleChange}
                  error={Boolean(errors.address)}
                  helperText={errors.address}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="City"
                  name="city"
                  variant="outlined"
                  fullWidth
                  value={formData.city}
                  onChange={handleChange}
                />
                </Grid>

                <Grid item xs={6}>

                <TextField
            select
            label="Sensitivity"
            name="Sensitivity"
            value={formData.Sensitivity}
            onChange={handleChange}
          >
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </TextField>

          </Grid>


              

              <Grid item xs={6}>
                <TextField
                  label="Latitude"
                  name="lat"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.lat}
                  onChange={handleChange}
                  error={Boolean(errors.lat)}
                  helperText={errors.lat}
                  type="number"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Longitude"
                  name="long"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.long}
                  onChange={handleChange}
                  error={Boolean(errors.long)}
                  helperText={errors.long}
                  type="number"
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Register Site
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default RegisterSite;