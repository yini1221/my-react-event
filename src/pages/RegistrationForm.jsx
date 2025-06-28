import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import '../css/registrationForm.css';

const API_URL = 'http://localhost:8084/auth/register'; // 後台 API

function RegistrationForm() {

    const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);  
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
        ...prev, 
        [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        if (form.confirmPassword !== form.password) {
          setErrorMessage('輸入密碼不一致');
          setForm(prev => ({
              ...prev,
              password: '',
              confirmPassword: ''
            }));
          setLoading(false);
          return;
        }

        try {
            const res = await fetch(API_URL, {
              method: 'POST', 
              headers: { 'Content-Type': `application/json`},
              body: JSON.stringify(form)
            });
            const result = await res.json();            
            if (res.ok) {
              setForm({ username: '', email: '', password: '', confirmPassword: '' });
              setMessage(result.message || '註冊成功! ');
              setErrorMessage('');
            } else {
              setErrorMessage(result.data || result.message || '註冊失敗');
              setForm(prev => ({
              ...prev,
              password: '',
              confirmPassword: ''
            }));
          }
        } catch (err) {
            console.error('提交錯誤:', err);
            setErrorMessage('系統錯誤，請稍後再試');
        } finally {
          setLoading(false);
        }
    };

    const toggleShowPassword = () => {
      setShowPassword(prev => !prev);
    };

    const toggleShowConfirmPassword = () => {
      setShowConfirmPassword(prev => !prev);
    };

    return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-logout">
      <div className="card shadow-sm p-4 bg-logout-table" style={{ maxWidth: "380px", width: "100%", borderRadius: "12px" }}>
        <h2 className="mb-4 text-center main-color" style={{ fontWeight: "700" }}>註冊</h2>
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
        {message && (
          <div className="alert alert-success py-2 px-3 text-center" role="alert">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3 text-start">
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="form-control form-control-lg bg-form"
              required
              autoFocus
              placeholder="會員暱稱"
              style={{ borderColor: "#7A4E2E" }}
            />
            <small className="ms-2 main-color" style={{ fontSize: "0.85rem" }}>
              暱稱不可超過8個字元
            </small>
          </div>

          <div className="mb-3 text-start">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-control form-control-lg bg-form"
              required
              placeholder="電子郵件"
              style={{ borderColor: "#7A4E2E" }}
            />
            <small className="ms-2 main-color" style={{ fontSize: "0.85rem" }}>
              註冊後將發送信箱驗證
            </small>
          </div>

          <div className="mb-4 text-start">
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="form-control form-control-lg bg-form"
                required
                placeholder="會員密碼"
                style={{ borderColor: "#7A4E2E" }}
                minLength={8}
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
          <small className="ms-2 main-color" style={{ fontSize: "0.85rem" }}>
            最少輸入8位英數字組合
          </small>
        </div>

          <div className="mb-4 text-start">
            <div className="position-relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="form-control form-control-lg bg-form"
                required
                placeholder="再次輸入密碼"
                style={{ borderColor: "#7A4E2E" }}
                minLength={8}
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
              aria-label={showConfirmPassword ? "隱藏密碼" : "顯示密碼"}
              >
                <img
                src={showConfirmPassword ? `${import.meta.env.BASE_URL}images/hide.png` : `${import.meta.env.BASE_URL}images/eye.png`}
                alt={showConfirmPassword ? "隱藏密碼" : "顯示密碼"}
                style={{ height: '30px', width: '30px' }}/>
              </button>
          </div>
            <small className="ms-2 main-color" style={{ fontSize: "0.85rem" }}>
              密碼須一致
            </small>
          </div>

          <button
            type="submit"
            className="btn btn-login w-100"
            style={{
              backgroundColor: "#7A4E2E",
              color: "#fff",
              borderRadius: "8px",
              fontWeight: "600",
              border: "none",
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#5b3a1a"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "#7A4E2E"}
            disabled={loading}
          >
            {loading ? '處理中...' : '註冊'}            
          </button>
        </form>

        <p className="text-center main-color mt-4 mb-0" style={{ fontSize: "0.9rem" }}>
          已經有帳號？{" "}
          <Link to="/auth/login" className="fw-semibold">
            登入
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegistrationForm;