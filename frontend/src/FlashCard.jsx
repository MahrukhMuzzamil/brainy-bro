
import React, { useState } from "react";
import "./MotivationalQuote.css"; // Import CSS file for styling
import FlashcardManager from "./FlashCardManager"; // Import FlashcardManager


function App() {
  const [page, setPage] = useState("home");
  const flashcardManager = FlashcardManager(); // Use FlashcardManager to get functions and states

  const handleCreateFlashcard = () => {
    setPage("create");
  };

  const handleViewFlashcards = () => {
    setPage("view");
  };

  const handleGoBack = () => {
    setPage("home");
  };

  return (
    <div className="container">
      <h1>Flashcards</h1>
      {page === "home" && (
        <div className="home">
          <div className="giphy-container">
            <iframe
              src="https://giphy.com/embed/uTz3P3wsV52l8wHrDU"
              width="480"
              height="480"
              frameBorder="0"
              className="giphy-embed"
              allowFullScreen
            ></iframe>
          </div>

          <button onClick={handleCreateFlashcard}>Create Flashcard</button>
          <button onClick={handleViewFlashcards}>View Flashcards</button>
          {/* <button onClick={() => setPage("motivational")}>
            Motivational Quote
          </button>
          <button onClick={() => setPage("studyPlaylist")}>
            Study Playlist
          </button> */}
        </div>
      )}
      {page === "create" && (
        <div className="create">
          <label>Front Side:</label>
          <br></br>
          <input
            type="text"
            value={flashcardManager.frontSide}
            onChange={flashcardManager.handleFrontChange}
          />
          <br></br>
          <label>Back Side:</label>
          <br></br>
          <input
            type="text"
            value={flashcardManager.backSide}
            onChange={flashcardManager.handleBackChange}
          />
          <br></br>
          <button onClick={flashcardManager.handleAddFlashcard}>
            Add Flashcard
          </button>
          <button onClick={handleGoBack}>Go Back</button>
        </div>
      )}
      {page === "view" && (
        <div className="view">
          <button onClick={handleGoBack}>Go Back</button>
          <br />
          {flashcardManager.flashcards.map((flashcard, index) => (
            <div
              key={index}
              className={`flashcard ${
                flashcard.isFrontVisible ? "front" : "back"
              }`}
              onClick={() => flashcardManager.handleToggleSide(index)}
            >
              <p>
                {flashcard.isFrontVisible ? flashcard.front : flashcard.back}
              </p>
            </div>
          ))}
        </div>
      )}
      {/* {page === "motivational" && <MotivationalQuote />}
      {page === "studyPlaylist" && <StudyPlaylist />} */}
    </div>
  );
}

export default App;
