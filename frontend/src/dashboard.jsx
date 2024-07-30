import React from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css'; // Import your CSS file

function Dashboard() {
    return (
        <div className="dashboard-container">
            <div className="header">
                <img src="src/assets/logo.png" alt="Logo" className="logo" />
                <h1>Dashboard</h1>
            </div>
            <div className="menu">
                <ul>
                    <li><Link to="/todo">TodoList</Link></li>
                    <li><Link to="/gemini">ChatBot</Link></li>
                    <li><Link to="/speech-recognition">Speech Recognition</Link></li>
                    <li><Link to="/pomodoro">Timer</Link></li>
                    <li><Link to="/studyplaylist">Study Playlist</Link></li> {/* Added Study Playlist link */}
                    <li><Link to="/motivationalquote">Motivational Quote</Link></li> {/* Added Motivational Quote link */}
                    <li><Link to="/flashcardmanager">Flashcard Manager</Link></li> {/* Added Flashcard Manager link */}
                    <li><Link to="/notes">Note Taking</Link></li> {/* Added Note Taking link */}
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;
