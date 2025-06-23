import React, { useEffect, useRef, useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import exportToExcel from '../components/exportToExcel';
import '../css/adminEventCategoriesPage.css';

const API_URL = 'http://localhost:8084/admin/event-categories'; // 後台 API

function AdminEventCategoriesPage() {

    const [eventCategories, setEventCategories] = useState([]);
    const [form, setForm] = useState({ name: ''});
    const [adding, setAdding] = useState(false); // 是否為新增模式
    const [editing, setEditing] = useState(false); // 是否為編輯模式

    const columns = [
      { label: '分類編號', key: 'id' },
      { label: '活動分類', key: 'name' },
    ];

    // 讀取分類資料
    const fetchEventCategories = async() => {
        try {
            const res = await fetch(API_URL, {
                credentials: "include"
            });
            const result = await res.json();
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
            <AdminNavbar />
          </div>
          <div className="col">
            <div className="card card-body mt-3 p-4">
              <div className="d-flex flex-column align-items-center">
                <table className="table table-hover align-middle w-100">
                  <caption className="text-muted">目前共載入 {eventCategories.length} 筆資料</caption>
                  <thead className="table-light">
                    <tr>
                      <th style={{ width: '20%' }}>分類編號</th>
                      <th style={{ width: '60%' }}>活動分類</th>
                      <th style={{ width: '20%' }} className='no-export'></th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventCategories.map((eventCategory) => (
                      <tr key={eventCategory.id}>
                        <td>{eventCategory.id}</td>
                        <td>
                          {editing && form.id === eventCategory.id ? (
                            <form>
                              <input
                                className="form-control text-center"
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                placeholder="請輸入分類名稱"
                                required
                              />
                            </form>
                          ) : (
                            eventCategory.name
                          )}
                        </td>
                        <td className='no-export'>
                          {editing && form.id === eventCategory.id ? (
                            <div className="d-flex gap-2 justify-content-center">
                              <button onClick={() => handleSubmit()} type="button" className="btn btn-primary btn-sm">
                                確認
                              </button>
                              <button onClick={() => setEditing(false)} type="button" className="btn btn-secondary btn-sm">
                                取消
                              </button>
                            </div>
                          ) : (
                            <div className="d-flex gap-3 justify-content-center">
                              <button
                                onClick={() => handleEdit(eventCategory)}
                                type="button"
                                className="btn btn-link p-0 me-2"
                                aria-label="編輯分類"
                              >
                                <img
                                  src={`${import.meta.env.BASE_URL}images/settings.png`}
                                  alt="edit"
                                  style={{ width: '28px' }}
                                />
                              </button>
                              <button
                                onClick={() => handleDelete(eventCategory.id)}
                                type="button"
                                className="btn btn-link p-0"
                                aria-label="刪除分類"
                              >
                                <img
                                  src={`${import.meta.env.BASE_URL}images/garbage.png`}
                                  alt="delete"
                                  style={{ width: '28px' }}
                                />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}

                    {adding && (
                      <tr className='no-export'>
                        <td colSpan={3}>
                          <form onSubmit={handleSubmit} className="d-flex gap-3 justify-content-center align-items-center">
                            <input
                              className="form-control w-25"
                              type="text"
                              name="name"
                              value={form.name}
                              onChange={(e) => setForm({ ...form, name: e.target.value })}
                              placeholder="請輸入分類名稱"
                              required
                            />
                            <div className="d-flex gap-2">
                              <button type="submit" className="btn btn-cate btn-sm px-3">
                                加入分類
                              </button>
                              <button
                                type="button"
                                className="btn btn-cate btn-sm px-3"
                                onClick={() => setAdding(false)}
                              >
                                取消
                              </button>
                            </div>
                          </form>
                        </td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr className='no-export'>
                      <td colSpan={3}>
                        <div className="d-flex justify-content-center gap-3">
                          <button onClick={() => handleAdd()} className="btn btn-cate">
                            新增分類
                          </button>
                          <button onClick={() => exportToExcel(eventCategories, columns, '活動分類列表.xlsx', '分類資料')} className="btn btn-cate px-4">
                            匯出分類列表
                          </button>
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
    );

}

export default AdminEventCategoriesPage