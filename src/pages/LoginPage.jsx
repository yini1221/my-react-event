import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import '../css/loginPage.css';

const API_URL = 'http://localhost:8084/auth'; // 後台 API

function LoginPage({ onLoginSuccess  }) {
  const [form, setForm] = useState({ email: '', password: '', authCode: '' });
  const [captchaImg, setCaptchaImg] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/home';

  const loadCaptcha = async () => {
    try {
      const res = await fetch(`${API_URL}/authcode`, {
        credentials: "include"
      });
      const result = await res.json();
      if (res.ok && result.data?.image) {
        setCaptchaImg(`data:image/jpeg;base64,${result.data.image}`);
        setForm({ password: '', authCode: '' })
      } else {
        console.error("載入驗證碼失敗：", result);
        setForm({ password: '', authCode: '' })
        return;
      }
    } catch (err) {
      console.error('載入驗證碼失敗:', err);
    }
  }

  useEffect(() => {
    loadCaptcha();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST', 
        credentials: "include",
        headers: { 'Content-Type': `application/json`},
        body: JSON.stringify(form)
      })
      const result = await res.json(); 
      if (res.ok) {
        const { userdto } = result.data;
        console.log('登入回應結果:', result);
        alert('登入成功！');
        localStorage.setItem('user', JSON.stringify({ id: userdto.id, username: userdto.username, role: userdto.role }));
        onLoginSuccess(userdto);
        navigate(from, { replace: true });
      } else {
        alert('登入失敗！' + result.message);
        loadCaptcha();
      }   
    } catch (err) {
      console.error('登入時發生錯誤:', err);
      loadCaptcha();    
    }
  };

  return (
    <div className="container mt-5">
      <div className="mx-auto" style={{'maxWidth': '270px'}}>
        <img src={`${import.meta.env.BASE_URL}images/personal-information.png`} style={{ width: '150px' }} alt="profile" />
        <form onSubmit={handleSubmit}>
          <div>
            <input 
              type="email" 
              name="email" 
              value={form.email} 
              onChange={handleChange} 
              className="form-control" 
              required 
              autoFocus 
              placeholder="電子郵件"
            />
          </div>
          <div>
            <input 
              type="password" 
              name="password" 
              value={form.password} 
              onChange={handleChange} 
              className="form-control" 
              required 
              placeholder="密碼"
            />
          </div>
          <div className='d-flex mb-2'>
            <input 
              id="authcode" 
              name="authCode" 
              type="text" 
              value={form.authCode} 
              onChange={handleChange}
              className="form-control" 
              placeholder="驗證碼" 
              style={{'height': '38px'}}
              required />
            <img className="border" src={captchaImg} onClick={loadCaptcha} valign="middle" title="點擊重新取得驗證碼" alt="驗證碼" />
          </div>
          <button type="submit" className="btn-login">登入</button>
        </form>
        <p style={{ marginTop: 10 }}>
          還沒有帳號？{" "}
          <span>
            <Link to="/auth/register" className="link-info fs-6" aria-current="register">註冊</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;