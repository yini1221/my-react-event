import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom";
import viteLogo from '/participation.png';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import FavoritesPage from './pages/FavoritesPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import EventDetailPage from './pages/EventDetailPage';
import 'swiper/css';

function Home()
{
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="/home" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
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
    <Router>
      <Routes>
        {/* 沒有 Navbar 和 Footer 的首頁 */}
        <Route path="/" element={<Home />} />

        {/* 有 Navbar 和 Footer 的其他頁面 */}
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;