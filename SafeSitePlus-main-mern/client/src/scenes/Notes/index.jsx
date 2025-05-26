// import React, { useState, useEffect } from 'react';
// import { Grid, Card, CardContent, Typography, IconButton, Modal, TextField, Button } from '@mui/material';
// import { Edit, Delete, Add } from '@mui/icons-material';
// import axios from 'axios';

// const NotesComponent = () => {
//   const [notes, setNotes] = useState([]);  // State to hold the notes
//   const [open, setOpen] = useState(false);  // State to manage modal visibility
//   const [newNote, setNewNote] = useState({ title: '', content: '', priority: 'Medium', dueDate: '', isImportant: false });  // State for new note form
//   const supervisorId = "675c24c6d8670f67b459203c"; // Use the provided supervisorId

//   // Fetch all notes for the supervisor
//   const fetchAll = async () => {
//     console.log("fetch notes");
//     try {
//       const response = await axios.get(`http://localhost:5000/Notes/notes/${supervisorId}`);
//       setNotes(response.data);  // Assuming the response contains the notes array
//     } catch (error) {
//       console.error("Error fetching notes:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAll();  // Fetch notes on component mount
//   }, []);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const handleAddNote = async () => {
//     console.log("dasdsadsa")
//     try {
//       const response = await axios.post('http://localhost:5000/Note/notes', {
//         supervisorId,
//         title: newNote.title,
//         content: newNote.content,
//         priority: newNote.priority,
//         dueDate: newNote.dueDate,
//         isImportant: newNote.isImportant,
//       });
  
//       // After the note is added, update the state
//       setNotes([...notes, response.data.data]);  // Assuming response.data.data contains the added note
//       setNewNote({ title: '', content: '', priority: 'Medium', dueDate: '', isImportant: false });
//       handleClose();
//     } catch (error) {
//       console.error("Error adding note:", error);
//     }
//   };
  

//   const handleEdit = (id) => {
//     // Handle note editing, show modal with existing content
//     const noteToEdit = notes.find(note => note._id === id);
//     setNewNote({
//       title: noteToEdit.title,
//       content: noteToEdit.content,
//       priority: noteToEdit.priority,
//       dueDate: noteToEdit.dueDate,
//       isImportant: noteToEdit.isImportant,
//     });
//     handleOpen();
//   };

//   const handleDelete = async (id) => {
//     try {
//       // Delete note by ID
//       await axios.delete(`Note/notes/${id}`);
//       const updatedNotes = notes.filter(note => note._id !== id);
//       setNotes(updatedNotes);
//     } catch (error) {
//       console.error("Error deleting note:", error);
//     }
//   };

//   return (
//     <div>
//       {/* Add New Note Button */}
//       <IconButton onClick={handleOpen} color="primary" style={{ marginBottom: '20px' }}>
//         <Add />
//       </IconButton>

//       {/* Notes Grid */}
//       <Grid container spacing={3}>
//         {notes.map(note => (
//           <Grid item xs={12} sm={6} md={4} key={note._id}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6">{note.title}</Typography>
//                 <Typography variant="body2">{note.content}</Typography>

//                 {/* Action Icons */}
//                 <div style={{ marginTop: '10px' }}>
//                   <IconButton onClick={() => handleEdit(note._id)} color="primary">
//                     <Edit />
//                   </IconButton>
//                   <IconButton onClick={() => handleDelete(note._id)} color="secondary">
//                     <Delete />
//                   </IconButton>
//                 </div>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Modal for Adding/Editing Notes */}
//       <Modal open={open} onClose={handleClose}>
//         <div style={modalStyle}>
//           <TextField
//             label="Title"
//             value={newNote.title}
//             onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
//             fullWidth
//             style={{ marginBottom: '10px' }}
//           />
//           <TextField
//             label="Content"
//             value={newNote.content}
//             onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
//             fullWidth
//             multiline
//             rows={4}
//             style={{ marginBottom: '10px' }}
//           />
//           <TextField
//             label="Priority"
//             value={newNote.priority}
//             onChange={(e) => setNewNote({ ...newNote, priority: e.target.value })}
//             fullWidth
//             select
//             SelectProps={{
//               native: true,
//             }}
//             style={{ marginBottom: '10px' }}
//           >
//             <option value="Low">Low</option>
//             <option value="Medium">Medium</option>
//             <option value="High">High</option>
//           </TextField>
//           <TextField
//             label="Due Date"
//             type="date"
//             value={newNote.dueDate}
//             onChange={(e) => setNewNote({ ...newNote, dueDate: e.target.value })}
//             fullWidth
//             style={{ marginBottom: '10px' }}
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//           <TextField
//             label="Important"
//             type="checkbox"
//             checked={newNote.isImportant}
//             onChange={(e) => setNewNote({ ...newNote, isImportant: e.target.checked })}
//             style={{ marginBottom: '10px' }}
//           />
//           <Button variant="contained" color="primary" onClick={handleAddNote}>
//             {newNote._id ? 'Save Changes' : 'Add Note'}
//           </Button>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// const modalStyle = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   backgroundColor: 'white',
//   padding: '20px',
//   boxShadow: 24,
//   maxWidth: '500px',
//   width: '100%',
// };

