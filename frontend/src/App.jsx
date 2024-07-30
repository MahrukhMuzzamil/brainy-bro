import "regenerator-runtime/runtime";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard';
import TodoApp from './RenderTasks';
import GeminiApp from './GeminiApp';
import PomodoroApp from './SettingsApp';
import FileList from './NotesTakingFront'; // Fixed import path
import SpeechApp from '../../SpeechRecognition/speech-recognition/src/App'; // Adjusted import path
import Timer from "./SettingsTimer";
import SettingsContext from './SettingsContext';
import Settings from './Settings';
import { useState } from 'react';
import StudyPlaylist from "./StudyPlayList";
import MotivationalQuote from "./MotivationalQuote";
import FlashcardManager from "./FlashCard";
import SignIn from './SignIn';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/todo" element={<TodoApp />} />
          <Route path="/gemini" element={<GeminiApp />} />
          <Route path="/speech-recognition" element={<SpeechApp />} /> {/* Added route for SpeechApp */}
          <Route path="/pomodoro" element={<PomodoroApp />} /> {/* Added route for PomodoroApp */}
          <Route path="/studyplaylist" element={<StudyPlaylist />} />
          <Route path="/motivationalquote" element={<MotivationalQuote />} />
          <Route path="/flashcardmanager" element={<div><FlashcardManager /></div>} />
          <Route path="/notes" element={<FileList />} /> {/* Added route for FileList */}
          <Route path="/signin" element={<SignIn />} /> {/* Add this line for the SignIn component */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
