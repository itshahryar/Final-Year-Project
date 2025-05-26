// import React, { useEffect, useState } from 'react';
// import { Container, TextField, Button, Typography, MenuItem  } from '@mui/material';
// import axios from 'axios';

// import { signOut , remType} from "@state";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch , useSelector } from "react-redux";

// const UpdateProfile = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   // const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const type = useSelector((state) => state.global.type);


  
//   const [supervisor, setSupervisor] = useState({
//     name: '',
//     status: '',
//     email: '',
//     status: '' ,// You can add more fields as needed
//     phone: '' ,// You can add more fields as needed
//     alternateEmail: '' ,
//     alternateContact: '',// You can add more fields as needed
//   });
//   const [loading, setLoading] = useState(true);

//   // Fetch supervisor's info based on the ID when the component mounts
//   useEffect(() => {
//     const fetchSupervisorData = async () => {
//       console.log(id);
//       try {
//         const response = await axios.get(`http://localhost:5000/supervisor/supervisors/${id}`);
//         setSupervisor(response.data); // Assuming API returns data with fields like 'name' and 'status'
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching supervisor data:', error);
//         setLoading(false);
//       }
//     };

//     fetchSupervisorData();
//   }, [id]);

//   // Handle input field changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setSupervisor((prevSupervisor) => ({
//       ...prevSupervisor,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Make a PUT request to update the supervisor's info
//       const response = await axios.put(`http://localhost:5000/supervisor/edit/${id}`, supervisor);
//       console.log('Supervisor updated:', response.data);
//       // Add a success message or redirect after update if needed
//     } catch (error) {
//       console.error('Error updating supervisor:', error);
//     }
//   };

//   if (loading) return <Typography>Loading...</Typography>;

//   return (
//     <Container maxWidth="sm">
//       <Typography variant="h4" gutterBottom>Edit Supervisor Information</Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Name"
//           name="name"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           value={supervisor.name}
//           onChange={handleInputChange}
//         />
//         <TextField
//           label="Email"
//           name="email"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           value={supervisor.email}
//           onChange={handleInputChange}
//         />
//           <TextField
//             label="Phone"
//             name="phone"
//             variant="outlined"
          
//             value={supervisor.phone}
//             onChange={handleInputChange}
//           />
//           <TextField
//             label="Alternate Contact"
//             name="alternateContact"
//             value={supervisor.alternateContact}
//             onChange={handleInputChange}
//           />
//            <TextField
//           label="alternateContact"
//           name="alternateContact"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           value={supervisor.alternateContact}
//           onChange={handleInputChange}
//         />

          
//          {/* <TextField
//             select
//             label="Sites"
//             name="Sites"
//             value={supervisor.siteAssigned}
//             onChange={handleInputChange}
//               fullWidth
//             margin="normal"
//           >
//             <MenuItem value="active">Active</MenuItem>
//             <MenuItem value="inactive">Inactive</MenuItem>
//             <MenuItem value="suspended">Suspended</MenuItem>
//           </TextField> */}
         


//          <TextField
//             select
//             label="Status"
//             name="status"
//             value={supervisor.status}
//             onChange={handleInputChange}
//               fullWidth
//             margin="normal"
//           >
//             <MenuItem value="active">Active</MenuItem>
//             <MenuItem value="inactive">Inactive</MenuItem>
//             <MenuItem value="suspended">Suspended</MenuItem>
//           </TextField>

//         {/* Add more input fields as required */}
//         <Button type="submit" variant="contained" color="primary">
//           Save Changes
//         </Button>
//       </form>
//     </Container>
//   );
// };

// export default UpdateProfile;

import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Typography, MenuItem } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const UpdateProfile = () => {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const type = useSelector((state) => state.global.type);

  const [supervisor, setSupervisor] = useState({
    name: '',
    email: '',
    phone: '',
    alternateEmail: '',
    alternateContact: '',
    status: '',
    siteAssigned: '', // New field for site assignment
  });
  const [loading, setLoading] = useState(true);
  const [sites, setSites] = useState([]); // Store available sites

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
        const response = await axios.get('http://localhost:5000/sites'); // API for fetching sites
        console.log(response.data);
        setSites(response.data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/supervisor/edit/${id}`, supervisor);
      console.log('Supervisor updated successfully');
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
        
        <TextField select label="Status" name="status" value={supervisor.status} onChange={handleInputChange} fullWidth margin="normal">
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
          <MenuItem value="suspended">Suspended</MenuItem>
        </TextField>
        
        {/* Assign Site Dropdown */}
        <TextField select label="Assign Site" name="siteAssigned" value={supervisor.siteAssigned} onChange={handleInputChange} fullWidth margin="normal">
          {sites.map((site) => (
            <MenuItem key={site._id} value={site._id}>{site.name}</MenuItem>
          ))}
        </TextField>
        
        <Button type="submit" variant="contained" color="primary">Save Changes</Button>
      </form>
    </Container>
  );
};

export default UpdateProfile;

