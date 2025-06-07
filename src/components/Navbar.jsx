import { Link } from 'react-router-dom';
import ToggleTheme from './ToggleTheme';
import '../css/Navbar.css';
import { useState } from 'react';

function OffcanvasExample() {

  const [search, setSearch] = useState(false);

  const handleSearch = () => {
    setSearch(true);
  }

  return (
    <>
      <nav className="navbar navbar-light bg-navbar fixed-top" style={{ height: '50px' }}>
        <div className="container-fluid px-2 d-flex align-items-center position-relative" style={{'maxWidth': '1080px'}}>
          <button style={{ width: '60px' }} className="navbar-toggler border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <img src={`${import.meta.env.BASE_URL}images/hamburger-menu.png`} />
          </button>
          <Link className="navbar-brand position-absolute top-50 start-50 translate-middle" to="/home" style={{ width: '50px' }}>
            <img src={`${import.meta.env.BASE_URL}images/homelogo.png`} />
          </Link>
          <div className='d-flex'>
            <button className="bg-navbar btn btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#searchCollapse" aria-expanded="false" aria-controls="searchCollapse">
              <img src={`${import.meta.env.BASE_URL}images/search-o.png`} style={{ width: '30px' }} />
            </button>
            <div className='d-none d-lg-block'>
              <span className='text-white'>｜</span>
              <button type="button" className="btn text-color" data-bs-toggle="modal" data-bs-target="#exampleModal">
                登入
              </button>
              <button type="button" className="btn text-color" data-bs-toggle="modal" data-bs-target="#exampleModal">
                註冊
              </button>
            </div>
          </div>
          <div className="collapse w-100" id="searchCollapse">
              <form className="d-flex align-items-center w-100 p-2 gap-1">
                <div className='position-relative w-100'>
                  <input className="form-control rounded-5" type="search" placeholder="尋找活動" aria-label="Search" />
                  <span className='search-icon'>
                    <img src={`${import.meta.env.BASE_URL}images/search-o.png`} style={{ width: '30px' }} />
                  </span>
                </div>
                <button className="btn-close text-reset d-flex " type="button" data-bs-toggle="collapse" data-bs-target="#searchCollapse" aria-label="Close" style={{width: '20px'}}></button>
              </form>
            </div>
          <div className="offcanvas offcanvas-start bg-menu" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">探索身邊有趣的活動！</h5>
              <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className='w-100'>
              <img src={`${import.meta.env.BASE_URL}images/menu.jpeg`} />
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item"><Link className="nav-link custom-link" aria-current="page" to="home">首頁</Link></li>
                <li className="nav-item"><Link className="nav-link custom-link position-relative" to="/events">活動
                    <span className="position-absolute top-0 start-50 badge rounded-circle bg-danger">new</span></Link>
                </li>
                <li className="nav-item"><Link className="nav-link custom-link" to="/favorites">收藏</Link></li>
                <li className="nav-item"><Link className="nav-link custom-link" to="/profile">個人資訊</Link></li>
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
                    <li><Link to="/admin/dashboard" className='dropdown-item custom-link'>後台儀表板</Link></li>
                  </ul>
                </li>
                <li className="nav-item"><ToggleTheme /></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default OffcanvasExample;