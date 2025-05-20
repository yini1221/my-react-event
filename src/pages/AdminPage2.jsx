function AdminPage2() {
  return (
    <div className="row container-fluid">
        <div className="col-2">
            <ul className="list-unstyled bg-light h-100">
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
        <div id="collapseGroup" className="col">
            <div class="collapse" id="collapseExample" data-bs-parent="#collapseGroup">
                <div class="card card-body">
                    <h2>報名列表</h2>
                    <table className="table table-bordered table-hover" cellPadding="10">
                        <thead>
                        <tr>
                            <th>報名編號</th>
                            <th>會員編號</th>
                            <th>活動編號</th>
                            <th>報名時間</th>
                            <th>報名狀態</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>101</td>
                            <td>0001</td>
                            <td>4682</td>
                            <td>2025/07/01</td>
                            <td>待審核</td>
                        </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={4}><button>匯出報名名單</button></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <div class="collapse" id="collapseExample2" data-bs-parent="#collapseGroup">
                <div class="card card-body">
                    <div className="p-4 d-flex flex-column align-items-center">
                        <h2>活動管理系統</h2>
                        <button className="mb-3" data-bs-toggle="collapse" data-bs-target="#addEventList" aria-expanded="false" aria-controls="addEventList">新增活動</button>
                        <div class="collapse" id="addEventList">
                            <form className="mb-4 d-flex flex-column gap-1">
                                <div>
                                    <label>活動編號：</label>
                                    <input
                                    type="number"
                                    name="eventId"
                                    required
                                    />
                                </div>
                                <div>
                                    <label>活動名稱：</label>
                                    <input
                                    type="text"
                                    name="eventName"
                                    />
                                </div>
                                <div>
                                    <label>活動內容：</label>
                                    <input
                                    type="text"
                                    name="eventDescription"
                                    required
                                    />
                                </div>
                                <div>
                                    <label>活動地點：</label>
                                    <input
                                    type="text"
                                    name="eventLocation"
                                    required
                                    />
                                </div>
                                <div>
                                    <label>開始時間：</label>
                                    <input
                                    type="date"
                                    name="startTime"
                                    required
                                    />
                                </div>
                                <div>
                                    <label>結束時間：</label>
                                    <input
                                    type="date"
                                    name="endTime"
                                    required
                                    />
                                </div>
                                <div>
                                    <label>人數上限：</label>
                                    <input
                                    type="number"
                                    name="maxParticipants"
                                    required
                                    />
                                </div>
                                <div>
                                    <label>活動類別：</label>
                                    <input
                                    type="number"
                                    name="categoryId"
                                    required
                                    />
                                </div>
                                <button type="submit" >新增/修改活動</button>
                                <button type="submit">取消</button>
                            </form>
                        </div>
                        <table className="table table-bordered align-middle table-hover w-100" style={{ tableLayout: "fixed" }} cellPadding="10">
                            <caption>List of events</caption>
                            <thead>
                            <tr>
                                <th>活動編號</th>
                                <th>活動名稱</th>
                                <th>活動內容</th>
                                <th>地點</th>
                                <th>開始時間/結束時間</th>
                                <th>人數上限</th>
                                <th>類別編號</th>
                                <th>建立人員</th>
                                <th>時間</th>
                                <th>刪除</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="">
                                <td>2011</td>
                                <td>【茶香繚繞・仕紳雅聚】手作茶香袋體驗</td>
                                <td className="overflow-auto w-100" style={{ height: '200px', display: '-webkit-box' }}>過期茶包也能很有品味？香包袋用完就丟太可惜？來場結合環保設計與香氣美學的體驗，為生活注入溫度與儀式感。本次選用『猴子設計』以大稻埕風景為靈感的手作布袋，搭配大稻埕名店『聯通漢芳』嚴選的天然香草原料，讓茶葉與茶包不再只是廢棄物，而是有故事、有風格的香氣祝福。</td>
                                <td>台灣台北市大同區民生西路309號</td>
                                <td>開始時間<br />
                                    2025/06/07<br />
                                    結束時間：<br />
                                    2025/08/16
                                </td>
                                <td>40</td>
                                <td>202</td>
                                <td>Yini</td>
                                <td>
                                    2025/05/20 21:49建立<br />
                                    2025/05/20 21:49更新
                                </td>
                                <td>
                                    <button className="btn btn-outline-danger fs-6">刪除</button>
                                </td>
                            </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={10}><button>匯出報名名單</button></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
            <div class="collapse" id="collapseExample3" data-bs-parent="#collapseGroup">
                <div class="card card-body">
                    <h2>活動分類管理</h2>
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