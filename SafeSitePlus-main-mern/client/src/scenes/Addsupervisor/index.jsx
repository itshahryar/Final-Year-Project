import { useState , useEffect} from "react";
import { Box, Button, TextField, MenuItem ,IconButton, Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Addsupervisor = () => {
  const theme = useTheme();

  // State variables for the form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    siteAssigned: [],
    phone: "",
    alternateContact: "",
    alternateEmail: "",
    status: "active",
    
  });

  const [Allsites , setAllsites] = useState([]);

  const [selectedSite, setSelectedSite] = useState("");

  const [error, setError] = useState("");

  const fetchSites = async () => {
    console.log("Fetching sites...");
    try {
      const response = await axios.get("http://localhost:5000/Site/All");
      const result2 = response.data;
  
      console.log("Fetched sites:", result2);
  
      // Update state with the fetched sites
      setAllsites(result2); 

      console.log(Allsites + "are my sites total");
     
    } catch (error) {
      console.error("Error fetching sites:", error);
      setError("Failed to fetch sites");
    }
  };

  const handleAddSite = () => {
    if (selectedSite && !formData.siteAssigned.includes(selectedSite)) {
      setFormData({
        ...formData,
        siteAssigned: [...formData.siteAssigned, selectedSite],
      });
      setSelectedSite(""); // Clear selection after adding
    } else {
      alert("Site is already added or invalid");
    }
  };

  const handleRemoveSite = (siteId) => {
    setFormData({
      ...formData,
      siteAssigned: formData.siteAssigned.filter((id) => id !== siteId),
    });
  };

  const autopassword = ()=>{

  }


  useEffect(() => {
    fetchSites();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Submit form handler (to integrate with API)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form fields
    if (!formData.name || !formData.email || !formData.password || !formData.siteAssigned || !formData.alternateEmail) {
      setError("Please fill in all required fields.");
      return;
    }

    console.log("Your site ID is" + formData.siteAssigned);

    console.log(formData)

    try {
      // Send a POST request to the backend API to create a new supervisor
      // Replace the API URL with your actual endpoint
      const response = await fetch('http://localhost:5000/supervisor/Register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
       

         toast.success("SuperVisor Added Successfull ✅", {
            position: "top-right",
            autoClose: 3000,
            });
        // Reset form after submission
        setFormData({
          name: "",
          email: "",
          password: "",
          siteAssigned: [],
          phone: "",
          alternateContact: "",
          alternateEmail: "",
          status: "active",
        });

      } else {
        alert(result.message || "Error adding supervisor");
        toast.info("Error occured please try again!", {
          position: "top-right",
          autoClose: 3000,
          });
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Error adding supervisor");
      toast.error("Supervisor not Added ",{
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <h2>Add Supervisor</h2>

      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap="1rem" width="400px">
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />

<TextField
              select
              label="Select Site"
              value={selectedSite}
              onChange={(e) => setSelectedSite(e.target.value)}
              fullWidth
            >
              {Allsites.map((site) => (
              site.monitored === false && (
                <MenuItem key={site._id} value={site._id}>
                  {site.SiteName}
                </MenuItem>
              )
            ))}
            
            </TextField>

            <IconButton onClick={handleAddSite} color="primary">
              <AddCircleOutlineIcon />
            </IconButton>
      

          {/* Display Selected Sites */}
          <Box display="flex" flexWrap="wrap" gap="0.5rem">
            {formData.siteAssigned.map((siteId) => (
              <Chip
                key={siteId}
                label={Allsites.find((site) => site._id === siteId)?.SiteName || siteId}
                onDelete={() => handleRemoveSite(siteId)}
                deleteIcon={<DeleteIcon />}
              />
            ))}
          </Box>


          {/* <TextField
            select
            label="siteAssigned"
            name="siteAssigned"
            value={formData.siteAssigned}
            onChange={handleInputChange}
          >
         
  {Allsites.map((site) => (
    <MenuItem key={site._id} value={site._id}>
      {site.SiteName} 
    </MenuItem>
  ))}
          </TextField> */}

          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <TextField
            label="Alternate Contact"
            name="alternateContact"
            value={formData.alternateContact}
            onChange={handleInputChange}
          />
          <TextField
            label="Alternate Email"
            name="alternateEmail"
            type="email"
            value={formData.alternateEmail}
            onChange={handleInputChange}
            required
          />
          <TextField
            select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
            <MenuItem value="suspended">Suspended</MenuItem>
          </TextField>

          {error && <Box color="red">{error}</Box>}

          <Button type="submit" variant="contained" color="primary">
            Add Supervisor
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Addsupervisor;
