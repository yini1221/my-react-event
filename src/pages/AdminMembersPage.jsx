import { useEffect, useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';

const API_URL = 'http://localhost:8084/admin/members'; // 後台 API

function AdminMembersPage() {

    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ role: '' });
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
                setForm({role: ''});
                setEditing(false);
            } else {
                alert(result.message || '操作失敗');
            }
        } catch (err) {
            console.log('讀取錯誤', err);
        };
    }


    const handleEdit = (use) => {
        setForm(use);
        setEditing(true);
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2">
                    <AdminNavbar/> 
                </div>
                <div className="col">
                    <div className="card card-body mt-3">
                        <div className="p-4 d-flex flex-column align-items-center">
                            <h2>會員管理</h2>
                            <table className="table align-middle table-hover w-100">
                                <caption>目前共載入 {users.length} 筆資料</caption>
                                <thead>
                                <tr>
                                    <th>會員編號</th>
                                    <th>名稱</th>
                                    <th>信箱</th>
                                    <th>加入時間</th>
                                    <th>驗證狀態</th>
                                    <th>權限</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.map((use) => (
                                        <tr key={use.id}>
                                            <td>{use.id}</td>
                                            <td>{use.username}</td>
                                            <td>{use.email}</td>
                                            <td>{use.createdAt}</td>
                                            <td>
                                                {use.completed ?
                                                <img src={`${import.meta.env.BASE_URL}images/circle.png`} style={{ width: '30px' }} />
                                                :
                                                <img src={`${import.meta.env.BASE_URL}images/multiply.png`} style={{ width: '30px' }} />
                                            }
                                            </td>
                                            <td>
                                                {
                                                    editing && form.id === use.id ? 
                                                    (
                                                        <form>
                                                            <select className="form-select" required
                                                            name='role' value={form.role} onChange={(e) => setForm({...form, role: e.target.value})}>
                                                                <option value="">請選擇權限</option>
                                                                <option value="ADMIN">系統管理員</option>
                                                                <option value="MEMBER">一般會員</option>
                                                            </select>
                                                        </form>
                                                    ) 
                                                    : (use.roleName)
                                                }
                                            </td>
                                            <td>
                                                {
                                                    editing && form.id === use.id ? (
                                                        <div>
                                                            <button onClick={handleSubmit} type='button' className='me-2 fs-6'>確認</button>
                                                            <button onClick={() => setEditing(false)} type='button' className='fs-6'>取消</button>
                                                        </div>
                                                    ) 
                                                    : (
                                                        <div>
                                                            <span onClick={() => handleEdit(use)} type='button' className="btn p-0">
                                                                <img src={`${import.meta.env.BASE_URL}images/settings.png`} style={{ width: '30px' }} />
                                                            </span>
                                                            {/* <span className="btn p-0">
                                                                <img src={`${import.meta.env.BASE_URL}images/garbage.png`} style={{ width: '30px' }} />
                                                            </span> */}
                                                        </div>
                                                    ) 
                                                }
                                            </td>                                    
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={7}>
                                            <div>
                                                <button>匯出會員列表</button>
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

export default AdminMembersPage