import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

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
            }
        } catch (err) {
            console.error('提交錯誤:', err);
            alert('註冊時發生錯誤，請稍後再試');
        }
    };

    return (
    <div className="container mt-5">
      <h2>註冊</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>暱稱</label>
          <input 
            type="text" 
            name="username" 
            value={form.username} 
            onChange={handleChange} 
            className="form-control" 
            required 
            autoFocus 
            placeholder="請輸入您的暱稱"
          />
        </div>
        <div className="mb-3">
          <label>帳號 (Email)</label>
          <input 
            type="email" 
            name="email" 
            value={form.email} 
            onChange={handleChange} 
            className="form-control" 
            required 
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
        <button type="submit" className="btn btn-primary">註冊</button>
      </form>
      <p style={{ marginTop: 10 }}>
        已經有帳號？{" "}
        <span>
          <Link to="/auth/login" className="link-info fs-6" aria-current="register">登入</Link>
        </span>
      </p>
    </div>
  );
}

export default RegistrationForm;