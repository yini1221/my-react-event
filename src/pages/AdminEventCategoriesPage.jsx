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
            const res = await fetch(API_URL);
            const result = await res.json();
            console.log('API 回傳內容：', result);
            setEventCategories(result.data || []);
        } catch (error) {
            console.error('讀取錯誤:', error);
        }
    }

    useEffect(() => {
        fetchEventCategories();
    }, []);

    // 新增/編輯 資料
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = 'POST';
            const url = API_URL;
            const res = await fetch(url, {
                method, 
                headers: { 'Content-Type': `application/json`},
                body: JSON.stringify(form)
            });
            const result = await res.json();
            if (res.ok) {
                await fetchEventCategories(); // 重新查詢所有分類
                setForm({ name: '' })
                setAdding(false);
            } else {
                alert(result.message || '操作失敗');
            }
        } catch (err) {
            console.error('提交錯誤:', err);
        };
    }

    // 新增模式
    const handleAdd = () => {
        setAdding(true);
    }

    // 編輯模式
    const handleEdit = (event) => {
        setForm(event);
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
                            <h2>活動分類管理</h2>
                            <table className="table table-bordered align-middle table-hover">
                                <caption>目前共載入 {eventCategories.length} 筆資料</caption>
                                    <thead>
                                    <tr>
                                        <th>分類編號</th>
                                        <th>活動分類</th>
                                        <th>編輯</th>
                                    </tr>
                                </thead>
                                    <tbody>
                                        {
                                            eventCategories.map((eventCategory) => (
                                                <tr key={eventCategory.id}>
                                                    <td>{eventCategory.id}</td>
                                                    <td>{eventCategory.name}</td>
                                                    <td className='d-flex justify-content-center gap-2'>
                                                        <button className="btn btn-outline-danger fs-6">編輯</button><hr />
                                                        <button className="btn btn-outline-danger fs-6">刪除</button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        {
                                            adding ? 
                                            <tr>
                                                <td colSpan={3}>
                                                    <form onSubmit={handleSubmit} className="d-flex gap-2">
                                                            <input className='form-control w-50' type="text" name="name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="請輸入分類名稱：" required />
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