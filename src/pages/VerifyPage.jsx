// src/pages/VerifyPage.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8084/auth/verify';

function VerifyPage() {
  const { email } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('驗證中...');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function verify() {
      try {
        const res = await fetch(`${API_URL}/${encodeURIComponent(email)}`, {
          method: 'GET',
          credentials: 'include',
        });
        const result = await res.json();
        if (res.ok) {
          setMessage('驗證成功！將跳轉至登入畫面...');
          setTimeout(() => {
            navigate('/auth/login');
          }, 2000);
        } else {
          setError(result.message || '驗證失敗');
        }
      } catch (err) {
        setError('系統錯誤，請稍後再試');
      }
    }
    verify();
  }, [email, navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#f7ede1" }}>
      <div
        className="card shadow-sm p-4 text-center"
        style={{ maxWidth: "380px", width: "100%", borderRadius: "12px", backgroundColor: "#e6ddd3" }}
      >
        <div className="mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            fill={error ? "#dc3545" : "#7A4E2E"}
            className="bi bi-check-circle-fill"
            viewBox="0 0 16 16"
          >
            {error ? (
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.97 11.03a.75.75 0 0 0 1.07 0l3.992-3.992a.75.75 0 1 0-1.06-1.06L7.5 9.439 5.573 7.512a.75.75 0 0 0-1.06 1.06l2.457 2.457z" />
            ) : (
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.97 11.03a.75.75 0 0 0 1.07 0l3.992-3.992a.75.75 0 1 0-1.06-1.06L7.5 9.439 5.573 7.512a.75.75 0 0 0-1.06 1.06l2.457 2.457z" />
            )}
          </svg>
        </div>
        {error ? (
          <div className="alert alert-danger py-2 px-3" role="alert" style={{ fontWeight: "600" }}>
            {error}
          </div>
        ) : (
          <div className="alert alert-success py-2 px-3" role="alert" style={{ fontWeight: "600" }}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifyPage;
