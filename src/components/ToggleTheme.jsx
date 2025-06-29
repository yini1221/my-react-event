import { useTheme } from '../components/ThemeContext';

function ToggleTheme() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme} 
      className="btn btn-theme rounded-5"
      aria-label="切換主題"
    >
      {theme === 'light' ? '🌞 日間模式' : '🌙 夜間模式'}
    </button>
  );
}

export default ToggleTheme;
