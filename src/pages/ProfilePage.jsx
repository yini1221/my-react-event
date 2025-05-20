import { Link } from 'react-router-dom';

function ProfilePage() {
  
  return (
      <div className="container mt-4">
        <h1>個人資訊</h1>
        <img src="https://fakeimg.pl/200x200/ECF5FF?text=200x200" alt="profile" />
        <ul className='d-flex flex-column gap-3 list-unstyled mt-3'>
          <li>會員編號</li>
          <li>暱稱</li>
          <li>生日</li>
          <li>手機</li>
          <li>信箱</li>
          <li><button className='btn btn-outline-secondary'>編輯個人資料</button></li>
          <li><Link className="btn btn-outline-secondary" to="/events">報名紀錄</Link></li>
        </ul>
      </div>      
  );
}

export default ProfilePage