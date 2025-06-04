import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, Navigate } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar2';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import FavoritesPage from './pages/FavoritesPage';
import ProfilePage from './pages/ProfilePage';
import AdminRegistrationsPage from './pages/AdminRegistrationsPage';
import AdminEventsPage from './pages/AdminEventsPage';
import AdminMembersPage from './pages/AdminMembersPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminEventCategoriesPage from './pages/AdminEventCategoriesPage';
import EventDetailPage from './pages/EventDetailPage';
import RegisterPage from './pages/RegisterPage';
import ToggleTheme from './components/ToggleTheme';
import 'swiper/css';

function Home()
{
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Link to="/home" target="_blank">
          <img src="homelogo1.png" className="logo" alt="Vite logo" 
          onError={(e) => {
          e.target.src = "/participation.png";
          console.error("圖片載入失敗");
          }} />
        </Link>
      </div>
      <h1>活動報名平台</h1>
      <div className="my-4">
        <Link to="/home" className="custom-link" onClick={() => setCount((count) => count + 1)}>
          點我進入 <span>（瀏覽次數: {count}）</span>
        </Link>
      </div>
      <p className="read-the-docs">
        提供線上報名、報名活動與查詢報名狀態的地方。
      </p>
      <ToggleTheme />
    </>
  );
}

function Layout()
{
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App()
{
  return (
    <Router basename="/my-react-event">
      <Routes>
        {/* 沒有 Navbar 和 Footer 的首頁 */}
        <Route path="/" element={<Home />} />

        {/* 有 Navbar 和 Footer 的其他頁面 */}
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<Navigate to="/admin/registrations" replace />} />
          <Route path="/admin/registrations" element={<AdminRegistrationsPage />} />
          <Route path="/admin/events" element={<AdminEventsPage />} />
          <Route path="/admin/event-categories" element={<AdminEventCategoriesPage />} />
          <Route path="/admin/members" element={<AdminMembersPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
          <Route path="/user/events/register/:id" element={<RegisterPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;