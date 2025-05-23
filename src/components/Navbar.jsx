import { Link } from 'react-router-dom';
import ToggleTheme from './ToggleTheme';
import '../css/Navbar.css';

function Navbar()
{
  return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="/home" style={{ height:'100px', width: '100px' }}>
            <img src="/homelogo.png" className="navbar-logo" alt="home logo" 
          onError={(e) => {
          e.target.src = "/participation.png";
          console.error("圖片載入失敗");
          }} />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse bg-light" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-3 zindex-2">
                  <li className="nav-item"><Link className="nav-link custom-link" to="home">首頁</Link></li>
                  <li className="nav-item"><Link className="nav-link custom-link position-relative" to="/events">活動
                    <span class="position-absolute top-10 start-100 translate-middle badge rounded-circle bg-danger">new</span>
                  </Link></li>
                  <li className="nav-item"><Link className="nav-link custom-link" to="/favorites">收藏</Link></li>
                  <li className="nav-item"><Link className="nav-link custom-link" to="/profile">個人資訊</Link></li>
                  <li className="nav-item"><Link className="nav-link custom-link" to="/admin">後台管理</Link></li>
                  <li className="nav-item"><ToggleTheme /></li>
            </ul>
            <form className="d-flex me-2">
              <input class="form-control me-2" type="search" placeholder="搜尋..." aria-label="Search" />
              <button class="btn btn-outline-secondary" type="submit">Search</button>
            </form>
            <Link className="custom-link" to="/admin">登入</Link>
          </div>
        </div>
      </nav>
  );
}

export default Navbar