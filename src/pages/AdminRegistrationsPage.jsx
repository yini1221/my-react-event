import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import AdminNavbar from '../components/AdminNavbar';
import { useEffect, useState } from 'react';
import exportToExcel from '../components/exportToExcel';
import '../css/adminRegistrationsPage.css';

const API_URL = 'http://localhost:8084/admin/registrations'; // 後台 API

function AdminRegistrationsPage() {

    const [registrations, setRegistrations] = useState([]);
    const [form, setForm] = useState({ status: ''});
    const [searchUserId, setSearchUserId] = useState('');
    const [searchName, setSearchName] = useState('');
    const [searchEventId, setSearchEventId] = useState(''); 
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);  
    const [editing, setEditing] = useState(false);

    const columns = [
        { label: '編號', key: 'id' },
        { label: '會員編號', key: 'userId' },
        { label: '會員名稱', key: 'username' },
        { label: '活動編號', key: 'eventId' },
        { label: '報名時間', key: 'registeredAt' },
        { label: '狀態', key: 'status' }
    ];

    const fetchRegistrations = async () => {
            let url = `${API_URL}?page=${page}&size=${size}`;
            if(searchUserId) {
                url += `&userId=${searchUserId}`;
            }
            if(searchName) {
                url += `&username=${searchName}`;
            }
            if(searchEventId) {
                url += `&eventId=${searchEventId}`;
            }
            try {
                const res = await fetch( url, {
                    credentials: "include"
                });
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const result = await res.json();
                setRegistrations(result.data.content || []);
                setTotalPages(result.data.totalPages);
                setTotalElements(result.data.totalElements);
            } catch (error) {
                console.error('讀取錯誤:', error);
            }
        };

    useEffect(() => {
        fetchRegistrations();
    }, [page, size, searchUserId, searchName, searchEventId]);

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

    const processedRegistrations = registrations.map(registration => ({
        id: registration.id,
        userId: `${registration.userId}`,
        username: `${registration.userUsername}`,
        eventId: registration.eventId,
        registeredAt: `${formatDateTime(registration.registeredAt, 'registeredAt')}`,
        status: `${registration.status === 'pending' ? '待審核' : '報名完成'}`
    }));

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
                        <caption className="text-muted">目前共載入 {registrations.length} 筆資料，共 {totalElements} 筆資料</caption>
                        <thead className="table-light">
                            <tr>
                                <th style={{ width: '10%' }}>報名編號</th>
                                <th style={{ width: '15%' }}>會員編號</th>
                                <th style={{ width: '15%' }}>活動編號</th>
                                <th style={{ width: '20%' }}>報名時間</th>
                                <th style={{ width: '20%' }}>狀態</th>
                                <th style={{ width: '10%' }} className='no-export'></th>
                            </tr>
                        </thead>
                        <tbody>
                        {registrations.map((registration) => (
                            <tr key={registration.id}>
                                <td>{registration.id}</td>
                                <td className="fs-6">
                                    {registration.userId} (<span>{registration.userUsername}</span>)
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
                                <td className='no-export'>
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
                                        className="btn btn-reg btn-sm"
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
                            <tr className='no-export'>
                                <td colSpan={6}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div onClick={() => exportToExcel(processedRegistrations, columns, '報名列表.xlsx', '報名資料')} 
                                             className="d-flex justify-content-center">
                                            <button className="btn btn-reg">匯出報名列表</button>
                                        </div>
                                        <div className="d-flex align-items-center gap-3">
                                            <button
                                            onClick={() => setPage(prev => Math.max(prev - 1, 0))}
                                            disabled={page === 0}
                                            className="btn btn-sm btn-outline-secondary"
                                            style={{ minWidth: '80px' }}
                                            >
                                            上一頁
                                            </button>

                                            <span style={{ minWidth: '100px', textAlign: 'center', color: '#7A4E2E' }}>
                                            第 {page + 1} 頁 / 共 {totalPages} 頁
                                            </span>

                                            <button
                                            onClick={() => setPage(prev => Math.min(prev + 1, totalPages - 1))}
                                            disabled={page + 1 >= totalPages}
                                            className="btn btn-sm btn-outline-secondary"
                                            style={{ minWidth: '80px' }}
                                            >
                                            下一頁
                                            </button>
                                        </div>
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