// export default NotesComponent;

// import React, { useState  , useEffect} from 'react';
// import {
//   Grid, Card, CardContent, Typography, IconButton, Modal, TextField, Button, MenuItem, Select, FormControl, InputLabel, Fab, Box
// } from '@mui/material';
// import { Edit, Delete, Add, Done, FilterList, PushPin } from '@mui/icons-material';
// import { format } from 'date-fns';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
// import { useSelector } from 'react-redux';

// const NotesComponent = () => {
//   const [open, setOpen] = useState(false);
//   const [addTaskOpen, setAddTaskOpen] = useState(false);
//   const [selectedNote, setSelectedNote] = useState(null);
//   const [selectedFilter, setSelectedFilter] = useState('All');
//   const [newCategory, setNewCategory] = useState('');
//   const [submitted, setSubmitted] = useState(false); // Track if form was submitted

//   const UserId = useSelector((state) => state.global.userId);
  
//   const [notes, setNotes] = useState([
//     { id: 1, title: 'Complete Report', content: 'Finalize the monthly site report', priority: 'High', category: 'Work', done: false, createdAt: new Date() },
//     { id: 2, title: 'Meeting with Team', content: 'Discuss safety measures', priority: 'Medium', category: 'Meetings', done: false, createdAt: new Date() },
//     { id: 3, title: 'Check Equipment', content: 'Inspect tools and machines', priority: 'Low', category: 'Inspection', done: false, createdAt: new Date() }
//   ]);

//   // const [notes , setNotes] =useState([]);

//   const [newTask, setNewTask] = useState({

//     title: "",
//     content: "",
//     category: "", // Initially empty
//     priority: "",
//     dueDate:"",
//     done: false
//   });
//   useEffect(() => {

//   const fetchNotes = async () => {
//     try {
//       console.log(" i will fetch all ")
//       const response = await axios.get(`http://localhost:5000/Notes/getMyNotes/${UserId}`);
//       const myNotes = response.data; // Assuming API returns an array of notes
  
//       console.log("Fetched Notes:", myNotes);
  
//       // Update state with the received notes
//       setNotes(myNotes);
      
//     } catch (error) {
//       console.error("Error fetching notes:", error);
//     }
//   };
  
  

//     fetchNotes();
//   }, []);

//   const handleOpen = (note) => {
//     setSelectedNote(note);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setSelectedNote(null);
//     setOpen(false);
//   };

//   const handleUpdateNote = () => {
//     setNotes(notes.map(n => (n.id === selectedNote.id ? selectedNote : n)));
//     toast.info("Task updated!", {
//       position: "top-right",
//       autoClose: 3000,
//     });
//     handleClose();
//   };  

//   const handleSubmit = () => {
//     setSubmitted(true);
  
//     // Determine the category (either selected or newly entered)
//     const finalCategory = newCategory || newTask.category;
  
//     // Proceed to add the task
//     handleAddTask(finalCategory);
//   };  

//   const handleDelete = () => {
//     setNotes(notes.filter(note => note.id !== selectedNote.id));
//     toast.error("Task deleted!", {
//       position: "top-right",
//       autoClose: 3000,
//     });
//     handleClose();
//   };  

//   const handleMarkDone = () => {
//     setNotes(notes.map(note => 
//       (note.id === selectedNote.id ? { ...note, done: !note.done } : note)
//     ));
  
//     toast.success(selectedNote?.done ? "Marked as Pending!" : "Task Completed! ✅", {
//       position: "top-right",
//       autoClose: 3000,
//     });
  
//     handleClose();
//   };  

//   const handleAddTask = (finalCategory) => {
//     setNotes([
//       ...notes,
//       {
//         ...newTask,
//         category: finalCategory, // Use selected or new category
//         id: Date.now(),
//         createdAt: new Date().toISOString()
//       }
//     ]);
  
//     toast.success("Task added successfully!", {
//       position: "top-right",
//       autoClose: 3000,
//     });
  
//     // Reset form fields
//     setNewTask({ title: '', content: '', priority: 'Low', category: '', done: false });
//     setNewCategory('');
//     setAddTaskOpen(false);
//   };  

//   const uniqueCategories = ['All', ...new Set(notes.map(note => note.category))];

