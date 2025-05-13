import { Link } from 'react-router-dom';
import searchLogo from '/search.png';

function Navbar()
{
  return (
    <nav className="navbar navbar-expand navbar-dark bg-secondary" style={{ '--bs-bg-opacity': '.5' }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">Logo</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item"><Link className="nav-link custom-link" to="home">首頁</Link></li>
            <li className="nav-item"><Link className="nav-link custom-link" to="/events">活動</Link></li>
            <li className="nav-item"><Link className="nav-link custom-link" to="/favorites">收藏</Link></li>
            <li className="nav-item"><Link className="nav-link custom-link" to="/profile">個人資訊</Link></li>
            <li className="nav-item"><Link className="nav-link custom-link" to="/admin">後台管理</Link></li>
          </ul>
          <form className="d-flex ms-auto form-height">
            <input className="form-control me-1" type="search" placeholder="搜尋..." aria-label="Search" />
            <button className="btn btn-outline-secondary me-3 search" type="submit">搜尋
            </button>
          </form>
        </div>
        <Link className="custom-link" to="/admin">登入</Link>
      </div>
    </nav>
  );
}

export default Navbar