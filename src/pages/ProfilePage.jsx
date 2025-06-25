import { Link } from 'react-router-dom';
import '../css/profilePage.css';
import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:8084/user/profile'; // 後台 API

function ProfilePage({ onUsernameChange }) {

  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState('');
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirmPassword: ''});
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);  
  const [editingUsername, setEditingUsername] = useState(false); // 編輯暱稱模式
  const [editingPassword, setEditingPassword] = useState(false); // 編輯密碼模式

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.id : null;
  
  const fetchUser = async() => {
    try {
      const res = await fetch(`${API_URL}/${userId}`, {
        credentials: 'include',
      })
      const result = await res.json();
      setProfile(result.data);
    } catch (err) {
      console.error('讀取錯誤:', err);
    }
  }

  useEffect(() => {
      fetchUser();
  }, [userId])

  const handlePasswordChange = (e) => {
    setPasswords(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async () => {
    try {
          const url = `${API_URL}/${userId}/username`;
          const res = await fetch(url, {
              method: 'PATCH', 
              credentials: "include",
              headers: { 'Content-Type': `application/json`},
              body: JSON.stringify({ username })
          });
          const result = await res.json();
          if (res.ok) {
              await fetchUser();
              alert(result.message);
              setUsername('');
              setEditingUsername(false);
              if(onUsernameChange) {
                onUsernameChange(username);
              }
          } else {
              setErrorMessage(result.data || result.message || '修改失敗');
          }
      } catch (err) {
          console.error('提交錯誤:', err);
      };
  }

  const handlePasswordSubmit = async () => {
    try {
          const url = `${API_URL}/${userId}/password`;
          const res = await fetch(url, {
              method: 'PATCH', 
              credentials: "include",
              headers: { 'Content-Type': `application/json`},
              body: JSON.stringify(passwords)
          });
          const result = await res.json();
          if (res.ok) {
              setShowSuccess(true);
              setPasswords({ oldPassword: '', newPassword: '', confirmPassword: ''});
              setTimeout(() => {
                setShowSuccess(false);
                setEditingPassword(false);
              }, 2500);
              await fetchUser();
          } else {
            setErrorMessage(result.message || '修改密碼失敗');
          }
      } catch (err) {
          console.error('提交錯誤:', err);
      };
  }

  const toggleShowOldPassword = () => {
    setShowOldPassword(prev => !prev);
  };
  
  const toggleShowNewPassword = () => {
    setShowNewPassword(prev => !prev);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(prev => !prev);
  };

  if (!profile) return <p>載入中...</p>;
  
  return (
    <div className="container my-5">
      <div className="card shadow rounded-4 p-4 mx-auto bg-profile" style={{ maxWidth: '600px'}}>
        <div className="text-center mb-4">
          <h2 className="text-muted fw-bold">個人資訊</h2>
          <img
            src={`${import.meta.env.BASE_URL}images/personal-information2.png`}
            alt="profile"
            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
          />
        </div>

        <ul className="list-unstyled d-flex flex-column gap-4 px-3">
          <li className="fs-6 text-muted">會員編號：<span className="fs-6 fw-semibold">{profile.id}</span></li>
          <li>
            {editingUsername ? (<>
              {errorMessage && (
                    <div className="alert alert-danger py-2 px-3 w-50 mx-auto" role="alert">
                      {errorMessage}
                    </div>
                  )}
              <form
                className="d-flex justify-content-center align-items-center gap-3"
                onSubmit={e => { e.preventDefault(); handleSubmit(); }}
              >
                <input
                  className="form-control w-50 border-profile"
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="請輸入暱稱"
                  required
                />
                <button type="submit" className="btn btn-profile px-3">確認</button>
                <button type="button" className="btn btn-profile px-3" onClick={() => { setEditingUsername(false); setErrorMessage('')}}>取消</button>
              </form>
              </>
            ) : (
              <div className="d-flex align-items-center justify-content-center gap-3 fs-5">
                <span className='fs-6 text-muted'>暱稱：<strong>{profile.username} </strong> 
                  <small className="text-muted">
                     ({
                      profile.role === 'ADMIN' ? '管理員' 
                      : profile.role === 'MEMBER' ? '一般會員' : profile.role
                     })

                  </small>
                </span>
                <button
                  type="button"
                  className="btn btn-link p-0"
                  onClick={() => { setUsername(profile.username); setEditingUsername(true); }}
                  aria-label="編輯暱稱"
                  title="編輯暱稱"
                >
                  <img src={`${import.meta.env.BASE_URL}images/pencil.png`} alt="edit" style={{ width: '25px' }} />
                </button>
              </div>
            )}
          </li>
          <li className="fs-6 text-muted">信箱：<span className="fs-6 fw-semibold">{profile.email}</span></li>
          <li className="fs-6 text-muted">加入時間：<span className="fs-6 fw-semibold">{new Date(profile.createdAt).toLocaleDateString()}</span></li>
          <li className="d-flex flex-column align-items-center gap-3">
            {
              profile.authProvider === 'github' ?               
                <p className="m-0 text-muted alert alert-danger">您是第三方登入用戶，無法修改密碼。<br/>如需更改密碼，請至第三方平台操作。</p>
                :
                editingPassword ? (
                  <>
                  {errorMessage && (
                    <div className="alert alert-danger py-2 px-3 m-0" role="alert">
                      {errorMessage}
                    </div>
                  )}
                  {( showSuccess &&
                    <div className="alert alert-success py-2 px-3 m-0" role="alert">
                      修改成功！請稍後...
                    </div>
                  )}
                  <form
                    className="d-flex flex-column align-items-center gap-3 w-100"
                    onSubmit={e => { e.preventDefault(); handlePasswordSubmit(); }}
                  >
                    <div className="position-relative">
                      <input
                        type={showOldPassword ? "text" : "password"}
                        name="oldPassword"
                        value={passwords.oldPassword}
                        onChange={handlePasswordChange}
                        placeholder="舊密碼"
                        required
                        className="form-control  border-profile text-secondary"
                      />
                      <button
                        type="button"
                        onClick={toggleShowOldPassword}
                        className="position-absolute top-50 end-0 translate-middle-y"
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#7A4E2E"
                        }}
                        aria-label={showOldPassword ? "隱藏密碼" : "顯示密碼"}>
                      <img
                        src={showOldPassword ? `${import.meta.env.BASE_URL}images/hide.png` : `${import.meta.env.BASE_URL}images/eye.png`}
                        alt={showOldPassword ? "隱藏密碼" : "顯示密碼"}
                        style={{ height: '30px', width: '30px' }}/>
                    </button>
                  </div>

                  <div className="position-relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      value={passwords.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="新密碼"
                      required
                      className="form-control border-profile"
                    />
                    <button
                        type="button"
                        onClick={toggleShowNewPassword}
                        className="position-absolute top-50 end-0 translate-middle-y"
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#7A4E2E"
                        }}
                        aria-label={showNewPassword ? "隱藏密碼" : "顯示密碼"}>
                      <img
                        src={showNewPassword ? `${import.meta.env.BASE_URL}images/hide.png` : `${import.meta.env.BASE_URL}images/eye.png`}
                        alt={showNewPassword ? "隱藏密碼" : "顯示密碼"}
                        style={{ height: '30px', width: '30px' }}/>
                    </button>
                  </div>

                  <div className="position-relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={passwords.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="確認新密碼"
                      required
                      className="form-control border-profile"
                    />
                    <button
                        type="button"
                        onClick={toggleShowConfirmPassword}
                        className="position-absolute top-50 end-0 translate-middle-y"
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#7A4E2E"
                        }}
                        aria-label={showConfirmPassword ? "隱藏密碼" : "顯示密碼"}>
                      <img
                        src={showConfirmPassword ? `${import.meta.env.BASE_URL}images/hide.png` : `${import.meta.env.BASE_URL}images/eye.png`}
                        alt={showConfirmPassword ? "隱藏密碼" : "顯示密碼"}
                        style={{ height: '30px', width: '30px' }}/>
                    </button>
                  </div>
                    <div className="d-flex gap-3">
                      <button type="submit" className="btn btn-profile px-4">確認</button>
                      <button type="button" className="btn btn-profile px-4" onClick={() => { setEditingPassword(false); setErrorMessage('') }}>取消</button>
                    </div>
                  </form>
                  </>
                ) : (
                  <button className="btn btn-profile px-4" onClick={() => setEditingPassword(true)}>更改密碼</button>
                )
            }
          </li>
          <li className="text-center">
            <Link to={`/user/${userId}/registrations`} className="btn btn-profile px-4">
              查看報名紀錄
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProfilePage;