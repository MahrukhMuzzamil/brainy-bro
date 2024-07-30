// NotesTakingFront.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NotesTakingFront.css';

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [newFileName, setNewFileName] = useState('');
  const [newFileContent, setNewFileContent] = useState('');
  const [selectedFileContent, setSelectedFileContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    handleSaveFile(newFileName, newFileContent);
  };

  const fetchFiles = () => {
    axios.get('http://localhost:5000/notestaking/getallnotes')
      .then(response => {
        setFiles(response.data);
      })
      .catch(error => {
        console.error('Error fetching files:', error);
      });
  };

  const handleSearch = async () => {
    try {
      const fileContent = "The topic of this article may not meet Wikipedia's general notability guideline. Please help to demonstrate the notability of the topic by citing reliable secondary sources that are independent of the topic and provide significant coverage of it beyond a mere trivial mention. If notability cannot be shown, the article is likely to be merged, redirected, or deleted";
      setSelectedFileContent(fileContent);
      setSearchQuery(''); // Clear the search field
    } catch (error) {
      console.error('Error searching for file:', error);
      setSelectedFileContent('');
    }
  };

  const handleSaveFile = async (filename, content) => {
    try {
      if (typeof filename !== 'string' || typeof content !== 'string') {
        console.error('Filename and content must be strings');
        return;
      }

      if (filename.trim() === '' || content.trim() === '') {
        console.error('Filename and content cannot be empty');
        return;
      }

      await axios.post('http://localhost:5000/notestaking/createnote', { filename, content });

      setNewFileName('');
      setNewFileContent('');

      fetchFiles();
    } catch (error) {
      console.error('Error saving file:', error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSave} encType="multipart/form-data">
        <div className="add-file-section">
          <h2>Add File</h2>
          <label htmlFor="fileName">File Name:</label>
          <input type="text" id="fileName" value={newFileName} onChange={(e) => setNewFileName(e.target.value)} />
          <br />
          <label htmlFor="fileContent">File Content:</label>
          <textarea id="fileContent" value={newFileContent} onChange={(e) => setNewFileContent(e.target.value)} />
          <br />
          <button type="submit" className="save-button">Save</button>
        </div>
      </form>

      <div className="search-section">
        <h2>Search</h2>
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="table-section">
        <h2>Saved Files</h2>
        <table>
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>File Name</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{file.filename}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="file-content-section">
        <h2>File Content</h2>
        <textarea value={selectedFileContent} readOnly />
      </div>
    </div>
  );
};

export default FileList;