//   const filteredNotes = notes.filter(note => {
//     if (selectedFilter === 'Pending') return !note.done;
//     if (selectedFilter === 'Done') return note.done;
//     return selectedFilter === 'All' || note.category === selectedFilter;
//   });
  

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         bgcolor: "linear-gradient(to bottom, #F59E0B, #FDE68A, #FEF3C7)",
//         p: 4,
//       }}
//     >
//       <Box
//         sx={{
//           p: 6,
//           bgcolor: "rgba(255, 255, 255, 0.3)",
//           borderRadius: 2,
//           boxShadow: 3,
//           backdropFilter: "blur(10px)",
//         }}
//       >
//         {/* Title Bar */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mb: 3,
//           }}
//         >
//         <Box textAlign="">
//           <Typography variant="h4" fontWeight="bold" fontFamily="Poppins">
//             Notes Hub!
//           </Typography>
//           <Typography
//             variant="h6"
//             fontFamily="Dancing Script"
//             color="text.secondary"
//           >
//           Stay organized and lead with confidence! Your tasks and notes are the key to a productive day.
//           </Typography>
//         </Box>
  
//           {/* Filter Dropdown */}
//           <FormControl sx={{ minWidth: 150 }}>
//             <InputLabel>Filter</InputLabel>
//             <Select
//               value={selectedFilter}
//               onChange={(e) => setSelectedFilter(e.target.value)}
//               startAdornment={<FilterList />}
//             >
//               <MenuItem value="All">All</MenuItem>
//               <MenuItem value="Pending">Pending</MenuItem>
//               <MenuItem value="Done">Done</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>
  
//         {/* Categories Banner */}
//         <Box
//           sx={{
//             display: "flex",
//             gap: 2,
//             overflowX: "auto",
//             mb: 3,
//             p: 2,
//             bgcolor: "#e0f2f1",
//             borderRadius: 2,
//           }}
//         >
//           {uniqueCategories.map((category, index) => (
//             <Button
//               key={index}
//               variant={selectedFilter === category ? "contained" : "outlined"}
//               color="primary"
//               sx={{
//                 color: selectedFilter === category ? "#fff" : "#000",
//                 bgcolor: selectedFilter === category ? "#00796b" : "transparent",
//                 borderColor: "#00796b",
//               }}
//               onClick={() => setSelectedFilter(category)}
//             >
//               {category}
//             </Button>
//           ))}
//         </Box>
  
//         {/* Notes Grid */}
//         <Grid container spacing={3}>
//           {filteredNotes.map((note) => (
//             <Grid item xs={12} sm={6} md={4} key={note.id}>
//       <Card
//         onClick={() => handleOpen(note)}
//         sx={{
//           bgcolor: note.done ? "#a5d6a7" : "#fff176",
//           cursor: "pointer",
//           position: "relative", // Ensures absolute positioning of pin
//           borderRadius: "10px",
//           boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.1)", // Light shadow for a professional look
//         }}
//       >
//                         {/* Pin Icon (Sticky Note Effect) */}
//         <PushPin
//           sx={{
//             position: "absolute",
//             top: 8,
//             right: 8,
//             color: "black",
//             transform: "rotate(-20deg)",
//             fontSize: "1.5rem",
//           }}
//         />
//                 <CardContent>
//                   {/* Title */}
//                   <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
//                     {note.title}
//                   </Typography>
  
//                   {/* Category & Priority */}
//                   <Typography variant="body2" sx={{ color: "gray", fontSize: "0.9rem" }}>
//                     📌 {note.category} | ⚡ {note.priority}
//                   </Typography>
  
//                   {/* Truncated Content */}
//                   <Typography variant="body2" sx={{ mt: 1, color: "black" }}>
//                     {note.content.length > 30 ? `${note.content.slice(0, 30)}...` : note.content}
//                   </Typography>
  
//                   {/* Date */}
//                   <Typography variant="caption" sx={{ color: "gray", fontSize: "0.8rem", display: "block", mt: 1 }}>
//                     {format(new Date(note.createdAt), "dd/MM/yyyy hh:mm a")}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
  
//               {/* Floating Add Task Button */}
//           <Fab
//             color="primary"
//             sx={{ position: "fixed", bottom: 20, right: 20 }}
//             onClick={() => setAddTaskOpen(true)}
//           >
//             <Add />
//           </Fab>
//         </Box>
  
//         {/* Modal for Adding New Task */}
//         <Modal open={addTaskOpen} onClose={() => setAddTaskOpen(false)}>
//           <Box sx={modalStyle}>
//           <Typography variant="h5" align="center" sx={{ mb: 2, fontWeight: "bold", color: "black" }}>
//             ➕ Add New Task
//           </Typography>
  
