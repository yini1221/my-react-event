import { Link } from 'react-router-dom';
import ToggleTheme from './ToggleTheme';

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
            <li className="nav-item"><ToggleTheme /></li>
          </ul>
          <form className="d-flex g-3 align-items-center">
            <input className="col-auto form-control" type="search" placeholder="搜尋..." aria-label="Search" />
            <button className="col-auto btn btn-outline-secondary" type="submit">搜尋</button>
          </form>
        </div>
        <Link className="custom-link" to="/admin">登入</Link>
      </div>
    </nav>
  );
}

export default Navbar