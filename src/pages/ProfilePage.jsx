import { Link } from 'react-router-dom';
import '../css/profilePage.css';

function ProfilePage() {
  
  return (
      <div className="container-fluid">
        <div className='bd-profile bg-gradient rounded-5 m-5 p-4'>
          <h2 className='text-secondary'>個人資訊</h2>
          <img src={`${import.meta.env.BASE_URL}images/personal-information.png`} style={{ width: '150px' }} alt="profile" />
          <ul className='d-flex flex-column gap-3 list-unstyled mt-3'>
            <li className='fs-sm'>會員編號：004001</li>
            <li>暱稱：Yini <span className='fs-sm'>(管理員)</span></li>
            <li>手機：0988888888</li>
            <li>信箱：yini@gmail.com</li>
            <li>加入時間：2025/05/23</li>
            <li className='d-flex justify-content-center gap-2'>
              <a className='btn btn-outline-secondary'>編輯個人資料</a>
              <a className='btn btn-outline-secondary'>更改密碼</a>  
            </li>
            <li><Link className="btn btn-outline-secondary" to="/events">查看報名紀錄</Link></li>
          </ul>
        </div>
      </div>      
  );
}

export default ProfilePage