//           <TextField 
//   label="Title" 
//   value={newTask.title} 
//   onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} 
//   fullWidth 
//   sx={{ mb: 2, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "black" }, "&:hover fieldset": { borderColor: "black" }, "&.Mui-focused fieldset": { borderColor: "black" } } }} 
//   InputProps={{ style: { color: "black" } }} 
//   InputLabelProps={{ style: { color: "black" } }} 
// />

// <TextField 
//   label="Content" 
//   value={newTask.content} 
//   onChange={(e) => setNewTask({ ...newTask, content: e.target.value })} 
//   fullWidth 
//   multiline 
//   rows={3} 
//   sx={{ mb: 2, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "black" }, "&:hover fieldset": { borderColor: "black" }, "&.Mui-focused fieldset": { borderColor: "black" } } }} 
//   InputProps={{ style: { color: "black" } }} 
//   InputLabelProps={{ style: { color: "black" } }} 
// />
  
// <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
//   <FormControl 
//     fullWidth 
//     disabled={!!newCategory}
//     sx={{ 
//       "& .MuiOutlinedInput-root": {
//         "& fieldset": { borderColor: "black" }, // Default border color
//         "&:hover fieldset": { borderColor: "black" }, // Hover effect
//         "&.Mui-focused fieldset": { borderColor: "black" } // Focus effect
//       },
//       "& .MuiSvgIcon-root": { color: "black" } // Black dropdown arrow
//     }}
//   >
//     <Select 
//       value={newTask.category} 
//       onChange={(e) => setNewTask({ ...newTask, category: e.target.value })} 
//       displayEmpty
//       sx={{ color: "black" }} // Text color
//     >
//       <MenuItem value="">Select a Category</MenuItem>
//       {uniqueCategories.map((cat, index) => cat !== "All" && (
//         <MenuItem key={index} value={cat}>{cat}</MenuItem>
//       ))}
//     </Select>
//   </FormControl>

//   <TextField 
//     label="Or Create New Category" 
//     value={newCategory} 
//     onChange={(e) => setNewCategory(e.target.value)} 
//     fullWidth 
//     disabled={!!newTask.category} 
//     sx={{
//       "& .MuiOutlinedInput-root": {
//         "& fieldset": { borderColor: "black" },
//         "&:hover fieldset": { borderColor: "black" },
//         "&.Mui-focused fieldset": { borderColor: "black" },
//       },
//       "& .MuiInputBase-root.Mui-disabled": { color: "lightgray" }, // Light gray text when disabled
//       "& .MuiInputLabel-root.Mui-disabled": { color: "gray" } // Light gray label when disabled
//     }}
//     InputProps={{ style: { color: "black" } }} 
//     InputLabelProps={{ style: { color: "black" } }}
//   />
// </Box>
  
// <FormControl 
//   fullWidth 
//   sx={{ 
//     mb: 2, 
//     "& .MuiOutlinedInput-root": {
//       "& fieldset": { borderColor: "black" }, // Default border color
//       "&:hover fieldset": { borderColor: "black" }, // Hover effect
//       "&.Mui-focused fieldset": { borderColor: "black" } // Focus effect
//     },
//     "& .MuiSvgIcon-root": { color: "black" } // Dropdown arrow color
//   }}
// >
//   <InputLabel sx={{ color: "black" }}>Priority</InputLabel>
//   <Select
//     value={newTask.priority}
//     onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
//     displayEmpty
//     sx={{ color: "black" }} // Text color inside dropdown
//   >
//     <MenuItem value="Low">Low</MenuItem>
//     <MenuItem value="Medium">Medium</MenuItem>
//     <MenuItem value="High">High</MenuItem>
//   </Select>
// </FormControl>
  
//             <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
//               Add Task
//             </Button>
//           </Box>
//         </Modal>
  
//         {/* Modal for Updating a Task */}
//         <Modal open={open} onClose={handleClose}>
//   <Box sx={{ ...modalStyle, p: 3 }}>
//     <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "black" }}>
//       📝 Edit Task
//     </Typography>

//     {/* Title Field */}
//     <TextField 
//       label="Title" 
//       value={selectedNote?.title || ''} 
//       onChange={(e) => setSelectedNote({ ...selectedNote, title: e.target.value })} 
//       fullWidth 
//       sx={{
//         mb: 2,
//         "& .MuiOutlinedInput-root": {
//           "& fieldset": { borderColor: "black" },
//           "&:hover fieldset": { borderColor: "black" },
//           "&.Mui-focused fieldset": { borderColor: "black" }
//         }
//       }}
//       InputProps={{ style: { color: "black" } }}
//       InputLabelProps={{ style: { color: "black" } }}
//     />

