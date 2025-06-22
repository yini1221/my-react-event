import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import AdminNavbar from '../components/AdminNavbar';
import { useEffect, useState } from 'react';
import '../css/adminRegistrationsPage.css';

const API_URL = 'http://localhost:8084/admin/registrations'; // 後台 API

function AdminRegistrationsPage() {

    const [registrations, setRegistrations] = useState([]);
    const [form, setForm] = useState({ status: ''});
    const [searchUserId, setSearchUserId] = useState('');
    const [searchName, setSearchName] = useState('');
    const [searchEventId, setSearchEventId] = useState(''); 
    const [editing, setEditing] = useState(false);

    const fetchRegistrations = async () => {
            try {
                const res = await fetch(`${API_URL}`, {
                    credentials: "include"
                });
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const result = await res.json();
                console.log('API 回傳內容：', result);
                setRegistrations(result.data || []);
            } catch (error) {
                console.error('讀取錯誤:', error);
            }
        };

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const handleStatusChange = (e) => {
        setForm({
            ...form, status: e.target.value}
        );
    };

    const handleStatusSubmit = async (registrationId) => {
        try {
            const res = await fetch(`${API_URL}/${registrationId}/status`, {
              method: 'PATCH', 
              credentials: "include",
              headers: { 'Content-Type': `application/json`},
              body: JSON.stringify({ status: form.status })
          });
          const result = await res.json();
          if(res.ok) {
              setEditing(false);
              fetchRegistrations();
              alert(result.message);
          } else {
                alert(result.message || '更改失敗');
          }
        } catch (err) {
            console.error('提交錯誤:', err);
        }
    }
    const filteredRegistrations = registrations.filter(reg => {
        const matchUser = searchUserId ? reg.userId.toString().includes(searchUserId) : true;
        const matchName = searchName ? reg.username.toLowerCase().toString().includes(searchName.toLowerCase()) : true;
        const matchEvent = searchEventId ? reg.eventId.toString().includes(searchEventId) : true;
        return matchUser && matchName && matchEvent;
    });

    const handleEdit = (registration) => {
        setForm(registration);
        setEditing(true);
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
        <div className="row">
        <div className="col-2">
            <AdminNavbar />
        </div>
        <div className="col">
            <div className="card card-body mt-3 p-4">
                <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
                    <input
                    type="text"
                    placeholder="會員編號"
                    className="form-control"
                    value={searchUserId}
                    onChange={(e) => setSearchUserId(e.target.value)}
                    style={{ width: '130px', minWidth: '100px' }}
                    />
                    <input
                    type="text"
                    placeholder="會員名稱"
                    className="form-control"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    style={{ width: '130px', minWidth: '100px' }}
                    />
                    <input
                    type="text"
                    placeholder="活動編號"
                    className="form-control"
                    value={searchEventId}
                    onChange={(e) => setSearchEventId(e.target.value)}
                    style={{ width: '130px', minWidth: '100px' }}
                    />
                    <button
                    className="btn btn-sm"
                    onClick={() => {
                        setSearchUserId('');
                        setSearchName('');
                        setSearchEventId('');
                        fetchRegistrations();
                    }}
                    >
                    清除
                    </button>
                </div>
            <table className="table table-hover align-middle w-100">
                <caption className="text-muted">目前共載入 {registrations.length} 筆資料</caption>
                <thead className="table-light">
                <tr>
                    <th style={{ width: '10%' }}>報名編號</th>
                    <th style={{ width: '15%' }}>會員編號</th>
                    <th style={{ width: '15%' }}>活動編號</th>
                    <th style={{ width: '20%' }}>報名時間</th>
                    <th style={{ width: '20%' }}>狀態</th>
                    <th style={{ width: '10%' }}></th>
                </tr>
                </thead>
                <tbody>
                {filteredRegistrations.map((registration) => (
                    <tr key={registration.id}>
                    <td>{registration.id}</td>
                    <td className="fs-6">
                        {registration.userId} (<span>{registration.username}</span>)
                    </td>
                    <td>
                        <Link
                        to={`/events/${registration.eventId}`}
                        className="text-primary text-decoration-underline fs-6"
                        >
                        {registration.eventId}
                        </Link>
                    </td>
                    <td>{formatDateTime(registration.registeredAt, 'registeredAt')}</td>
                    <td>
                        {editing && form.id === registration.id ? (
                        <form>
                            <select
                            value={form.status}
                            className="form-select"
                            aria-label="報名狀態選擇"
                            onChange={handleStatusChange}
                            >
                            <option value="pending">待審核</option>
                            <option value="confirmed">報名完成</option>
                            </select>
                        </form>
                        ) : (
                        <span className="fs-6">
                            {registration.status === 'pending' ? '待審核' : '報名完成'}
                        </span>
                        )}
                    </td>
                    <td>
                        {editing && form.id === registration.id ? (
                        <div className="d-flex gap-2">
                            <button
                            onClick={() => handleStatusSubmit(registration.id)}
                            type="button"
                            className="btn btn-reg btn-sm"
                            >
                            確認
                            </button>
                            <button
                            onClick={() => setEditing(false)}
                            type="button"
                            className="btn btn-reg btn-sm px-3"
                            >
                            取消
                            </button>
                        </div>
                        ) : (
                        <button
                            onClick={() => handleEdit(registration)}
                            type="button"
                            className="btn btn-link p-0"
                            aria-label="編輯"
                        >
                            <img
                            src={`${import.meta.env.BASE_URL}images/settings.png`}
                            alt="edit"
                            style={{ width: '25px', verticalAlign: 'middle' }}
                            />
                        </button>
                        )}
                    </td>
                    </tr>
                ))}
                </tbody>
                <tfoot>
                <tr>
                    <td colSpan={6}>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-reg">匯出報名列表</button>
                    </div>
                    </td>
                </tr>
                </tfoot>
            </table>
            </div>
        </div>
        </div>
    </div>
    );
}

export default AdminRegistrationsPage