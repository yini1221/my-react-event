import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import '../css/registrationForm.css';

const API_URL = 'http://localhost:8084/auth/register'; // 後台 API

function RegistrationForm() {

    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
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
        try {
            const res = await fetch(API_URL, {
              method: 'POST', 
              headers: { 'Content-Type': `application/json`},
              body: JSON.stringify(form)
            });
            const result = await res.json();            
            if (res.ok) {
              setShowSuccess(true);
              setForm({ username: '', email: '', password: '' });
              setErrorMessage('');
              setTimeout(() => {
                setShowSuccess(false);
                navigate("/auth/login");
              }, 2500);
            } else {
              setErrorMessage(result.message || '註冊失敗');
              setForm(prev => ({
              ...prev,
              email: '',
              password: ''
            }));
          }
        } catch (err) {
            console.error('提交錯誤:', err);
            setErrorMessage('系統錯誤，請稍後再試');
        } finally {
          setLoading(false);
        }
    };

    return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#f7ede1" }}>
      <div className="card shadow-sm p-4" style={{ maxWidth: "380px", width: "100%", borderRadius: "12px", backgroundColor: "#e6ddd3" }}>
        <h2 className="mb-4 text-center" style={{ color: "#7A4E2E", fontWeight: "700" }}>註冊</h2>
        {errorMessage && (
          <div className="alert alert-danger py-2 px-3" role="alert">
            {errorMessage}
          </div>
        )}
        {showSuccess && (
          <div className="alert alert-success py-2 px-3 text-center" role="alert">
            註冊成功！即將跳轉到登入頁...
          </div>
        )}
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3 text-start">
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="form-control form-control-lg"
              required
              autoFocus
              placeholder="會員暱稱"
              style={{ borderColor: "#7A4E2E" }}
              maxLength={8}
            />
            <small className="ms-2" style={{ color: "#7A4E2E", fontSize: "0.85rem" }}>
              最多不超過8位數
            </small>
          </div>

          <div className="mb-3 text-start">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-control form-control-lg"
              required
              placeholder="電子郵件"
              style={{ borderColor: "#7A4E2E" }}
            />
            <small className="ms-2" style={{ color: "#7A4E2E", fontSize: "0.85rem" }}>
              註冊後將發送信箱驗證
            </small>
          </div>

          <div className="mb-4 text-start">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="form-control form-control-lg"
              required
              placeholder="會員密碼"
              style={{ borderColor: "#7A4E2E" }}
              minLength={8}
            />
            <small className="ms-2" style={{ color: "#7A4E2E", fontSize: "0.85rem" }}>
              最少輸入8位英數字組合
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

        <p className="text-center mt-4 mb-0" style={{ fontSize: "0.9rem", color: "#7A4E2E" }}>
          已經有帳號？{" "}
          <Link to="/auth/login" style={{ color: "#7A4E2E", textDecoration: "underline", fontWeight: "600" }}>
            登入
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegistrationForm;