import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

function ToggleTheme() {

  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const themeStyles = {
    backgroundColor: isDarkMode ? '#1e1e2d' : '#f9f9f9',
    color: isDarkMode ? '#f9f9f9' : '#1e1e2d',
  };

    return (
        <div>
          <Button variant="link" onClick={toggleTheme} className="text-decoration-none toggle-theme-color custom-link">
            {isDarkMode ? '🌞 日間模式' : '🌙 夜間模式'}
          </Button>
        </div>
    );
}

export default ToggleTheme