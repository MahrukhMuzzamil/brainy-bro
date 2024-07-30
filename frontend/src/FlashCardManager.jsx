import React, { useState } from "react";

function FlashcardManager() {
  const [flashcards, setFlashcards] = useState([]);
  const [frontSide, setFrontSide] = useState("");
  const [backSide, setBackSide] = useState("");

  const handleFrontChange = (e) => {
    setFrontSide(e.target.value);
  };

  const handleBackChange = (e) => {
    setBackSide(e.target.value);
  };

  const handleAddFlashcard = () => {
    const newFlashcard = {
      front: frontSide,
      back: backSide,
      isFrontVisible: true,
    };
    setFlashcards([...flashcards, newFlashcard]);
    setFrontSide("");
    setBackSide("");
  };

  const handleToggleSide = (index) => {
    const updatedFlashcards = [...flashcards];
    updatedFlashcards[index].isFrontVisible =
      !updatedFlashcards[index].isFrontVisible;
    setFlashcards(updatedFlashcards);
  };

  return {
    flashcards,
    frontSide,
    backSide,
    handleFrontChange,
    handleBackChange,
    handleAddFlashcard,
    handleToggleSide,
  };
}

export default FlashcardManager;