//     {/* Content Field */}
//     <TextField 
//       label="Content" 
//       value={selectedNote?.content || ''} 
//       onChange={(e) => setSelectedNote({ ...selectedNote, content: e.target.value })} 
//       fullWidth 
//       multiline 
//       rows={3} 
//       sx={{
//         mb: 2,
//         "& .MuiOutlinedInput-root": {
//           "& fieldset": { borderColor: "black" },
//           "&:hover fieldset": { borderColor: "black" },
//           "&.Mui-focused fieldset": { borderColor: "black" }
//         }
//       }}
//       InputProps={{ style: { color: "black" } }}
//       InputLabelProps={{ style: { color: "black" } }}
//     />

//     {/* Priority Dropdown */}
//     <FormControl fullWidth sx={{ 
//   mb: 2, 
//   "& .MuiSvgIcon-root": { color: "black" }  // Makes dropdown arrow black
// }}>
//   <InputLabel sx={{ color: "black" }}>Priority</InputLabel>
//   <Select 
//     value={selectedNote?.priority || ''} 
//     onChange={(e) => setSelectedNote({ ...selectedNote, priority: e.target.value })}
//     sx={{
//       color: "black",  // Text color
//       "& .MuiOutlinedInput-notchedOutline": { borderColor: "black" }, // Default border
//       "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "black" }, // Hover border
//       "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "black" } // Focus border
//     }}
//   >
//     <MenuItem value="Low">Low</MenuItem>
//     <MenuItem value="Medium">Medium</MenuItem>
//     <MenuItem value="High">High</MenuItem>
//   </Select>
// </FormControl>
  
//             <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
//               <Button variant="contained" color="success" startIcon={<Done />} onClick={handleMarkDone}>
//                 {selectedNote?.done ? "Mark as Pending" : "Mark as Done"}
//               </Button>
//               <Button variant="contained" color="primary" startIcon={<Edit />} onClick={handleUpdateNote}>
//                 Update
//               </Button>
//               <Button variant="contained" color="error" startIcon={<Delete />} onClick={handleDelete}>
//                 Delete
//               </Button>
//             </Box>
//           </Box>
//         </Modal>
//       </Box>
//   );
  
// };

// const modalStyle = { padding: '20px', backgroundColor: 'white', borderRadius: '10px', width: '90%', maxWidth: '400px', margin: 'auto' };

// export default NotesComponent;

import React, { useState , useEffect} from 'react';
import {
Grid, Card, CardContent, Typography, IconButton, Modal, TextField, Button, MenuItem, Select, FormControl, InputLabel, Fab, Box
} from '@mui/material';
import { Edit, Delete, Add, Done, FilterList, PushPin } from '@mui/icons-material';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

