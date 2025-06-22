import { NavLink } from 'react-router-dom';
import '../css/adminNavbar.css';

function AdminNavbar () {
  return (
    <ul className="list-unstyled bg-light vh-100 d-flex flex-column gap-4 border border-top-0 p-3">
      <li className='mt-5'>
        <NavLink to="/admin/registrations" className={({ isActive }) =>
                  (isActive ? 'active ' : '') + 'nav-link p-1' }>
          報名管理
        </NavLink>
      </li>
      <li>
        <NavLink to="/admin/events" className={({ isActive }) =>
                  (isActive ? 'active ' : '') + 'nav-link p-1' }>
          活動管理
        </NavLink>
      </li>
      <li>
        <NavLink to="/admin/event-categories" className={({ isActive }) =>
                  (isActive ? 'active ' : '') + 'nav-link p-1' }>
          活動分類管理
        </NavLink>
      </li>
      <li>
        <NavLink to="/admin/members" className={({ isActive }) =>
                  (isActive ? 'active ' : '') + 'nav-link p-1' }>
          會員管理
        </NavLink>
      </li>
      {/* <li>
        <NavLink to="/admin/dashboard" className={({ isActive }) =>
                  (isActive ? 'active ' : '') + 'nav-link p-1' }>
          後台儀表板
        </NavLink>
      </li> */}
    </ul>
  )
}

export default AdminNavbar;
