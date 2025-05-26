import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, TextField, MenuItem, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Activate = () => {
  const [Mysites, setMysites] = useState([]);
  const [editableSite, setEditableSite] = useState(null); // Track the site being edited
  const navigate = useNavigate();
  const UserId = useSelector((state) => state.global.userId);

  // Fetch sites assigned to the supervisor
  const fetchYourSites = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/Site/myAll/${UserId}`);
      const allSites = response.data.map((site) => ({
        SiteID: site._id,
        SiteName: site.SiteName,
        SiteAddress: site.SiteAddress,
        City: site.City,
        Sensitivity: site.Sensitivity || "Low", // Default to "Low" if not provided
        Active: site.Active || false, // Default to false if not provided
        media: `http://localhost:8000/stream-video/${site.SiteName}.mp4`,
      }));
      setMysites(allSites);
    } catch (error) {
      console.error("Error fetching site data:", error);
    }
  };

  // Handle editing a site
  const handleEdit = (site) => {
    setEditableSite({ ...site }); // Set the site to be edited
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableSite((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Send updated data to the backend
      const response = await axios.put(
        `http://localhost:5000/Site/update/${editableSite.SiteID}`,
        {
          Sensitivity: editableSite.Sensitivity,
          Active: editableSite.Active === "true", // Convert string to boolean
        }
      );

      if (response.status === 200) {
        // Update the local state with the new data
        const updatedSites = Mysites.map((site) =>
          site.SiteID === editableSite.SiteID ? { ...site, ...editableSite } : site
        );
        toast.success(
          `Site Successfully ${editableSite.Active ? "Deactivated" : "Activated"}`, 
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
        setMysites(updatedSites);
        setEditableSite(null); // Close the edit form
      }
    } catch (error) {
      console.error("Error updating site:", error);
    }
  };

  useEffect(() => {
    fetchYourSites();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "linear-gradient(to bottom, #F59E0B, #FDE68A, #FEF3C7)",
        p: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          p: 6,
          bgcolor: "rgba(255, 255, 255, 0.3)",
          borderRadius: 2,
          boxShadow: 3,
          backdropFilter: "blur(10px)",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        {/* Welcome Section */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" fontWeight="bold" fontFamily="Poppins">
            Supervisor Sites
          </Typography>
          <Typography variant="h6" fontFamily="Dancing Script" color="text.secondary">
            Manage all your assigned sites and monitor their cameras here!
          </Typography>
        </Box>

        {/* Dynamic Sites Mapping */}
        {Mysites.map((site) => (
          <Card
            key={site.SiteID}
            sx={{
              mb: 4,
              boxShadow: 3,
              borderRadius: 2,
              bgcolor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              cursor: "pointer",
            }}
          >
            {/* Video Feed */}
            <Box>
              <div className="h-[550px]">
                <img src={`http://localhost:8000/stream-video/${site.SiteName}.mp4`} alt={site.SiteName} />
              </div>
            </Box>

            {/* Site Info */}
            <CardContent sx={{ bgcolor: "rgba(255, 255, 255, 0.9)", backdropFilter: "blur(5px)" }}>
              <Typography variant="h5" fontWeight="bold" color="black">
                {site.SiteName}
              </Typography>
              <Typography variant="body1" color="black" mt={1}>
                Address: {site.SiteAddress} | City: {site.City}
              </Typography>

              {/* Editable Fields (Only shown when editing) */}
              {editableSite?.SiteID === site.SiteID ? (
                <>
                  <TextField
                    select
                    label="Sensitivity"
                    name="Sensitivity"
                    value={editableSite.Sensitivity}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </TextField>

                  <TextField
                    select
                    label="Status"
                    name="Active"
                    value={editableSite.Active.toString()} // Convert boolean to string
                    onChange={handleChange}
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    <MenuItem value="true">Active</MenuItem>
                    <MenuItem value="false">Inactive</MenuItem>
                  </TextField>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{ mt: 2 }}
                  >
                    Save Changes
                  </Button>
                </>
              ) : (
                <>
                  <Typography variant="h6" fontWeight="bold" color="black" mt={2}>
                    Sensitivity: {site.Sensitivity}
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    sx={{ color: site.Active ? "green" : "red" }}
                  >
                    Status: {site.Active ? "Active" : "Inactive"}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit(site)}
                    sx={{ mt: 2 }}
                  >
                    Edit
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Activate;