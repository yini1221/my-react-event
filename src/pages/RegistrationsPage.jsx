import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import '../css/registrationsPage.css';

const API_URL = 'http://localhost:8084/user'; // 後台 API

function RegistrationsPage() {

    const [events, setEvents] = useState([]);
    
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user.id : null;

    const fetchEvents = async () => {
        try {
            const res = await fetch(`${API_URL}/${userId}/registrations`, {
                credentials: "include"
            });
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const result = await res.json();
            setEvents(result.data || []);
        } catch (error) {
            console.error('讀取錯誤:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleCancel = async(registrationId) => {
        if (!window.confirm('確定要取消報名嗎？')) return;
        try {
            const res = await fetch(`${API_URL}/events/register/cancel/${registrationId}`,{
                method : 'PUT',
                headers: { 'Content-Type': `application/json`},
                credentials: "include",
                body: JSON.stringify()
            });
            const result = await res.json();
            if (res.ok) {
                alert('取消成功');
                fetchEvents();
            } else {
                alert(result.message || '取消失敗');
            }
        } catch (err) {
            console.error('刪除錯誤', err);
            alert('取消失敗，請稍後再試');
        }
    }

    const formatDateTime = (datetime, type) => {
    if (!datetime) return 'N/A';
    if (type === 'startTime' || type === 'endTime') {
        return dayjs(datetime).format('YYYY-MM-DD HH:mm');
        }
    return dayjs(datetime).format('YYYY-MM-DD HH:mm:ss');
    };

    return (
    <div className="container-fluid">
      <div className="px-3 mx-auto" style={{ maxWidth: '1080px' }}>
        <div className="p-4 d-flex flex-column align-items-center position-relative w-100">
          <div className="d-flex align-items-center mb-4 gap-2 border-bottom border-3 border-warning pb-2">
            <img src={`${import.meta.env.BASE_URL}images/processing-time.png`} alt="報名紀錄" style={{ width: '40px', filter: 'drop-shadow(0 0 3px #7A4E2E88)' }} />
            <h2 className="m-0 fw-bold" style={{ color: '#7A4E2E', fontSize: '2rem' }}>報名紀錄</h2>
          </div>
          <ul className="list-unstyled w-100">
            {events.map((event, index) => (
              <li
                key={index}
                className={`row w-100 bg-reg rounded-4 shadow p-3 mb-3 position-relative ${index !== events.length - 1 ? 'border-bottom' : ''}`}
              >
                <div className="col-md-5 d-flex justify-content-center align-items-center">
                  <img
                    className="rounded-4 shadow-sm"
                    src={`data:image/jpeg;base64,${event.imageBase64}`}
                    alt={event.title}
                    style={{ maxWidth: '100%', maxHeight: '180px', objectFit: 'cover' }}
                  />
                </div>

                <div className="col-md-7 text-start p-3 position-relative d-flex flex-column justify-content-between">
                  <div>
                    <Link to={`/events/${event.eventId}`} className="event-link" style={{ color: '#7A4E2E', textDecoration: 'none' }}>
                      <h3 className="fw-bold">{event.title}</h3>
                    </Link>
                    <p className="m-1 text-secondary">{formatDateTime(event.startTime, 'startTime')}</p>
                    <div className="mb-3">{event.location}</div>
                  </div>

                  <div className="position-absolute bottom-0 end-0 translate-middle-y d-flex gap-2">
                    <button
                      className={`btn btn-sm ${event.status === 'pending' ? 'btn-warning' : 'btn-blue'} text-white`}
                      style={{ minWidth: '80px' }}
                      disabled
                    >
                      {event.status === 'pending' ? '審核中' : '報名完成'}
                    </button>
                    <button
                      onClick={() => handleCancel(event.registrationId)}
                      className="btn btn-sm btn-red text-white"
                      style={{ minWidth: '80px' }}
                    >
                      取消報名
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="text-muted mt-3" style={{ fontSize: '0.9rem' }}>
            目前共載入 {events.length} 筆資料
          </div>
        </div>
      </div>
    </div>
  );
}
export default RegistrationsPage