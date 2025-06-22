import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../components/ThemeContext';
import ToggleTheme from './ToggleTheme';
import '../css/Navbar.css';
import { useEffect, useState } from 'react';

function Navbar({ isLogin, userId, username, role, onLogout }) {

  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');
  const { theme } = useTheme();
  const logoSrc = `${import.meta.env.BASE_URL}images/${theme === 'dark' ? 'homelogo_white.png' : 'homelogo.png'}`;

  const handleLogout = async (e) => {
    try {
      const res = await fetch('http://localhost:8084/logout', {
        method: 'POST',
        credentials: "include",
      })
      const result = await res.json();
      if (res.ok) {
        alert('登出成功! ');
        localStorage.removeItem('user');
        onLogout();
        navigate('/auth/login');
      } else {
        alert('登出失敗: ' + result.message);
        }
    } catch (err) {
        console.error('登出失敗！' + err);   
      }   
  };

  const handleSearchSubmit = (e) => {
    if (searchKeyword.trim() === '') return;
    navigate(`/home/search?keyword=${encodeURIComponent(searchKeyword.trim())}`);
    setSearchKeyword('');
  };

  return (
    <>
      <nav className="navbar navbar-light bg-navbar fixed-top" style={{ height: '50px' }}>
        <div className="container-fluid px-2 d-flex align-items-center position-relative" style={{'maxWidth': '1080px'}}>
          <button style={{ width: '60px' }} className="navbar-toggler border-0 navbar-button" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <img src={`${import.meta.env.BASE_URL}images/hamburger-menu.png`} />
          </button>
          <Link className="navbar-brand position-absolute top-50 start-50 translate-middle" to="/home" style={{ width: '50px' }}>
            <img src={logoSrc} />
          </Link>
          <div className='d-flex'>
            <button className="bg-navbar btn btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#searchCollapse" aria-expanded="false" aria-controls="searchCollapse">
              <img src={`${import.meta.env.BASE_URL}images/search-o.png`} style={{ width: '30px' }} />
            </button>
            <div className='d-none d-lg-block'>
              <span className='text-white'>｜</span>
              {
                isLogin && userId ? 
                (<>
                  <span>
                    <Link to={`/user/profile/${userId}`} className='text-color'>
                      {username}{role === 'ADMIN' && (<span>(管理員)</span>)}
                    </Link> <span className='text-color'> 你好!</span>
                  </span>
                  <button type="button" className="btn text-color navbar-button" onClick={() => handleLogout()}>登出</button>
                </>) 
                : (<>
                  <button type="button" className="btn text-color" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <Link to="/auth/login" className="nav-link custom-link navbar-button" aria-current="login">登入</Link>
                  </button>
                  <button type="button" className="btn text-color" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <Link to="/auth/register" className="nav-link custom-link" aria-current="register">註冊</Link>
                  </button>
              </>)
            }
            </div>
          </div>
          <div className="collapse w-100 position-absolute end-0 bg-navbar" id="searchCollapse">
              <form className="d-flex align-items-center w-100 px-2 gap-1">
                <div className='position-relative w-100'>
                  <input value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} className="form-control rounded-5" type="text" placeholder="尋找活動" aria-label="Search" />
                  <span onClick={() => handleSearchSubmit()} type='button' className='search-icon'>
                    <img src={`${import.meta.env.BASE_URL}images/search-o.png`} style={{ width: '30px' }} />
                  </span>
                </div>
                <button className="btn-close text-reset d-flex navbar-button" type="button" data-bs-toggle="collapse" data-bs-target="#searchCollapse" aria-label="Close" style={{width: '20px'}}></button>
              </form>
            </div>
          <div className="offcanvas offcanvas-start bg-menu" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title text-gray" id="offcanvasNavbarLabel">探索身邊有趣的活動！</h5>
              <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className='w-100'>
              <img src={`${import.meta.env.BASE_URL}images/menu.jpeg`} />
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item"><Link to="home" className="nav-link custom-link" aria-current="page">首頁</Link></li>
                <li className="nav-item"><Link to={`/user/favorites/${userId}`} className="nav-link custom-link">收藏</Link></li>
                <li className="nav-item"><Link to={`/user/profile/${userId}`} className="nav-link custom-link">個人資訊</Link></li>
                { role === 'ADMIN' && (
                  <li className="nav-item dropdown">
                    <a className="nav-link custom-link dropdown-toggle" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      後台管理
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="offcanvasNavbarDropdown">
                      <li><Link to="/admin/registrations" className='dropdown-item custom-link'>報名管理</Link></li>
                      <li><Link to="/admin/events" className='dropdown-item custom-link'>活動管理</Link></li>
                      <li><Link to="/admin/event-categories" className='dropdown-item custom-link'>活動分類管理</Link></li>
                      <li><Link to="/admin/members" className='dropdown-item custom-link'>會員管理</Link></li>
                      <li><Link to="/admin/dashboard" className='dropdown-item custom-link'>後台儀表板</Link></li>
                    </ul>
                  </li>
                )}
                <li className="nav-item mt-1"><ToggleTheme /></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;