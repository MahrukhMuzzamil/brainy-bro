import './SettingsApp.css';
import React from 'react';
import Settings from './Settings';
import SettingsContext from './SettingsContext';
import Timer from "./SettingsTimer";
import { useState } from 'react';

function App() {

  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);

  return (
    <main>
      <div className='pomodoroStuff'>
        <SettingsContext.Provider value={{
          showSettings,
          setShowSettings,
          workMinutes,
          breakMinutes,
          setWorkMinutes,
          setBreakMinutes,
        }}>
          {showSettings ? <Settings /> : <Timer />}
        </SettingsContext.Provider>
      </div>
      
    </main>
  );
}

export default App;
