import Note from '../models/Note.js';

export const createNote = async (req, res) => {
  console.log("add hony wla aik note");
  console.log(req.body);

  const {supervisorId} = req.params
  
  const {title, content, priority, dueDate, done , category } = req.body;

  

  try {
    const newNote = new Note({
      supervisorId,
      title,
      content,
      priority,
      dueDate,
      category,
      done,
    });

    await newNote.save();

    return res.status(201).json({
      success: true,
      message: 'Note created successfully.',
      data: newNote,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Error creating note.',
    });
  }
};


export const getAllNotes = async (req, res) => {
  const { supervisorId } = req.params;
console.log("hn abhi ajain gy");
  try {
    const notes = await Note.find({ supervisorId }).sort({ createdAt: -1 });

    if (!notes || notes.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No notes found for this supervisor.',
      });
    }

    return res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching notes.',
    });
  }
};

export const checking = async(req,res)=>{
  console.log("dsadsadsa");
}

export const toggleDone= async (req, res) => {
  const { noteId } = req.params;
  try {
    // Find the note by ID
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found.',
      });
    }

    // Toggle the `done` status
    note.done = !note.done;

    // Save the updated note
    const updatedNote = await note.save();

    return res.status(200).json({
      success: true,
      message: `Note marked as ${updatedNote.done ? 'done' : 'pending'}.`,
      data: updatedNote,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Error toggling note status.',
    });
  }
};



export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  console.log(noteId + "yes we will update");
  console.log(req.body)
  const { title, content, priority, dueDate, done  } = req.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { title, content, priority, dueDate, done  },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: 'Note not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Note updated successfully.',
      data: updatedNote,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Error updating note.',
    });
  }
};


export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  console.log("main del kru ga");

  try {
    const deletedNote = await Note.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: 'Note not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Note deleted successfully.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Error deleting note.',
    });
  }
};

