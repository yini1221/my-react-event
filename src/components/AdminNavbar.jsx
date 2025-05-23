import { Link } from 'react-router-dom';

function AdminNavbar () {

    return(
        <ul className="list-unstyled bg-light vh-100 d-flex flex-column gap-5 border border-top-0">
            <li className='mt-5'>
                <Link to="/admin/registrations" className='custom-link'>報名管理</Link>
            </li>
            <li>
                <Link to="/admin/events" className='custom-link'>活動管理</Link>
            </li>
            <li>
                <Link to="/admin/event-categories" className='custom-link'>活動分類管理</Link>
            </li>
            <li>
                <Link to="/admin/members" className='custom-link'>會員管理</Link>
            </li>
            <li>
                <Link to="/admin/dashboard" className='custom-link'>後台儀表板</Link>
            </li>
            <li>
                <Link to="/admin/dashboard" className='custom-link'>後台儀表板</Link>
            </li>
        </ul>
    )
}

export default AdminNavbar