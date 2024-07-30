const Note = require('../models/NotesTaking');
const fs = require('fs');
const path = require('path');


module.exports = {
  createFile: createFile,
  getAllFiles: getAllFiles,
  searchFileContent: searchFileContent
};


// Controller to save a new file name in the database
const createFile = async (req, res) => {
  try {
    const { filename, content } = req.body;

    // Check if filename and content are provided
    if (!filename || !content) {
      return res.status(400).json({ error: 'Filename and content are required' });
    }

    // Create a new note instance
    const newNote = new Note({
      filename: filename,
      content: content
    });

    // Save the new note to the database
    const savedNote = await newNote.save();

    // Write the content to a text file
    const filePath = path.join(__dirname, '..', 'notes', `${filename}.txt`);
    fs.writeFileSync(filePath, content);

    res.json(savedNote);
  } catch (err) {
    console.error('Error creating file:', err);
    res.status(500).send('Error creating file');
  }
};

module.exports = { createFile };

// Controller to fetch all saved file names from the database
const getAllFiles = async (req, res) => {
  try {
    const files = await Note.find({}, 'filename');
    res.json(files);
  } catch (err) {
    console.error('Error fetching files:', err);
    res.status(500).send('Error fetching files');
  }
};



const searchFileContent = async (req, res) => {
  try {
      const { filename } = req.params;

      // Query the database to find the note with the matching filename
      const foundNote = await Note.findOne({ filename });

      // If the note is found, send its content in the response
      if (foundNote) {
          res.send(foundNote.content);
      } else {
          // If no note is found, send an appropriate error message
          res.status(404).json({ error: 'File not found' });
      }
  } catch (error) {
      console.error('Error searching for file content:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { searchFileContent };
