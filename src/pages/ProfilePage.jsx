import { Link, useParams, useNavigate } from 'react-router-dom';
import '../css/profilePage.css';
import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:8084/user/profile'; // 後台 API

function ProfilePage({ onUsernameChange }) {

  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState('');
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirmPassword: ''});
  const [editingUsername, setEditingUsername] = useState(false); // 編輯暱稱模式
  const [editingPassword, setEditingPassword] = useState(false); // 編輯密碼模式
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.id : null;
  
  const fetchUser = async() => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        credentials: 'include',
      })
      const result = await res.json();
      console.log('API 回傳內容：', result);
      setProfile(result.data);
    } catch (err) {
      console.error('讀取錯誤:', err);
    }
  }

  useEffect(() => {
      if (!userId) {
          alert('請先登入');
          navigate('/auth/login');
          return;
      }
      fetchUser();
  }, [userId])

  const handlePasswordChange = (e) => {
    setPasswords(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async () => {
    try {
          const url = `${API_URL}/${id}/username`;
          const res = await fetch(url, {
              method: 'PATCH', 
              credentials: "include",
              headers: { 'Content-Type': `application/json`},
              body: JSON.stringify({ username })
          });
          const result = await res.json();
          if (res.ok) {
              await fetchUser(); // 重新查詢所有分類
              setUsername('');
              setEditingUsername(false);
              if(onUsernameChange) {
                onUsernameChange(username);
              }
          } else {
              alert(result.message || '修改暱稱失敗');
          }
      } catch (err) {
          console.error('提交錯誤:', err);
      };
  }

  const handlePasswordSubmit = async () => {
    try {
          const url = `${API_URL}/${id}/password`;
          const res = await fetch(url, {
              method: 'PATCH', 
              credentials: "include",
              headers: { 'Content-Type': `application/json`},
              body: JSON.stringify(passwords)
          });
          const result = await res.json();
          if (res.ok) {
              await fetchUser(); // 重新查詢所有分類
              setPasswords({ oldPassword: '', newPassword: '', confirmPassword: ''});
              setEditingPassword(false);
          } else {
              alert(result.message || '修改密碼失敗');
          }
      } catch (err) {
          console.error('提交錯誤:', err);
      };
  }

  if (!profile) return <p>載入中...</p>;
  
  return (
      <div className="container-fluid">
        <div className='mx-auto bd-profile bg-gradient rounded-5 m-5 p-4' style={{'maxWidth': '1080px'}}>
          <div className='w-50 mx-auto'>
            <h2 className='text-secondary'>個人資訊</h2>
            <img src={`${import.meta.env.BASE_URL}images/personal-information.png`} style={{ width: '150px' }} alt="profile" />
            <ul className='d-flex flex-column gap-3 list-unstyled mt-3'>
              <li className='fs-sm'>會員編號：{profile.id}</li>
              <li>
                {
                  editingUsername ? (
                    <form className='d-flex'>
                      <input className='form-control w-50 ms-auto me-2' 
                      type="text" name="username" 
                      value={username} 
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="請輸入暱稱" required />
                      <div>
                        <button onClick={() => handleSubmit()} type='button' className='me-2 p-2'>確認</button>
                        <button onClick={() => setEditingUsername(false)} type='button' className='fs-6 p-2'>取消</button>
                      </div>  
                    </form>
                  ) 
                  :
                  <div>
                    暱稱：{profile.username}
                    <span className='fs-sm'> ({profile.roleName})</span>
                    <span onClick={() => { setUsername(profile.username); setEditingUsername(true); }} type='button' className='btn fs-6 p-0 px-3'>
                        <img src={`${import.meta.env.BASE_URL}images/pencil.png`} style={{ width: '25px' }} />
                    </span>
                  </div>
                }
              </li>
              <li>信箱：{profile.email}</li>
              <li>加入時間：{profile.createdAt}</li>
              {/* 更改密碼按鈕 */}
              <li className='d-flex justify-content-center gap-2'>
                {editingPassword ? (
                  <form className='d-flex flex-column align-items-center gap-2' onSubmit={e => { e.preventDefault(); handlePasswordSubmit(); }}>
                    <input
                      type="password"
                      name="oldPassword"
                      value={passwords.oldPassword}
                      onChange={handlePasswordChange}
                      placeholder="舊密碼"
                      required
                      className="form-control w-75"
                    />
                    <input
                      type="password"
                      name="newPassword"
                      value={passwords.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="新密碼"
                      required
                      className="form-control w-75"
                    />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwords.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="確認新密碼"
                      required
                      className="form-control w-75"
                    />
                    <div>
                      <button type="submit" className="btn btn-primary me-2">確認</button>
                      <button type="button" className="btn btn-secondary" onClick={() => setEditingPassword(false)}>取消</button>
                    </div>
                  </form>
                ) : (
                  <button className="btn btn-outline-secondary" onClick={() => setEditingPassword(true)}>更改密碼</button>
                )}
              </li>
              <li><Link className="btn btn-outline-secondary" to={`/user/${userId}/registrations`}>查看報名紀錄</Link></li>
            </ul>
          </div>
        </div>
      </div>      
  );
}

export default ProfilePage