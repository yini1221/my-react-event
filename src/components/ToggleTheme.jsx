import { useEffect, useState } from 'react';

function ToggleTheme() {
  // 讀取 localStorage 的主題，預設為 light
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // 切換主題函式
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // 當 theme 改變時，更新 localStorage 和 body class
  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }, [theme]);

  return (
    <button 
      onClick={toggleTheme} 
      className="btn btn-outline-secondary"
      aria-label="切換主題"
    >
      {theme === 'light' ? '🌞 日間模式' : '🌙 夜間模式'}
    </button>
  );
}

export default ToggleTheme;
