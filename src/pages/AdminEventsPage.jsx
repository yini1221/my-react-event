import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import AdminNavbar from '../components/AdminNavbar';
import '../css/adminEventsPage.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const API_URL = 'http://localhost:8084/admin'; // 後台 API

function AdminEventsPage() {

  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ id: null, title: '', description: '', location: '', startTime: '', endTime: '', createdAt: '', updatedAt: '', maxParticipants: '', imageBase64: '', eventCategory: null });
  const [editing, setEditing] = useState(false); // 是否為編輯模式
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

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
              alert(result.message);
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
              alert(result.message);
              fetchEvents();
          } else {
              alert(result.message || '刪除失敗');
          }
      } catch (err) {
          console.error('刪除錯誤', err);
      }
  }

  const filteredEvents = selectedCategoryId
  ? events.filter(event => event.eventCategory?.id === parseInt(selectedCategoryId))
  : events;

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
          <AdminNavbar />
        </div>
        <div className="col">
          <div className="card card-body mt-3 p-4">
            <div className="d-flex justify-content-between align-items-center mb-4 position-relative">
              <div className="d-flex align-items-center gap-2">
                <img src={`${import.meta.env.BASE_URL}images/admin.png`} alt="admin" style={{ width: '40px' }} />
                <h2 className="mb-0" style={{ color: '#7A4E2E' }}>活動管理系統</h2>
              </div>
              {
                editing ? (
                  <h4 className="m-0 text-muted">編輯模式</h4>
                ) : (
                  <button
                    className="btn btn-outline-primary"
                    data-bs-toggle="collapse"
                    data-bs-target="#addEventList"
                    aria-expanded="false"
                    aria-controls="addEventList"
                  >
                    新增活動
                  </button>
                )
              }
            </div>

            <div className={editing ? "show" : "collapse"} id="addEventList">
              <form onSubmit={handleSubmit} className="mb-4 d-flex flex-column gap-3">
                <ul className="list-unstyled d-flex flex-column gap-3 text-start">
                  {editing && (
                    <li className="form-floating">
                      <input className="form-control" id="id" type="text" name="id" value={form.id} disabled />
                      <label htmlFor="id">活動編號：</label>
                    </li>
                  )}
                  <li className="form-floating">
                    <select
                      className="form-select"
                      id="eventCategory"
                      name="eventCategory"
                      value={form.eventCategory?.id || ''}
                      onChange={(e) => {
                        const selectedId = e.target.value;
                        setForm((prev) => ({
                          ...prev,
                          eventCategory: selectedId ? { id: parseInt(selectedId) } : null,
                        }));
                      }}
                      required
                      aria-label="Floating label select"
                    >
                      <option value="">請選擇活動類別</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                    <label htmlFor="eventCategory">活動類別：</label>
                  </li>
                  <li className="form-floating">
                    <input
                      className="form-control"
                      id="title"
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="【茶香繚繞・仕紳雅聚】手作茶香袋體驗..."
                      required
                    />
                    <label htmlFor="title">活動名稱：</label>
                  </li>
                  <li className="form-floating">
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      placeholder="過期茶包也能很有品味..."
                      style={{ height: '100px' }}
                      required
                    />
                    <label htmlFor="description">活動內容：</label>
                  </li>
                  <li className="form-floating">
                    <input
                      className="form-control"
                      id="location"
                      type="text"
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      placeholder="活動地點"
                      required
                    />
                    <label htmlFor="location">活動地點：</label>
                  </li>
                  <li>
                    <label htmlFor="startTime" className="form-label">開始時間：</label>
                    <input
                      className="form-control"
                      id="startTime"
                      type="datetime-local"
                      name="startTime"
                      value={form.startTime}
                      onChange={handleChange}
                      required
                    />
                  </li>
                  <li>
                    <label htmlFor="endTime" className="form-label">結束時間：</label>
                    <input
                      className="form-control"
                      id="endTime"
                      type="datetime-local"
                      name="endTime"
                      value={form.endTime}
                      onChange={handleChange}
                      required
                    />
                  </li>
                  <li className="form-floating">
                    <input
                      className="form-control"
                      id="maxParticipants"
                      type="number"
                      name="maxParticipants"
                      value={form.maxParticipants}
                      onChange={handleChange}
                      placeholder="40"
                      required
                    />
                    <label htmlFor="maxParticipants">人數上限：</label>
                  </li>
                  <li className="d-flex align-items-center gap-3">
                    <label htmlFor="formFile" className="form-label mb-0" style={{ minWidth: '80px' }}>圖片上傳：</label>
                    <input
                      className="form-control"
                      type="file"
                      id="formFile"
                      name="imageBase64"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setForm((prev) => ({
                            ...prev,
                            imageBase64: reader.result.split(',')[1],
                          }));
                        };
                        if (file) reader.readAsDataURL(file);
                      }}
                    />
                  </li>
                  <li className="d-flex justify-content-center gap-3">
                    <button type="submit" className="btn btn-primary px-4">
                      {editing ? '修改' : '送出'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary px-4"
                      data-bs-toggle="collapse"
                      data-bs-target="#addEventList"
                      onClick={() => {
                        setEditing(false);
                        setForm({
                          id: null,
                          title: '',
                          description: '',
                          location: '',
                          startTime: '',
                          endTime: '',
                          createdAt: '',
                          updatedAt: '',
                          maxParticipants: '',
                          imageBase64: '',
                          eventCategory: null,
                        });
                      }}
                    >
                      取消
                    </button>
                  </li>
                </ul>
              </form>
            </div>

            <div className="d-flex align-items-center mb-3">
              <select
                className="form-select w-auto"
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
              >
                <option value="">全部分類</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            <table className="table table-hover align-middle w-100">
              <caption className="text-muted">目前共載入 {events.length} 筆資料</caption>
              <thead className="table-light">
                <tr>
                  <th scope="col" style={{ width: '4%' }}>編號</th>
                  <th scope="col" style={{ width: '4%' }}>分類</th>
                  <th scope="col" style={{ width: '25%', textAlign: 'left' }}>活動名稱</th>
                  <th scope="col" style={{ width: '18%' }}>活動時間</th>
                  <th scope="col" style={{ width: '4%' }}>人數上限</th>
                  <th scope="col" style={{ width: '8%' }}>建立者</th>
                  <th scope="col" style={{ width: '15%' }}>創建日期</th>
                  <th scope="col" style={{ width: '13%' }}></th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((event) => (
                  <tr key={event.id}>
                    <th scope="row">{event.id}</th>
                    <td>{event.eventCategory?.name}</td>
                    <td className="text-start">{event.title}</td>
                    <td>
                      {formatDateTime(event.startTime, 'startTime')}<br />
                      {formatDateTime(event.endTime, 'endTime')}
                    </td>
                    <td>{event.maxParticipants}</td>
                    <td>Yini</td>
                    <td className="text-secondary" style={{ fontSize: '0.85rem' }}>
                      {formatDateTime(event.createdAt, 'createdAt')} 建立<br />
                      {formatDateTime(event.updatedAt, 'updatedAt')} 更新
                    </td>
                    <td className="align-middle text-center">
                      <button className="btn btn-link p-0 me-2" onClick={() => handleEdit(event)} aria-label="編輯">
                        <img
                          src={`${import.meta.env.BASE_URL}images/settings.png`}
                          alt="edit"
                          style={{ width: '28px', verticalAlign: 'middle' }}
                        />
                      </button>
                      <button className="btn btn-link p-0" onClick={() => handleDelete(event.id)} aria-label="刪除">
                        <img
                          src={`${import.meta.env.BASE_URL}images/garbage.png`}
                          alt="delete"
                          style={{ width: '28px', verticalAlign: 'middle' }}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={8} className="d-flex justify-content-between align-items-center">
                    <button className="btn btn-outline-primary">匯出活動列表</button>
                    <div>
                      <button className="btn btn-sm btn-outline-secondary me-2">上一頁</button>
                      <button className="btn btn-sm btn-outline-secondary">下一頁</button>
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

export default AdminEventsPage