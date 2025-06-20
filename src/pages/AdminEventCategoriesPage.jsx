import React, { useEffect, useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';

const API_URL = 'http://localhost:8084/admin/event-categories'; // 後台 API

function AdminEventCategoriesPage() {

    const [eventCategories, setEventCategories] = useState([]);
    const [form, setForm] = useState({ name: ''});
    const [adding, setAdding] = useState(false); // 是否為新增模式
    const [editing, setEditing] = useState(false); // 是否為編輯模式

    // 讀取分類資料
    const fetchEventCategories = async() => {
        try {
            const res = await fetch(API_URL, {
                credentials: "include"
            });
            const result = await res.json();
            console.log('API 回傳內容：', result);
            setEventCategories(result.data || []);
        } catch (err) {
            console.error('讀取錯誤:', err);
        }
    }

    useEffect(() => {
        fetchEventCategories();
    }, []);

    // 新增/編輯 資料
    const handleSubmit = async () => {
        try {
            const method = editing ? 'PUT' : 'POST';
            const url = editing? `${API_URL}/${form.id}` : API_URL;
            const res = await fetch(url, {
                method, 
                credentials: "include",
                headers: { 'Content-Type': `application/json`},
                body: JSON.stringify(form)
            });
            const result = await res.json();
            if (res.ok) {
                alert(result.message);
                await fetchEventCategories(); // 重新查詢所有分類
                setForm({ name: '' })
                setEditing(false);
                setAdding(false);
            } else {
                alert(result.message || '操作失敗');
            }
        } catch (err) {
            console.error('提交錯誤:', err);
        };
    }

    // 刪除分類
    const handleDelete = async (id) => {
        if (!window.confirm('確定要刪除此分類嗎？')) return;
        try {
            const res = await fetch (`${API_URL}/${id}`, {
                method: 'DELETE',
                credentials: "include"
                });
            const result = await res.json();
            if (res.ok) {
                fetchEventCategories();
                alert(result.message);
            } else {
                alert(result.message || '刪除失敗');
            }
        } catch (err) {
            console.error('刪除錯誤', err);
        }
    }

    // 新增模式
    const handleAdd = () => {
        setAdding(true);
    }

    // 編輯模式
    const handleEdit = (eventCategory) => {
        setForm(eventCategory);
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
                            <h2 className='mt-3'>活動分類管理</h2>
                            <table className="table align-middle table-hover">
                                <caption>目前共載入 {eventCategories.length} 筆資料</caption>
                                    <thead>
                                    <tr>
                                        <th>分類編號</th>
                                        <th>活動分類</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                    <tbody>
                                        {
                                            eventCategories.map((eventCategory) => (
                                                <tr key={eventCategory.id}>
                                                    <td>{eventCategory.id}</td>
                                                    <td>
                                                        {
                                                            editing && form.id === eventCategory.id ? 
                                                            (<form ><input className='form-control w-100 text-center' type="text" name="name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="請輸入分類名稱" required /></form>)
                                                            : (eventCategory.name)
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            editing && form.id === eventCategory.id ? 
                                                            <div>
                                                                <button onClick={() => handleSubmit()} type='button' className='me-2 fs-6'>確認</button>
                                                                <button onClick={() => setEditing(false)} type='button' className='fs-6'>取消</button>
                                                            </div>                                                    
                                                            :
                                                            <div>                                                            
                                                                <span onClick={() => handleEdit(eventCategory)} type='button' className='btn fs-6'>
                                                                    <img src={`${import.meta.env.BASE_URL}images/settings.png`} style={{ width: '30px' }} />
                                                                </span>
                                                                <span onClick={() => handleDelete(eventCategory.id)} type='button' className='btn fs-6'>
                                                                    <img src={`${import.meta.env.BASE_URL}images/garbage.png`} style={{ width: '30px' }} />
                                                                </span>
                                                            </div>
                                                        }
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        {
                                            adding ? 
                                            <tr>
                                                <td colSpan={3}>
                                                    <form onSubmit={handleSubmit} className="d-flex gap-2">
                                                        <input className='form-control w-50' type="text" name="name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="請輸入分類名稱" required />
                                                        <div className='d-flex justify-content-center w-50'>
                                                            <button type="submit" className='me-2'>加入分類</button>
                                                            <button type="button" onClick={() => {
                                                                setAdding(false);
                                                            }}>取消
                                                            </button>
                                                        </div>
                                                    </form>
                                                </td>
                                            </tr> 
                                            : ''
                                        }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={4}>
                                            <div className='d-flex justify-content-center gap-2'>
                                                <button onClick={() => handleAdd()}>新增分類</button>
                                                <button>匯出分類列表</button>
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

export default AdminEventCategoriesPage