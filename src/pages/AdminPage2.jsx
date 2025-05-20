function AdminPage2() {
  return (
    <div className="row container-fluid">
        <div className="col-4">
            <ul className="list-unstyled">
                <li>
                    <button data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">報名管理</button>
                </li>
                <li>
                    <button data-bs-toggle="collapse" data-bs-target="#collapseExample2" aria-expanded="false" aria-controls="collapseExample">活動管理</button>
                </li>
                <li>
                    <button data-bs-toggle="collapse" data-bs-target="#collapseExample3" aria-expanded="false" aria-controls="collapseExample">活動分類管理</button>
                </li>
                <li>
                    <button data-bs-toggle="collapse" data-bs-target="#collapseExample4" aria-expanded="false" aria-controls="collapseExample">會員管理</button>
                </li>
                <li>
                    <button data-bs-toggle="collapse" data-bs-target="#collapseExample5" aria-expanded="false" aria-controls="collapseExample">後台儀表板</button>
                </li>
                <li>
                    <button data-bs-toggle="collapse" data-bs-target="#collapseExample6" aria-expanded="false" aria-controls="collapseExample">後台儀表板</button>
                </li>
            </ul>
        </div>
        <div id="collapseGroup" className="col-8">
            <div class="collapse" id="collapseExample" data-bs-parent="#collapseGroup">
                <div class="card card-body">
                    這是報名管理
                </div>
            </div>
            <div class="collapse" id="collapseExample2" data-bs-parent="#collapseGroup">
                <div class="card card-body">
                    <div className="p-4 d-flex flex-column align-items-center">
                        <h1>活動管理系統</h1>
                        <form className="mb-4">
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
                </div>
            </div>
            <div class="collapse" id="collapseExample3" data-bs-parent="#collapseGroup">
                <div class="card card-body">
                    這是活動分類管理
                </div>
            </div>
            <div class="collapse" id="collapseExample4" data-bs-parent="#collapseGroup">
                <div class="card card-body">
                    這是會員管理
                </div>
            </div>
            <div class="collapse" id="collapseExample5" data-bs-parent="#collapseGroup">
                <div class="card card-body">
                    這是後台儀表板
                </div>
            </div>
            <div class="collapse" id="collapseExample6" data-bs-parent="#collapseGroup">
                <div class="card card-body">
                    這是後台儀表板
                </div>
            </div>
        </div>
    </div>
    );
}

export default AdminPage2