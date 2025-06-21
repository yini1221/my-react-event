import { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, Outlet, Navigate, useLocation  } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useTheme } from './components/ThemeContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistrationForm from './pages/RegistrationForm';
import FavoritesPage from './pages/FavoritesPage';
import ProfilePage from './pages/ProfilePage';
import RegistrationsPage from './pages/RegistrationsPage';
import AdminRegistrationsPage from './pages/AdminRegistrationsPage';
import AdminEventsPage from './pages/AdminEventsPage';
import AdminMembersPage from './pages/AdminMembersPage';
import ExportExample from './pages/ExportExample';
import AdminEventCategoriesPage from './pages/AdminEventCategoriesPage';
import EventDetailPage from './pages/EventDetailPage';
import RegisterPage from './pages/RegisterPage';
import ToggleTheme from './components/ToggleTheme';
import EventSearch from './pages/EventSearch';
import 'swiper/css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Home() {

  const { theme } = useTheme();
  const [logoSrc, setLogoSrc] = useState(`${import.meta.env.BASE_URL}images/homelogo_big.png`);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setFade(true);
    const timeout = setTimeout(() => {
      setLogoSrc(
        `${import.meta.env.BASE_URL}images/${theme === 'dark' ? 'homelogo_white.png' : 'homelogo_big.png'}`
      );
      setFade(false);
    }, 250);
    return () => clearTimeout(timeout);
  }, [theme]);

  return (
    <>
      <div>
        <Link to="/home">
          <img src={logoSrc} className={`logo ${fade ? 'fade-out' : ''}`} alt="Yi起Join logo" 
          onError={(e) => {
          e.target.src = "/participation.png";
          console.error("圖片載入失敗");
          }} />
        </Link>
      </div>
      <h1>活動報名平台</h1>
      <div className="my-4">
        <Link to="/home" className="custom-link">
          點我進入
        </Link>
      </div>
      <p className="read-the-docs">
        提供線上報名、報名活動與查詢報名狀態的地方。
      </p>
      <ToggleTheme />
    </>
  );
}

function Layout({ isLogin, userId, username, role, onLogout }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar isLogin={isLogin}
        userId={userId}
        username={username}
        role={role}
        onLogout={onLogout}/>
      <main className="flex-grow-1 bg-light mt-5">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function PrivateRoute({ children }) {
  const user = localStorage.getItem('user');
  const location = useLocation();
  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  return children;
}

function App() {

  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const handleLoginSuccess = (user) => {
    setIsLogin(true);
    setUserId(user.id);
    setUsername(user.username);
    setRole(user.role);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const fetchUserInfo = async () => {
    try {
      const res = await fetch('http://localhost:8084/auth/userinfo', {
        credentials: 'include',
      });
      if (!res.ok) {
          setIsLogin(false);
          setUserId(null);
          setUsername(null);
          setRole(null);
          localStorage.removeItem('user');
          return;
        }
      const result = await res.json();
      if (result.data) {
        handleLoginSuccess(result.data);
      } else {
        console.log('無登入資料');
      }
    } catch (err) {
      console.error('取得資料錯誤:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLogin(false);
    setUserId(null);
    setUsername(null);
    setRole(null);
  };

  const handleUsernameChange = (newUsername) => {
    setUsername(newUsername);
    const storedUser = localStorage.getItem('user');
    if(storedUser) {
      const userObj = JSON.parse(storedUser);
      userObj.username = newUsername;
      localStorage.setItem('user', JSON.stringify(userObj));
    }
  }

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch('http://localhost:8084/auth/check-login', {
          credentials: 'include',
        });
        const result = await res.json();
        if (res.ok && result.data === true) {
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            const userObj = JSON.parse(storedUser);
            setUserId(userObj.id);
            setUsername(userObj.username);
            setRole(userObj.role);
            setIsLogin(true);
          }
        } else {
          setIsLogin(false);
          setUserId(null);
          setUsername(null);
          setRole(null);
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.error('登入時發生錯誤:', error);
      }
  };
    checkLogin();
  }, []);

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

  useEffect(() => {
     fetchUserInfo();
  }, [])
  return (
    <Router>
      <Routes>
        {/* 沒有 Navbar 和 Footer 的首頁 */}
        <Route path="/" element={<Home  theme={theme} />} />

        {/* 有 Navbar 和 Footer 的其他頁面 */}
        <Route element={<Layout 
              theme={theme}
              isLogin={isLogin}
              userId={userId}
              username={username}
              role={role}
              onLogout={handleLogout}
            />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/home/search" element={<EventSearch />} />
          <Route path="/auth/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/auth/register" element={<RegistrationForm />} />
          <Route path="/user/favorites/:userId" element={
            <PrivateRoute>
            <FavoritesPage />
            </PrivateRoute>
            } />
          <Route path="/user/profile/:userId" element={
            <PrivateRoute>
            <ProfilePage onUsernameChange={handleUsernameChange} />
            </PrivateRoute>
            } />
          <Route path="/user/:id/registrations" element={<RegistrationsPage />} />
          <Route path="/user/events/register/:eventId" element={
            <PrivateRoute>
            <RegisterPage />
            </PrivateRoute>
            } />
          <Route path="/admin" element={<Navigate to="/admin/registrations" replace />} />
          <Route path="/admin/registrations" element={<AdminRegistrationsPage />} />
          <Route path="/admin/events" element={<AdminEventsPage />} />
          <Route path="/admin/event-categories" element={<AdminEventCategoriesPage />} />
          <Route path="/admin/members" element={<AdminMembersPage />} />
          <Route path="/admin/dashboard" element={<ExportExample />} />
          <Route path="/events/:eventId" element={<EventDetailPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