const NotesComponent = () => {
const [open, setOpen] = useState(false);
const [addTaskOpen, setAddTaskOpen] = useState(false);
const [selectedNote, setSelectedNote] = useState(null);
const [selectedFilter, setSelectedFilter] = useState('All');
const [newCategory, setNewCategory] = useState('');
const [submitted, setSubmitted] = useState(false); // Track if form was submitted

const UserId = useSelector((state) => state.global.userId);

const [notes, setNotes] = useState([
{ id: 1, title: 'Complete Report', content: 'Finalize the monthly site report', priority: 'High', category: 'Work', done: false, createdAt: new Date() },
{ id: 2, title: 'Meeting with Team', content: 'Discuss safety measures', priority: 'Medium', category: 'Meetings', done: false, createdAt: new Date() },
{ id: 3, title: 'Check Equipment', content: 'Inspect tools and machines', priority: 'Low', category: 'Inspection', done: false, createdAt: new Date() }
]);

const [MyAllnotes , setMyNotes] =useState([]);

const [newTask, setNewTask] = useState({

title: "",
content: "",
category: "", // Initially empty
priority: "",
dueDate:"",
done: false
});

const fetchNotes = async () => {
    try {
    
    const response = await axios.get(`http://localhost:5000/Notes/getMyNotes/${UserId}`);
    const myNotes = response.data.data; // Assuming API returns an array of notes
    
    
    
    // Update state with the received notes
    setMyNotes(myNotes);
    
    
    } catch (error) {
    console.error("Error fetching notes:", error);
    }
    };

useEffect(() => {

fetchNotes();
}, []);

const handleOpen = (note) => {
setSelectedNote(note);
setOpen(true);
};

const handleClose = () => {
setSelectedNote(null);
setOpen(false);
};

const handleUpdateNote = async () => {
     console.log(selectedNote)
    try {
        const response = await axios.put(`http://localhost:5000/Notes/updateNote/${selectedNote._id}`, {
            title: selectedNote.title,
            content: selectedNote.content,
            priority: selectedNote.priority,
            dueDate: selectedNote.dueDate,
            done: selectedNote.done,
        
        });
      
        } catch (error) {
        console.error("Error adding task:", error);
        toast.error("Failed to add task.");
        }
        setNotes(notes.map(n => (n._id === selectedNote._id ? selectedNote : n)));
        toast.info("Task updated!", {
        position: "top-right",
        autoClose: 3000,
        });
        handleClose();
        };


// const handleUpdateNote = () => {
// setNotes(notes.map(n => (n.id === selectedNote.id ? selectedNote : n)));
// toast.info("Task updated!", {
// position: "top-right",
// autoClose: 3000,
// });
// handleClose();
// };

const handleSubmit = () => {
setSubmitted(true);

// Determine the category (either selected or newly entered)
const finalCategory = newCategory || newTask.category;

// Proceed to add the task
handleAddTask(finalCategory);
};

const handleDelete = async() => {
    console.log("hn hum del");
    console.log(selectedNote._id);
    try {
        const response = await axios.delete(`http://localhost:5000/Notes/deleteNote/${selectedNote._id}`);
        toast.error("Task deleted!", {
    position: "top-right",
    autoClose: 3000,
    });
    handleClose();
    setMyNotes(MyAllnotes.filter(note => note._id !== selectedNote.id));
    }
        catch(e){
            console.log(e)

        }
    // setNotes(notes.filter(note => note.id !== selectedNote.id));
    
    };
// const handleDelete = () => {
// setNotes(notes.filter(note => note.id !== selectedNote.id));
// toast.error("Task deleted!", {
// position: "top-right",
// autoClose: 3000,
// });
// handleClose();
// };
const handleMarkDone = async() => {
    try {
        const response = await axios.put(`http://localhost:5000/notes/toggle/${selectedNote._id}`);
        console.log(response.data.message); // "Note marked as done." or "Note marked as pending."
        fetchNotes(); // Refresh the notes list
      } catch (error) {
        console.error("Error toggling note status:", error);
      }
    
    
    // setMyNotes(MyAllnotes.map(note =>
    // (note._id === selectedNote._id ? { ...note, done: !note.done } : note)
    // ));
    
    toast.success(selectedNote?.done ? "Marked as Pending!" : "Task Completed! ✅", {
    position: "top-right",
    autoClose: 3000,
    });
    
    handleClose();
    };

// const handleMarkDone = () => {
// setNotes(notes.map(note =>
// (note.id === selectedNote.id ? { ...note, done: !note.done } : note)
// ));

// toast.success(selectedNote?.done ? "Marked as Pending!" : "Task Completed! ✅", {
// position: "top-right",
// autoClose: 3000,
// });

// handleClose();
// };

const handleAddTask = async (finalCategory) => {
    try {
    const response = await axios.post(`http://localhost:5000/Notes/createNote/${UserId}`, {
    ...newTask,
    category: finalCategory,
    });

    
    
    setMyNotes([...MyAllnotes, response.data.data]); // Assuming API returns new note
    toast.success("Task added successfully!");
    } catch (error) {
    console.error("Error adding task:", error);
    toast.error("Failed to add task.");
    }
    
    // Reset form fields
    setNewTask({ title: '', content: '', priority: 'Low', category: '', done: false });
    setNewCategory('');
    setAddTaskOpen(false);
    };

// const handleAddTask = (finalCategory) => {
// setNotes([
// ...notes,
// {
// ...newTask,
// category: finalCategory, // Use selected or new category
// id: Date.now(),
// createdAt: new Date().toISOString()
// }
// ]);

// toast.success("Task added successfully!", {
// position: "top-right",
// autoClose: 3000,
// });

// // Reset form fields
// setNewTask({ title: '', content: '', priority: 'Low', category: '', done: false });
// setNewCategory('');
// setAddTaskOpen(false);
// };

const uniqueCategories = ['All', ...new Set(notes.map(note => note.category))];

const filteredNotes = MyAllnotes.filter(note => {
if (selectedFilter === 'Pending') return !note.done;
if (selectedFilter === 'Done') return note.done;
return selectedFilter === 'All' || note.category === selectedFilter;
});

console.log(filteredNotes);


return (
<Box
sx={{
minHeight: "100vh",
bgcolor: "linear-gradient(to bottom, #F59E0B, #FDE68A, #FEF3C7)",
p: 4,
}}
>
<Box
sx={{
p: 6,
bgcolor: "rgba(255, 255, 255, 0.3)",
borderRadius: 2,
boxShadow: 3,
backdropFilter: "blur(10px)",
}}
>
{/* Title Bar */}
<Box
sx={{
display: "flex",
justifyContent: "space-between",
alignItems: "center",
mb: 3,
}}
>
<Box textAlign="">
<Typography variant="h4" fontWeight="bold" fontFamily="Poppins">
Notes Hub!
</Typography>
<Typography
variant="h6"
fontFamily="Dancing Script"
color="text.secondary"
>
Stay organized and lead with confidence! Your tasks and notes are the key to a productive day.
</Typography>
</Box>


{/* Filter Dropdown */}
<FormControl sx={{ minWidth: 150 }}>
<InputLabel>Filter</InputLabel>
<Select
value={selectedFilter}
onChange={(e) => setSelectedFilter(e.target.value)}
startAdornment={<FilterList />}
>
<MenuItem value="All">All</MenuItem>
<MenuItem value="Pending">Pending</MenuItem>
<MenuItem value="Done">Done</MenuItem>
</Select>
</FormControl>
</Box>

{/* Categories Banner */}
<Box
sx={{
display: "flex",
gap: 2,
overflowX: "auto",
mb: 3,
p: 2,
bgcolor: "#e0f2f1",
borderRadius: 2,
}}
>
{uniqueCategories.map((category, index) => (
<Button
key={index}
variant={selectedFilter === category ? "contained" : "outlined"}
color="primary"
sx={{
color: selectedFilter === category ? "#fff" : "#000",
bgcolor: selectedFilter === category ? "#00796b" : "transparent",
borderColor: "#00796b",
}}
onClick={() => setSelectedFilter(category)}
>
{category}
</Button>
))}
</Box>

{/* Notes Grid */}
<Grid container spacing={3}>
{filteredNotes.map((note) => (
<Grid item xs={12} sm={6} md={4} key={note._id}>
<Card
onClick={() => handleOpen(note)}
sx={{
bgcolor: note.done ? "#a5d6a7" : "#fff176",
cursor: "pointer",
position: "relative", // Ensures absolute positioning of pin
borderRadius: "10px",
boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.1)", // Light shadow for a professional look
}}
>
{/* Pin Icon (Sticky Note Effect) */}
<PushPin
sx={{
position: "absolute",
top: 8,
right: 8,
color: "black",
transform: "rotate(-20deg)",
fontSize: "1.5rem",
}}
/>
<CardContent>
{/* Title */}
<Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
{note.title}
</Typography>

{/* Category & Priority */}
<Typography variant="body2" sx={{ color: "gray", fontSize: "0.9rem" }}>
📌 {note.category} | ⚡ {note.priority}
</Typography>

{/* Truncated Content */}
<Typography variant="body2" sx={{ mt: 1, color: "black" }}>
{note.content.length > 30 ? `${note.content.slice(0, 30)}...` : note.content}
</Typography>

{/* Date */}
<Typography variant="caption" sx={{ color: "gray", fontSize: "0.8rem", display: "block", mt: 1 }}>
{format(new Date(note.createdAt), "dd/MM/yyyy hh:mm a")}
</Typography>
</CardContent>
</Card>
</Grid>
))}
</Grid>

{/* Floating Add Task Button */}
<Fab
color="primary"
sx={{ position: "fixed", bottom: 20, right: 20 }}
onClick={() => setAddTaskOpen(true)}
>
<Add />
</Fab>
</Box>

{/* Modal for Adding New Task */}
<Modal open={addTaskOpen} onClose={() => setAddTaskOpen(false)}>
<Box sx={modalStyle}>
<Typography variant="h5" align="center" sx={{ mb: 2, fontWeight: "bold", color: "black" }}>
➕ Add New Task
</Typography>

<TextField
label="Title"
value={newTask.title}
onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
fullWidth
sx={{ mb: 2, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "black" }, "&:hover fieldset": { borderColor: "black" }, "&.Mui-focused fieldset": { borderColor: "black" } } }}
InputProps={{ style: { color: "black" } }}
InputLabelProps={{ style: { color: "black" } }}
/>

