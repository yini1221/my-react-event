import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import AdminNavbar from '../components/AdminNavbar';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const API_URL = 'http://localhost:8084/admin'; // 後台 API

function AdminEventsPage() {

    const [events, setEvents] = useState([]);
    const [form, setForm] = useState({ id: null, title: '', description: '', location: '', startTime: '', endTime: '', createdAt: '', updatedAt: '', maxParticipants: '', imageBase64: '', eventCategory: null });
    const [editing, setEditing] = useState(false); // 是否為編輯模式
    const [categories, setCategories] = useState([]);

    // 讀取活動資料
    const fetchEvents = async () => {
        try {
            const res = await fetch(`${API_URL}/events`, {
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

    // 讀取分類資料
    const fetchCategory = async () => {
        try {
        const res = await fetch(`${API_URL}/event-categories`, {
            credentials: "include"
        });
        const result = await res.json();
        setCategories(result.data || []);
        } catch (error) {
        console.error('讀取錯誤:', error);
        }
    }

    useEffect(() => {
        fetchEvents();
        fetchCategory();
    }, []);

    // 表單變更
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    // 新增/編輯 資料
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = editing ? 'PUT' : 'POST';
            const url = editing ? `${API_URL}/events/${form.id}` : `${API_URL}/events`;
            const res = await fetch(url, {
                method, 
                credentials: "include",
                headers: { 'Content-Type': `application/json`},
                body: JSON.stringify(form)
            });
            const result = await res.json();
            if (res.ok) {
                await fetchEvents(); // 重新查詢所有活動
                setForm({ id: null, title: '', description: '', location: '', startTime: '', endTime: '', createAt: '', updateAt: '', maxParticipants: '', imageBase64: '', eventCategory: null })
                setEditing(false);
            } else {
                alert(result.message || '操作失敗');
            }
        } catch (err) {
            console.error('提交錯誤:', err);
        };
    }

    // 刪除
    const handleDelete = async (id) => {
        if (!window.confirm('確定要刪除此活動嗎？')) return;
        try {
            const res = await fetch(`${API_URL}/events/${id}`,{
                method : 'DELETE',
                credentials: "include"
            });
            const result = await res.json();
            if (res.ok) {
                fetchEvents();
            } else {
                alert(result.message || '刪除失敗');
            }
        } catch (err) {
            console.error('刪除錯誤', err);
        }
    }

    // 編輯模式
    const handleEdit = (event) => {
        setForm(event);
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
                <AdminNavbar/>
                </div>
                <div className="col">
                    <div className="card card-body mt-3">
                        <div className="p-4 d-flex flex-column align-items-center position-relative">
                            <div className='d-flex mb-3 gap-1'>
                                <span>
                                    <img src={`${import.meta.env.BASE_URL}images/admin.png`} style={{ width: '40px' }} />
                                </span> 
                                <h2>活動管理系統</h2>
                            </div>
                            {
                                editing ? <h4 className='m-3'>編輯模式</h4> :
                                <button className="position-absolute top-0 end-0" data-bs-toggle="collapse" data-bs-target="#addEventList" aria-expanded="false" aria-controls="addEventList">新增活動</button>
                            }
                            <div className={ editing ? "show" : "collapse"} id="addEventList">
                                <form onSubmit={handleSubmit} className="mb-4 d-flex flex-column gap-1">
                                    <ul className='list-unstyled d-flex flex-column gap-2 text-start'>
                                        {
                                            editing ? 
                                            <li className='form-floating'>
                                                <input className='form-control' id='id' type="text" name="id" value={form.id} disabled />
                                                <label className='form-label' htmlFor="id">活動編號：</label>
                                            </li>
                                            : ''
                                        }
                                        <li className='form-floating'>
                                            <select className="form-select" id='eventCategory' 
                                                name='eventCategory' value={form.eventCategory?.id || ''} 
                                                onChange={(e) => {
                                                    const selectedId = e.target.value;
                                                    setForm((prev) => ({
                                                        ...prev, eventCategory: selectedId ? { id: parseInt(selectedId) } : null 
                                                    }));
                                                }}
                                                required
                                                aria-label="Floating label select">
                                                <option value="">請選擇活動類別</option>
                                                {
                                                    categories.map((category) => (
                                                        <option key={category.id} value={category.id}>{category.name}</option>
                                                    ))
                                                }
                                            </select>
                                            <label className='form-label' htmlFor="eventCategory">活動類別：</label>
                                        </li>
                                        <li className='form-floating'>
                                            <input className='form-control' id='title' type="text" name="title" value={form.title} onChange={handleChange} placeholder="【茶香繚繞・仕紳雅聚】手作茶香袋體驗..." required />
                                            <label className='form-label' htmlFor="title">活動名稱：</label>
                                        </li>
                                        <li className='form-floating'>
                                            <textarea className='form-control' id='description' type="text" name="description" value={form.description} onChange={handleChange} placeholder="過期茶包也能很有品味..." style={{height: '100px'}} required />
                                            <label className='form-label' htmlFor="description">活動內容：</label>
                                        </li>
                                        <li className='form-floating'>
                                            <input className='form-control' id='location' type="text" name="location" value={form.location} onChange={handleChange} placeholder="過期茶包也能很有品味..." required />
                                            <label className='form-label' htmlFor="location">活動地點：</label>
                                        </li>
                                        <li>
                                            <label className='form-label' htmlFor="startTime">開始時間：</label>
                                            <input className='form-control' id='startTime' type="datetime-local" name="startTime" value={form.startTime} onChange={handleChange} placeholder="過期茶包也能很有品味..." required /></li>
                                        <li>
                                            <label className='form-label' htmlFor="endTime">結束時間：</label>
                                            <input className='form-control' id='endTime' type="datetime-local" name="endTime" value={form.endTime} onChange={handleChange} required /></li>
                                        <li className='form-floating'>
                                            <input className='form-control' id='maxParticipants' type="number" name="maxParticipants" value={form.maxParticipants} onChange={handleChange} placeholder="40" required />
                                            <label className='form-label' htmlFor="maxParticipants">人數上限：</label>
                                        </li>
                                        <li className='d-flex flex-cloumn align-items-center'>
                                            <label htmlFor="formFile" className="form-label" style={{ marginBottom: '0px' }}>圖片上傳：</label>
                                            <input className="form-control w-75"
                                                type="file"
                                                id="formFile"
                                                name='imageBase64'
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                    setForm((prev) => ({
                                                        ...prev,
                                                        imageBase64: reader.result.split(',')[1], // 去掉前面的 "data:image/png;base64,"
                                                    }));
                                                    };
                                                    if (file) {
                                                    reader.readAsDataURL(file);
                                                    }
                                               }}/>
                                        </li>
                                        <li className='d-flex justify-content-center gap-2'>
                                            <button type="submit">
                                                {editing ? '修改' : '送出'}
                                            </button>
                                            <button data-bs-toggle="collapse" data-bs-target="#addEventList" type="button" onClick={() => {
                                                setEditing(false);
                                                setForm({ id: null, title: '', description: '', location: '', startTime: '', endTime: '', createdAt: '', updatedAt: '', maxParticipants: '', imageBase64: '', eventCategory: null });
                                            }}>取消</button>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                            <table className="table align-middle table-hover w-100">
                                <caption>目前共載入 {events.length} 筆資料</caption>
                                <thead>
                                <tr>
                                    <th scope="col">編號</th>
                                    <th scope="col">分類</th>
                                    <th scope="col">活動名稱</th>
                                    <th scope="col">活動時間</th>
                                    <th scope="col">人數上限</th>
                                    <th scope="col">建立者</th>
                                    <th scope="col">創建日期</th>
                                    <th scope="col"></th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        events.map((event) => (
                                            <tr key={event.id}>
                                                <th scope="row">{event.id}</th>
                                                <td>{event.eventCategory?.name}</td>
                                                <td>{event.title}</td>
                                                <td>
                                                    {formatDateTime(event.startTime, 'startTime')}<br />{formatDateTime(event.endTime, 'endTime')}
                                                </td>
                                                <td>{event.maxParticipants}</td>
                                                <td>Yini</td>
                                                <td className='text-secondary font-sm'>
                                                    {formatDateTime(event.createdAt, 'createdAt')} 建立
                                                    <br />
                                                    {formatDateTime(event.updatedAt, 'updatedAt')} 更新
                                                </td>
                                                <td>
                                                    <span onClick={() => handleEdit(event)} className="btn p-0">
                                                        <img src={`${import.meta.env.BASE_URL}images/settings.png`} style={{ width: '30px' }} />
                                                    </span>
                                                    <span onClick={() => handleDelete(event.id)} className="btn p-0">
                                                        <img src={`${import.meta.env.BASE_URL}images/garbage.png`} style={{ width: '30px' }} />
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={8} className='position-relative'>
                                            <button>匯出活動列表</button>
                                            <div className='d-flex position-absolute top-50 end-0 translate-middle-y'>
                                                <span className='btn btn-sm btn-outline-secondary me-2'>
                                                    上一頁
                                                </span>
                                                <span className='btn btn-sm btn-outline-secondary'>
                                                    下一頁
                                                </span>
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


export default AdminEventsPage