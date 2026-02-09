import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import SessionPage from './pages/SessionPage';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [activeProject, setActiveProject] = useState(null);

  const handleStartProject = (projectId) => {
    setActiveProject(projectId);
    setCurrentView('session');
  };

  const handleExitSession = () => {
    setActiveProject(null);
    setCurrentView('landing');
  };

  if (currentView === 'session' && activeProject) {
    return <SessionPage projectId={activeProject} onExit={handleExitSession} />;
  }

  return <LandingPage onStartProject={handleStartProject} />;
}

export default App;
