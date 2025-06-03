import React, { useEffect, useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';

const API_URL = 'http://localhost:8084/admin/events'; // 後台 API

function AdminEventsPage() {

    const [events, setEvents] = useState([]);
    const [form, setForm] = useState({ title: '', description: '', location: '', startTime: '', endTime: '', createAt: '', updateAt: '', maxParticipants: 0, imageBase64: '', eventCategory: null });
    // const [editing, setEditing] = useState(false); // 是否為編輯模式

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

    // 新增資料
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
                await fetchEvents(); // 重新查詢所有活動
                setForm({ title: '', description: '', location: '', startTime: '', endTime: '', createAt: '', updateAt: '', maxParticipants: '', imageBase64: '', eventCategory: '' })
            } else {
                alert(result.message || '操作失敗');
            }
        } catch (err) {
            console.error('提交錯誤:', err);
        };
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
                            <h2>📅 活動管理系統</h2>
                            <button className="mb-3" data-bs-toggle="collapse" data-bs-target="#addEventList" aria-expanded="false" aria-controls="addEventList">新增活動</button>
                            <div className="collapse" id="addEventList">
                                <form onSubmit={handleSubmit} className="mb-4 d-flex flex-column gap-1">
                                    <ul className='list-unstyled d-flex flex-column gap-2 text-start'>
                                        <li className='form-floating'>
                                            <input className='form-control' id='title' type="text" name="title" placeholder="【茶香繚繞・仕紳雅聚】手作茶香袋體驗..." required />
                                            <label className='form-label' htmlFor="title">活動名稱：</label>
                                        </li>
                                        <li className='form-floating'>
                                            <textarea className='form-control' id='description' type="text" name="description" placeholder="過期茶包也能很有品味..." style={{height: '100px'}} required />
                                            <label className='form-label' htmlFor="description">活動內容：</label>
                                        </li>
                                        <li className='form-floating'>
                                            <input className='form-control' id='location' type="text" name="location" placeholder="過期茶包也能很有品味..." required />
                                            <label className='form-label' htmlFor="location">活動地點：</label>
                                        </li>
                                        <li>
                                            <label className='form-label' htmlFor="startTime">開始時間：</label>
                                            <input className='form-control' id='startTime' type="date" name="startTime" placeholder="過期茶包也能很有品味..." required /></li>
                                        <li>
                                            <label className='form-label' htmlFor="endTime">結束時間：</label>
                                            <input className='form-control' id='endTime' type="date" name="endTime" required /></li>
                                        <li className='form-floating'>
                                            <input className='form-control' id='maxParticipants' type="number" name="maxParticipants" placeholder="40" required />
                                            <label className='form-label' htmlFor="maxParticipants">人數上限：</label>
                                        </li>
                                        <li className='form-floating'>
                                            <select className="form-select" id='eventCategory' 
                                                    name='eventCategory' value={form.eventCategory?.categoryId || ''} 
                                                    onChange={(e) => {
                                                        const selectedId = e.target.value;
                                                        setForm((prev) => ({
                                                            ...prev, eventCategory: selectedId ? { categoryId: parseInt(selectedId) } : null 
                                                        }));
                                                    }}
                                                    aria-label="Floating label select">
                                                <option value="" selected>請選擇活動類別</option>
                                                <option value="301">運動</option>
                                                <option value="302">藝文</option>
                                                <option value="303">學習</option>
                                           </select>
                                            <label className='form-label' htmlFor="eventCategory">活動類別：</label>
                                        </li>
                                        <li className='d-flex flex-cloumn align-items-center'>
                                            <label for="formFile" className="form-label" style={{ marginBottom: '0px' }}>圖片上傳：</label>
                                            <input className="form-control w-75"
                                                type="file"
                                                id="formFile"
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
                                            <button type="submit" >新增/修改活動</button>
                                            <button type="button" onClick=''>取消</button>
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
                                                    {event.startTime}~{event.endTime}
                                                </td>
                                                <td>{event.maxParticipants}</td>
                                                <td>{event.eventCategory?.categoryId} - {event.eventCategory?.categoryName}</td>
                                                <td>Yini</td>
                                                <td>
                                                    {event.createAt}建立<hr />
                                                    {event.updateAt}更新
                                                </td>
                                                <td>
                                                    <button className="btn btn-outline-danger fs-6">編輯</button><hr />
                                                    <button className="btn btn-outline-danger fs-6">刪除</button>
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
                                <p>目前共載入 {events.length} 筆資料</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>      
    )
}


export default AdminEventsPage