import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">Logo</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item"><Link className="nav-link" to="home">首頁</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/events">活動</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/favorites">收藏</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/profile">個人資訊</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/admin">後台管理</Link></li>
          </ul>
          <form class="d-flex ms-auto">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button class="btn btn-outline-secondary" type="submit">Search</button>
          </form>
        </div>
        <Link className="text-white-50" to="/admin">登入</Link>
      </div>
    </nav>
  );
}

export default Navbar