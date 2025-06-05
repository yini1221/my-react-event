import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import AdminNavbar from '../components/AdminNavbar';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const API_URL = 'http://localhost:8084/admin/events'; // 後台 API

function AdminEventsPage() {

    const [events, setEvents] = useState([]);
    const [form, setForm] = useState({ id: null, title: '', description: '', location: '', startTime: '', endTime: '', createdAt: '', updatedAt: '', maxParticipants: '', imageBase64: '', eventCategory: null });
    const [editing, setEditing] = useState(false); // 是否為編輯模式

    // 讀取書籍資料
    const fetchEvents = async () => {
        try {
        const res = await fetch(API_URL);
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
            const url = editing ? `${API_URL}/${form.id}` : API_URL;
            const res = await fetch(url, {
                method, 
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
            const res = await fetch(
                `${API_URL}/${id}`,{method : 'DELETE'});
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
                        <div className="p-4 d-flex flex-column align-items-center">
                            <h2>📅 活動管理系統</h2>
                            {
                                editing ? <h4 className='m-3'>編輯模式</h4> :
                                <button className="mb-3" data-bs-toggle="collapse" data-bs-target="#addEventList" aria-expanded="false" aria-controls="addEventList">新增活動</button>
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
                                                <option value="301">運動</option>
                                                <option value="302">藝文</option>
                                                <option value="303">學習</option>
                                           </select>
                                            <label className='form-label' htmlFor="eventCategory">活動類別：</label>
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
                                            {
                                                editing && (
                                                    <button type="button" onClick={() => {
                                                        setEditing(false);
                                                        setForm({ id: null, title: '', description: '', location: '', startTime: '', endTime: '', createdAt: '', updatedAt: '', maxParticipants: '', imageBase64: '', eventCategory: null });
                                                    }}>取消</button>

                                                )
                                            }
                                        </li>
                                    </ul>
                                </form>
                            </div>
                            <table className="table table-bordered align-middle table-hover w-100" style={{ tableLayout: "fixed" }}>
                                <caption>目前共載入 {events.length} 筆資料</caption>
                                <thead>
                                <tr>
                                    <th>活動編號</th>
                                    <th>活動名稱</th>
                                    <th>活動內容</th>
                                    <th>地點</th>
                                    <th>活動時間</th>
                                    <th>人數上限</th>
                                    <th>類別編號</th>
                                    <th>建立人員</th>
                                    <th>時間</th>
                                    <th>編輯 / 刪除</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        events.map((event) => (
                                            <tr key={event.id}>
                                                <td>{event.id}</td>
                                                <td>{event.title}</td>
                                                <td className="overflow-auto w-100" style={{ height: '200px', display: '-webkit-box' }}>{event.description}</td>
                                                <td>{event.location}</td>
                                                <td>
                                                    {formatDateTime(event.startTime, 'startTime')}~{formatDateTime(event.endTime, 'endTime')}
                                                </td>
                                                <td>{event.maxParticipants}</td>
                                                <td>{event.eventCategory?.id} - {event.eventCategory?.name}</td>
                                                <td>Yini</td>
                                                <td>
                                                    {formatDateTime(event.createdAt, 'createdAt')} 建立
                                                    <hr />
                                                    {formatDateTime(event.updatedAt, 'updatedAt')} 更新
                                                </td>
                                                <td>
                                                    <button onClick={() => handleEdit(event)} className="btn btn-outline-danger fs-6">編輯</button><hr />
                                                    <button onClick={() => handleDelete(event.id)} className="btn btn-outline-danger fs-6">刪除</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={10}><button>匯出活動列表</button></td>
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