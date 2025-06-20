import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import AdminNavbar from '../components/AdminNavbar';
import { useEffect, useState } from 'react';

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

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-2">
                <AdminNavbar/>
                </div>
                <div className="col">
                    <div className="card card-body mt-3">
                         <div className="p-4 d-flex flex-column align-items-center position-relative">
                            <div className="position-absolute top-0 start-0 d-flex gap-3">
                                <input
                                    type="text"
                                    placeholder="會員編號"
                                    className="form-control"
                                    value={searchUserId}
                                    onChange={(e) => setSearchUserId(e.target.value)}
                                    style={{ width: '100px' }}
                                />
                                <input
                                    type="text"
                                    placeholder="會員名稱"
                                    className="form-control"
                                    value={searchName}
                                    onChange={(e) => setSearchName(e.target.value)}
                                    style={{ width: '100px' }}
                                />
                                <input
                                    type="text"
                                    placeholder="活動編號"
                                    className="form-control"
                                    value={searchEventId}
                                    onChange={(e) => setSearchEventId(e.target.value)}
                                    style={{ width: '100px' }}
                                />
                                <button className="btn btn-secondary" onClick={() => {
                                    setSearchUserId('');
                                    setSearchName('');
                                    setSearchEventId('');
                                    fetchRegistrations();
                                }}>清除
                                </button>
                            </div>
                            <h2 className='mt-3'>報名列表</h2>
                            <table className="table align-middle table-hover w-100">
                                <caption>目前共載入 {registrations.length} 筆資料</caption>
                                <thead>
                                <tr>
                                    <th>報名編號</th>
                                    <th>會員編號</th>
                                    <th>活動編號</th>
                                    <th>報名時間</th>
                                    <th>報名狀態</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        filteredRegistrations.map((registration) => (
                                        <tr key={registration.id}>
                                            <td>{registration.id}</td>
                                            <td>
                                                <span to="/admin/members" className='fs-6'>{registration.userId} (<span className='fs-6'>{registration.username}</span>)</span>
                                            </td>
                                            <td>
                                                <Link to={`/events/${registration.eventId}`} className='text-decoration-underline text-decoration-none text-primary fs-6'>{registration.eventId}</Link>
                                            </td>
                                            <td>{formatDateTime(registration.registeredAt, 'registeredAt')} </td>
                                            <td>
                                                {
                                                  editing && form.id === registration.id ? 
                                                    <form>
                                                        <select value={form.status} className="form-select me-2" aria-label="Default select example" 
                                                        onChange={(e) => handleStatusChange(e)}>
                                                            <option value='pending'>待審核</option>
                                                            <option value='confirmed'>報名完成</option>
                                                        </select>
                                                    </form>
                                                    :
                                                    <div className='row align-items-center'>
                                                        <span className='fs-6'>
                                                            {registration.status == 'pending' ? '待審核' : '報名完成'}
                                                        </span>
                                                    </div>
                                                }
                                            </td>
                                            <td>
                                                {
                                                    editing && form.id === registration.id ?
                                                    <div>
                                                        <button onClick={() => handleStatusSubmit(registration.id)} type='button' className='me-2 p-2'>確認</button>
                                                        <button onClick={() => setEditing(false)} type='button' className='fs-6 p-2'>取消</button>
                                                    </div> 
                                                    :
                                                    <span onClick={() => {handleEdit(registration)}} type='button' className='btn fs-6 p-0 px-3'>
                                                        <img src={`${import.meta.env.BASE_URL}images/settings.png`} style={{ width: '25px' }} />
                                                    </span>
                                                }
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={6}>
                                            <div className='d-flex justify-content-center gap-2'>
                                                <button>匯出報名列表</button>
                                            </div>
                                        </td>                                        
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminRegistrationsPage