import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import AdminNavbar from '../components/AdminNavbar';
import '../css/adminMembersPage.css'

const API_URL = 'http://localhost:8084/admin/members'; // 後台 API

function AdminMembersPage() {

    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ role: '' });
    const [searchName, setSearchName] = useState('');
    const [editing, setEditing] = useState(false);

    const fetchMembers = async () => {
        try {
            const res = await fetch(API_URL, {
                credentials: 'include'
            });
            if(!res.ok) {
                throw new Error(`Http error! status: ${res.status}`);
            }
            const result = await res.json();
            console.log('API 回傳內容：', result);
            setUsers(result.data || []);
        } catch (err) {
            console.log('讀取失敗', err);
        }
    }

    useEffect(() => {
        fetchMembers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/${form.id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': `application/json`},
                body: JSON.stringify(form)
            })
            console.log('form.id', `${form.id}`);
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

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchName.toLowerCase())
    );

    const handleEdit = (use) => {
        setForm(use);
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
                <caption className="text-muted">目前共載入 {users.length} 筆資料</caption>
                <thead className="table-light">
                <tr>
                    <th style={{ width: '5%' }}>編號</th>
                    <th style={{ width: '10%' }}>名稱</th>
                    <th style={{ width: '20%' }}>信箱</th>
                    <th style={{ width: '25%' }}>加入時間</th>
                    <th style={{ width: '10%' }}>驗證</th>
                    <th style={{ width: '15%' }}>權限</th>
                    <th style={{ width: '20%' }}></th>
                </tr>
                </thead>
                <tbody>
                {filteredUsers.map((use) => (
                    <tr key={use.id}>
                    <td>{use.id}</td>
                    <td>{use.username}</td>
                    <td>{use.email}</td>
                    <td>{formatDateTime(use.createdAt, 'createdAt')}{}</td>
                    <td>
                        {use.completed ? (
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
                        {editing && form.id === use.id ? (
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
                        use.roleName
                        )}
                    </td>
                    <td>
                        {editing && form.id === use.id ? (
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
                            onClick={() => handleEdit(use)}
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
                <tr>
                    <td colSpan={7}>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-member">匯出會員列表</button>
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