<TextField
label="Content"
value={newTask.content}
onChange={(e) => setNewTask({ ...newTask, content: e.target.value })}
fullWidth
multiline
rows={3}
sx={{ mb: 2, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "black" }, "&:hover fieldset": { borderColor: "black" }, "&.Mui-focused fieldset": { borderColor: "black" } } }}
InputProps={{ style: { color: "black" } }}
InputLabelProps={{ style: { color: "black" } }}
/>

<Box sx={{ display: "flex", gap: 2, mb: 2 }}>
<FormControl
fullWidth
disabled={!!newCategory}
sx={{
"& .MuiOutlinedInput-root": {
"& fieldset": { borderColor: "black" }, // Default border color
"&:hover fieldset": { borderColor: "black" }, // Hover effect
"&.Mui-focused fieldset": { borderColor: "black" } // Focus effect
},
"& .MuiSvgIcon-root": { color: "black" } // Black dropdown arrow
}}
>
<Select
value={newTask.category}
onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
displayEmpty
sx={{ color: "black" }} // Text color
>
<MenuItem value="">Select a Category</MenuItem>
{uniqueCategories.map((cat, index) => cat !== "All" && (
<MenuItem key={index} value={cat}>{cat}</MenuItem>
))}
</Select>
</FormControl>

<TextField
label="Or Create New Category"
value={newCategory}
onChange={(e) => setNewCategory(e.target.value)}
fullWidth
disabled={!!newTask.category}
sx={{
"& .MuiOutlinedInput-root": {
"& fieldset": { borderColor: "black" },
"&:hover fieldset": { borderColor: "black" },
"&.Mui-focused fieldset": { borderColor: "black" },
},
"& .MuiInputBase-root.Mui-disabled": { color: "lightgray" }, // Light gray text when disabled
"& .MuiInputLabel-root.Mui-disabled": { color: "gray" } // Light gray label when disabled
}}
InputProps={{ style: { color: "black" } }}
InputLabelProps={{ style: { color: "black" } }}
/>
</Box>

