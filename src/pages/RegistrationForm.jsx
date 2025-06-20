import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import '../css/registrationForm.css';

const API_URL = 'http://localhost:8084/auth/register'; // 後台 API

function RegistrationForm() {

    const [form, setForm] = useState({ username: '', email: '', password: '' });
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
        try {
            const res = await fetch(API_URL, {
              method: 'POST', 
              headers: { 'Content-Type': `application/json`},
              body: JSON.stringify(form)
            });
            const result = await res.json();            
            if (res.ok) {
                alert(`註冊成功！暱稱：${form.username}，帳號：${form.email}`);
                setForm({ username: '', email: '', password: '' })
                navigate("/auth/login");
            } else {
                alert(result.message || '操作失敗');
                setForm({ username: '', email: '', password: '' })
            }
        } catch (err) {
            console.error('提交錯誤:', err);
            alert('註冊時發生錯誤，請稍後再試');
        }
    };

    return (
    <div className="container-fluid mt-5">
      <div className="mx-auto" style={{'maxWidth': '270px'}}>
        <h2>註冊</h2>
        <form onSubmit={handleSubmit}>
          <div className="text-start">
            <input 
              type="text" 
              name="username" 
              value={form.username} 
              onChange={handleChange} 
              className="form-control" 
              required 
              autoFocus 
              placeholder="會員暱稱"
            />
            <span className="ms-3 text-registration">最多不超過8位數</span>
          </div>
          <div className="text-start">
            <input 
              type="email" 
              name="email" 
              value={form.email} 
              onChange={handleChange} 
              className="form-control" 
              required 
              placeholder="電子郵件"
            />
            <span className="ms-3 text-registration">註冊後將發送信箱驗證</span>
          </div>
          <div className="mb-2 text-start">
            <input 
              type="password" 
              name="password" 
              value={form.password} 
              onChange={handleChange} 
              className="form-control" 
              required 
              placeholder="會員密碼"
            />
            <span className="ms-3 text-registration">最少輸入8位英數字組合</span>
          </div>
          <button type="submit" className="btn-login">註冊</button>
        </form>
        <p style={{ marginTop: 10 }}>
          已經有帳號？{" "}
          <span>
            <Link to="/auth/login" className="link-info fs-6" aria-current="register">登入</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default RegistrationForm;