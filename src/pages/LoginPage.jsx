import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = 'http://localhost:8084/auth'; // 後台 API

function LoginPage({ onLoginSuccess  }) {
  const [form, setForm] = useState({ email: '', password: '', authCode: '' });
  const [captchaImg, setCaptchaImg] = useState("");
  const navigate = useNavigate();

  const loadCaptcha = async () => {
    try {
      const res = await fetch(`${API_URL}/authcode`, {
        credentials: "include"
      });
      const result = await res.json();
      if (res.ok && result.data?.image) {
        setCaptchaImg(`data:image/jpeg;base64,${result.data.image}`);
      } else {
        console.error("載入驗證碼失敗：資料結構錯誤", result);
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
        navigate("/home"); // 登入成功後導向首頁
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
      <h2>登入</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>帳號 (Email)</label>
          <input 
            type="email" 
            name="email" 
            value={form.email} 
            onChange={handleChange} 
            className="form-control" 
            required 
            autoFocus 
            placeholder="請輸入電子郵件"
          />
        </div>
        <div className="mb-3">
          <label>密碼</label>
          <input 
            type="password" 
            name="password" 
            value={form.password} 
            onChange={handleChange} 
            className="form-control" 
            required 
            placeholder="請輸入密碼"
          />
        </div>
        <div className="mb-3">
					<label htmlFor="authcode">🔢 驗證碼</label>
					<input 
            id="authcode" 
            name="authCode" 
            type="text" 
            value={form.authCode} 
            onChange={handleChange}
            className="form-control" 
            placeholder="請輸入驗證碼" 
            required />
					<img src={captchaImg} onClick={loadCaptcha} valign="middle" title="點擊重新取得驗證碼" alt="驗證碼" />
				</div>
        <button type="submit" className="btn btn-primary">登入</button>
      </form>
      <p style={{ marginTop: 10 }}>
        還沒有帳號？{" "}
        <span>
          <Link to="/auth/register" className="link-info fs-6" aria-current="register">註冊</Link>
        </span>
      </p>
    </div>
  );
}

export default LoginPage;