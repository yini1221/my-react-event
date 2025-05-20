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
          {
            rooms.map(event => {
              return (
                <tr key={event.eventId}>
                  <td>{event.eventId}</td>
                  <td>{event.eventName}</td>
                  <td>{event.eventSize}</td>
                  <td>
                    <button onClick={() => {}}>編輯</button>
                  </td>
                  <td>
                    <button onClick={() => {}}>刪除</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage
