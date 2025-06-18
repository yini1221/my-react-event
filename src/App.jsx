import { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, Outlet, Navigate } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistrationForm from './pages/RegistrationForm';
import EventsPage from './pages/EventsPage';
import FavoritesPage from './pages/FavoritesPage';
import ProfilePage from './pages/ProfilePage';
import RegistrationsPage from './pages/RegistrationsPage';
import AdminRegistrationsPage from './pages/AdminRegistrationsPage';
import AdminEventsPage from './pages/AdminEventsPage';
import AdminMembersPage from './pages/AdminMembersPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminEventCategoriesPage from './pages/AdminEventCategoriesPage';
import EventDetailPage from './pages/EventDetailPage';
import RegisterPage from './pages/RegisterPage';
import ToggleTheme from './components/ToggleTheme';
import 'swiper/css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Home()
{
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Link to="/home">
          <img src={`${import.meta.env.BASE_URL}images/homelogo1.png`} className="logo" alt="Vite logo" 
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
      <main className="flex-grow-1 bg-light mt-5">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function PrivateRoute({ children }) {
  const user = localStorage.getItem('user');
  return user ? children : <Navigate to="/auth/login" replace />;
}

function App()
{
  return (
    <Router>
      <Routes>
        {/* 沒有 Navbar 和 Footer 的首頁 */}
        <Route path="/" element={<Home />} />

        {/* 有 Navbar 和 Footer 的其他頁面 */}
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegistrationForm />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/user/favorites:id" element={
            <PrivateRoute>
            <FavoritesPage />
            </PrivateRoute>
            } />
          <Route path="/user/profile/:id" element={<ProfilePage />} />
          <Route path="/user/:id/registrations" element={<RegistrationsPage />} />
          <Route path="/user/events/register/:eventId" element={<RegisterPage />} />
          <Route path="/admin" element={<Navigate to="/admin/registrations" replace />} />
          <Route path="/admin/registrations" element={<AdminRegistrationsPage />} />
          <Route path="/admin/events" element={<AdminEventsPage />} />
          <Route path="/admin/event-categories" element={<AdminEventCategoriesPage />} />
          <Route path="/admin/members" element={<AdminMembersPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/events/:eventId" element={<EventDetailPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
