import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import '../css/loginPage.css';

const API_URL = 'http://localhost:8084/auth'; // 後台 API

function LoginPage({ onLoginSuccess  }) {
  const [form, setForm] = useState({ email: '', password: '', authCode: '' });
  const [captchaImg, setCaptchaImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
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
        setForm(prev => ({ ...prev, authCode: '' }));
      } else {
        console.error("載入驗證碼失敗：", result);
        setForm(prev => ({ ...prev, authCode: '' }));
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
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST', 
        credentials: "include",
        headers: { 'Content-Type': `application/json`},
        body: JSON.stringify(form)
      })
      const result = await res.json(); 
      if (res.ok) {
        setShowSuccess(true);
        const { userdto } = result.data;
        console.log('登入回應結果:', result);
        localStorage.setItem('user', JSON.stringify({ id: userdto.id, username: userdto.username, role: userdto.role }));
        onLoginSuccess(userdto);
        setTimeout(() => {
          setShowSuccess(false);
          navigate(from, { replace: true });
        }, 2500);
        setErrorMessage('');
      } else {
        setErrorMessage(result.data || result.message || '登入失敗');
        console.log('result: ', result)
        setForm(prev => ({
                ...prev,
                authCode: ''
        }));
        setLoading(false);
        loadCaptcha();
      }
    } catch (err) {
      console.error('登入時發生錯誤:', err);
      setErrorMessage('系統錯誤，請稍後再試');
      loadCaptcha();    
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleOAuthLogin = (provider) => {
    setLoading(true);
    try {      
      window.location.href = `http://localhost:8084/oauth2/authorization/${provider}`;
    } catch (err) {
      console.log('登入失敗: ', err)
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-login">
      <div className="card shadow-sm p-4 bg-login-table" style={{ maxWidth: "380px", width: "100%", borderRadius: "12px" }}>
        <div className="text-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#7A4E2E" className="bi bi-lock-fill" viewBox="0 0 16 16">
            <path d="M2.5 9a2.5 2.5 0 0 1 5 0v1h-5v-1zM8 1a3 3 0 0 0-3 3v3h6V4a3 3 0 0 0-3-3zM1 8v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8H1z"/>
          </svg>
          <h3 className="mt-2 fw-bold main-color">會員登入</h3>
        </div>
        {errorMessage && Array.isArray(errorMessage) ? (
          <div className="alert alert-danger py-2 px-3" role="alert">
            <ul className="mb-0 list-unstyled">
              {errorMessage.map((msg, idx) => (
                <li key={idx}>{msg}</li>
              ))}
            </ul>
          </div>
        ) : errorMessage ? (
          <div className="alert alert-danger py-2 px-3" role="alert">
            {errorMessage}
          </div>
        ) : null}
        {showSuccess && (
          <div className="alert alert-success py-2 px-3 text-center" role="alert">
            登入成功！即將跳轉到首頁...
          </div>
        )}
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-control form-control-lg bg-form"
              required
              autoFocus
              placeholder="電子郵件"
              style={{ borderColor: "#7A4E2E" }}
            />
          </div>

          <div className="mb-3">
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="form-control form-control-lg bg-form"
                required
                placeholder="密碼"
                style={{ borderColor: "#7A4E2E" }}
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="position-absolute top-50 end-0 translate-middle-y"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#7A4E2E"
                }}
              aria-label={showPassword ? "隱藏密碼" : "顯示密碼"}>
                <img
                  src={showPassword ? `${import.meta.env.BASE_URL}images/hide.png` : `${import.meta.env.BASE_URL}images/eye.png`}
                  alt={showPassword ? "隱藏密碼" : "顯示密碼"}
                  style={{ height: '30px', width: '30px' }}/>
              </button>
            </div>
          </div>

          <div className="d-flex align-items-center mb-3 gap-2">
            <input
              id="authcode"
              name="authCode"
              type="text"
              value={form.authCode}
              onChange={handleChange}
              className="form-control form-control-lg flex-grow-1 bg-form"
              placeholder="驗證碼"
              required
              style={{ maxWidth: "130px", borderColor: "#7A4E2E" }}
            />
            <img
              src={captchaImg}
              alt="驗證碼"
              title="點擊重新取得驗證碼"
              onClick={loadCaptcha}
              style={{ cursor: "pointer", height: "42px", borderRadius: "6px", border: "1px solid #7A4E2E", opacity: .7 }}
            />            
            <Link onClick={loadCaptcha} >
              <img src={`${import.meta.env.BASE_URL}images/update.png`} style={{ maxWidth: "20px" }}/>
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn-login w-100 mb-3"
            style={{
              backgroundColor: "#7A4E2E",
              color: "#fff",
              borderRadius: "8px",
              fontWeight: "600",
              border: "none",
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#5b3a1a"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "#7A4E2E"}
          >
            {loading ? '登入中...' : '登入'}
          </button>
        </form>
        <button
          onClick={() => handleOAuthLogin("github")}
          className="btn btn-login w-100 d-flex align-items-center justify-content-center gap-2"
          style={{
            color: "#fff",
            borderRadius: "8px",
            border: "none",
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = "#7A4E2E"}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = "#5b3a1a"}
        >
          <img
            src={`${import.meta.env.BASE_URL}images/github.png`}
            alt="GitHub"
            style={{ width: "24px", height: "24px" }}
          />
          <span>{loading ? '登入中...' : '使用 GitHub 登入'}</span>
        </button>
        <p className="text-center main-color mt-4 mb-0" style={{ fontSize: "0.9rem" }}>
          還沒有帳號？{" "}
          <Link to="/auth/register" className="main-color fw-semibold">
            註冊
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;