<FormControl
fullWidth
sx={{
mb: 2,
"& .MuiOutlinedInput-root": {
"& fieldset": { borderColor: "black" }, // Default border color
"&:hover fieldset": { borderColor: "black" }, // Hover effect
"&.Mui-focused fieldset": { borderColor: "black" } // Focus effect
},
"& .MuiSvgIcon-root": { color: "black" } // Dropdown arrow color
}}
>
<InputLabel sx={{ color: "black" }}>Priority</InputLabel>
<Select
value={newTask.priority}
onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
displayEmpty
sx={{ color: "black" }} // Text color inside dropdown
>
<MenuItem value="Low">Low</MenuItem>
<MenuItem value="Medium">Medium</MenuItem>
<MenuItem value="High">High</MenuItem>
</Select>
</FormControl>

<Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
Add Task
</Button>
</Box>
</Modal>

{/* Modal for Updating a Task */}
<Modal open={open} onClose={handleClose}>
<Box sx={{ ...modalStyle, p: 3 }}>
<Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "black" }}>
📝 Edit Task
</Typography>

{/* Title Field */}
<TextField
label="Title"
value={selectedNote?.title || ''}
onChange={(e) => setSelectedNote({ ...selectedNote, title: e.target.value })}
fullWidth
sx={{
mb: 2,
"& .MuiOutlinedInput-root": {
"& fieldset": { borderColor: "black" },
"&:hover fieldset": { borderColor: "black" },
"&.Mui-focused fieldset": { borderColor: "black" }
}
}}
InputProps={{ style: { color: "black" } }}
InputLabelProps={{ style: { color: "black" } }}
/>

{/* Content Field */}
<TextField
label="Content"
value={selectedNote?.content || ''}
onChange={(e) => setSelectedNote({ ...selectedNote, content: e.target.value })}
fullWidth
multiline
rows={3}
sx={{
mb: 2,
"& .MuiOutlinedInput-root": {
"& fieldset": { borderColor: "black" },
"&:hover fieldset": { borderColor: "black" },
"&.Mui-focused fieldset": { borderColor: "black" }
}
}}
InputProps={{ style: { color: "black" } }}
InputLabelProps={{ style: { color: "black" } }}
/>

{/* Priority Dropdown */}
<FormControl fullWidth sx={{
mb: 2,
"& .MuiSvgIcon-root": { color: "black" } // Makes dropdown arrow black
}}>
<InputLabel sx={{ color: "black" }}>Priority</InputLabel>
<Select
value={selectedNote?.priority || ''}
onChange={(e) => setSelectedNote({ ...selectedNote, priority: e.target.value })}
sx={{
color: "black", // Text color
"& .MuiOutlinedInput-notchedOutline": { borderColor: "black" }, // Default border
"&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "black" }, // Hover border
"&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "black" } // Focus border
}}
>
<MenuItem value="Low">Low</MenuItem>
<MenuItem value="Medium">Medium</MenuItem>
<MenuItem value="High">High</MenuItem>
</Select>
</FormControl>

<Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
<Button variant="contained" color="success" startIcon={<Done />} onClick={handleMarkDone}>
{selectedNote?.done ? "Mark as Pending" : "Mark as Done"}
</Button>
<Button variant="contained" color="primary" startIcon={<Edit />} onClick={handleUpdateNote}>
Update
</Button>
<Button variant="contained" color="error" startIcon={<Delete />} onClick={handleDelete}>
Delete
</Button>
</Box>
</Box>
</Modal>
</Box>
);

};

const modalStyle = { padding: '20px', backgroundColor: 'white', borderRadius: '10px', width: '90%', maxWidth: '400px', margin: 'auto' };

export default NotesComponent;