import express from "express";
import { createNote, getAllNotes, updateNote, deleteNote, checking, toggleDone } from '../controllers/Note.js';

const router = express.Router();

// Route to create a new note
router.post('/createNote/:supervisorId', createNote);

router.get("/check", checking);

// Route to get all notes for a specific supervisor
router.get('/getMyNotes/:supervisorId', getAllNotes);

// Route to update an existing note
router.put('/updateNote/:noteId', updateNote);
router.put('/toggle/:noteId', toggleDone);

// Route to delete a note
router.delete('/deleteNote/:noteId', deleteNote);

export default router;
