function AdminPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>活動管理系統</h1>
      <form style={{ marginBottom: '30px' }}>
        <fieldset>
          <legend>新增活動</legend>
          <div>
            <label>活動編號：</label>
            <input
              type="number"
              name="roomId"
              required
            />
          </div>
          <div>
            <label>活動名稱：</label>
            <input
              type="text"
              name="roomName"
            />
          </div>
          <div>
            <label>活動人數：</label>
            <input
              type="number"
              name="roomSize"
              required
            />
          </div>
          <button type="submit">新增活動</button>
        </fieldset>
      </form>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>活動編號</th>
            <th>活動名稱</th>
            <th>活動人數</th>
            <th>編輯</th>
            <th>刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>編號</td>
            <td>名稱</td>
            <td>人數</td>
            <td>編輯</td>
            <td>X</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage
