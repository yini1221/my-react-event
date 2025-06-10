import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: 呼叫登入 API
    alert(`登入帳號：${form.email}`);
    // 登入成功後導向首頁
    navigate("/home");
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
          />
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
