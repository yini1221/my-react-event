import React, { useEffect, useState } from 'react';
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
            console.log('API 回傳內容：', result);
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
        console.log('registrationId: ', registrationId)
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

    return (
        <div className="container-fluid">
            <div className='px-3 mx-auto' style={{'maxWidth': '1080px'}}>
                <div className="p-4 d-flex flex-column align-items-center bd-registration position-relative w-100">
                    <div className='d-flex mb-3 gap-1'>
                        <span>
                            <img src={`${import.meta.env.BASE_URL}images/admin.png`} style={{ width: '40px' }} />
                        </span> 
                        <h2>報名紀錄</h2>
                    </div>
                    <div className='w-100'>
                        <ul className='list-unstyled w-100'>
                            {
                                events.map((event, index) => (
                                
                                <li key={index} className={`row w-100 py-3 position-relative ${index !== events.length - 1 ? 'border-bottom' : ''}`}>
                                    <div className='col-md-5' style={{backgroundColor: '#faf6f3'}}>
                                        <img className='rounded-4' src={`data:image/jpeg;base64,${event.imageBase64}`}/>
                                    </div>
                                    <div className='col-md-7 text-start p-3 h-100' style={{backgroundColor: '#faf6f3'}}>
                                        <div>
                                            <Link to={`/events/${event.eventId}`} className='event-link'>
                                                <h3>{event.title}</h3>
                                            </Link>
                                            <p className='m-1'>{event.startTime}</p>
                                            <div className='mb-3 mb-md-0'>{event.location}</div>
                                        </div>
                                        <div className='position-absolute bottom-0 end-0 translate-middle-y'>
                                            <button className='btn btn-sm btn-blue text-white me-2'>{event.status == 'pending' ? '審核中' : '報名完成'}</button>
                                            <button onClick={() => handleCancel(event.registrationId)} className='btn btn-sm btn-red text-white' >取消報名</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                            <div>目前共載入 {events.length} 筆資料</div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default RegistrationsPage