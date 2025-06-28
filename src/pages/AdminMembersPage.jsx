import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import AdminNavbar from '../components/AdminNavbar';
import exportToExcel from '../components/exportToExcel';
import '../css/adminMembersPage.css'

const API_URL = 'http://localhost:8084/admin/members'; // 後台 API

function AdminMembersPage() {

    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ role: '' });
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [searchName, setSearchName] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);  
    const [editing, setEditing] = useState(false);

    const columns = [
        { label: '編號', key: 'id' },
        { label: '名稱', key: 'username' },
        { label: '信箱', key: 'email' },
        { label: '加入時間', key: 'eventTime' },
        { label: '驗證', key: 'completed' },
        { label: '權限', key: 'roleName' }
    ];

    const fetchMembers = async () => {
        let url = `${API_URL}?page=${page}&size=${size}`;
        if(searchName) {
            url += `&username=${searchName}`;
        }
        try {
            const res = await fetch( url, {
                credentials: 'include'
            });
            if(!res.ok) {
                throw new Error(`Http error! status: ${res.status}`);
            }
            const result = await res.json();
            setUsers(result.data.content || []);
            setTotalPages(result.data.totalPages);
            setTotalElements(result.data.totalElements);
        } catch (err) {
            console.log('讀取失敗', err);
        }
    }

    useEffect(() => {
        fetchMembers();
    }, [page, size, searchName]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/${form.id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': `application/json`},
                body: JSON.stringify(form)
            })
            const result = await res.json();
            if(res.ok) {
                await fetchMembers();
                alert(result.message);
                setForm({role: ''});
                setEditing(false);
            } else {
                alert(result.message || '操作失敗');
            }
        } catch (err) {
            console.log('讀取錯誤', err);
        };
    }

    const handleEdit = (user) => {
        setForm(user);
        setEditing(true);
    }

    const formatDateTime = (datetime, type) => {
        if (!datetime) return 'N/A';
        if (type === 'startTime' || type === 'endTime') {
            return dayjs(datetime).format('YYYY-MM-DD HH:mm');
            }
        return dayjs(datetime).format('YYYY-MM-DD HH:mm:ss');
    };

    const processedMemvers = users.map(user => ({
        id: user.id,
        username: user.username || '',
        email: user.email,
        eventTime: `${formatDateTime(user.createdAt, 'createdAt')}`,
        completed: user.completed,
        roleName: user.roleName
    }));

    return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-2">
                <AdminNavbar />
            </div>
            <div className="col">
                <div className="card card-body mt-3 p-4 position-relative">
                    <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
                        <input
                        type="text"
                        placeholder="會員名稱"
                        className="form-control"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        style={{ maxWidth: '250px' }}
                        />
                        <button className="btn btn-sm" onClick={() => setSearchName('')}>
                        清除
                        </button>
                    </div>
                    <table className="table table-hover align-middle w-100">
                        <caption className="text-muted">目前共載入 {users.length} 筆資料，共 {totalElements} 筆資料</caption>
                        <thead className="table-light">
                            <tr>
                                <th style={{ width: '5%' }}>編號</th>
                                <th style={{ width: '10%' }}>名稱</th>
                                <th style={{ width: '20%' }}>信箱</th>
                                <th style={{ width: '25%' }}>加入時間</th>
                                <th style={{ width: '10%' }}>驗證</th>
                                <th style={{ width: '15%' }}>權限</th>
                                <th style={{ width: '20%' }} className='no-export'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{formatDateTime(user.createdAt, 'createdAt')}</td>
                                    <td>
                                        {user.completed ? (
                                        <img
                                            src={`${import.meta.env.BASE_URL}images/circle.png`}
                                            alt="已驗證"
                                            style={{ width: '30px' }}
                                        />
                                        ) : (
                                        <img
                                            src={`${import.meta.env.BASE_URL}images/multiply.png`}
                                            alt="未驗證"
                                            style={{ width: '30px' }}
                                        />
                                        )}
                                    </td>
                                    <td>
                                        {editing && form.id === user.id ? (
                                        <form>
                                            <select
                                            className="form-select"
                                            required
                                            name="role"
                                            value={form.role}
                                            onChange={(e) => setForm({ ...form, role: e.target.value })}
                                            >
                                            <option value="">請選擇權限</option>
                                            <option value="ADMIN">系統管理員</option>
                                            <option value="MEMBER">一般會員</option>
                                            </select>
                                        </form>
                                        ) : (
                                            user.role === 'ADMIN' ? '系統管理員' 
                                            : user.role === 'MEMBER' ? '一般會員' : user.role
                                        )}
                                    </td>
                                    <td className='no-export'>
                                        {editing && form.id === user.id ? (
                                        <div className="d-flex gap-2">
                                            <button onClick={handleSubmit} type="button" className="btn btn-member btn-sm">
                                            確認
                                            </button>
                                            <button onClick={() => setEditing(false)} type="button" className="btn btn-member btn-sm">
                                            取消
                                            </button>
                                        </div>
                                        ) : (
                                        <button
                                            onClick={() => handleEdit(user)}
                                            type="button"
                                            className="btn btn-link p-0"
                                            aria-label="編輯"
                                        >
                                            <img
                                            src={`${import.meta.env.BASE_URL}images/settings.png`}
                                            alt="edit"
                                            style={{ width: '30px', verticalAlign: 'middle' }}
                                            />
                                        </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className='no-export'>
                                <td colSpan={7}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex justify-content-center">
                                            <button onClick={() => exportToExcel(processedMemvers, columns, '會員列表.xlsx', '會員資料')} 
                                                    className="btn btn-member">匯出會員列表</button>
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

                                            <span className='color-page' style={{ minWidth: '100px', textAlign: 'center' }}>
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

export default AdminMembersPage