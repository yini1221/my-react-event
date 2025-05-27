import AdminNavbar from '../components/AdminNavbar';

function AdminEventsPage() {

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2">
                <AdminNavbar/>
                </div>
                <div className="col">
                    <div class="card card-body mt-3">
                        <div className="p-4 d-flex flex-column align-items-center">
                            <h2>活動管理系統</h2>
                            <button className="mb-3" data-bs-toggle="collapse" data-bs-target="#addEventList" aria-expanded="false" aria-controls="addEventList">新增活動</button>
                            <div className="collapse w-50" id="addEventList">
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
                                    <div className='d-flex justify-content-center align-items-center'>
                                        <label>活動類別：</label>
                                        <select class="form-select w-25" aria-label="Default select example">
                                            <option value="1">運動</option>
                                            <option value="2">藝文</option>
                                            <option value="3">學習</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label for="formFile" class="form-label">上傳圖片</label>
                                        <input className="form-control" type="file" id="formFile" accept="image/*" />
                                    </div>
                                    <div className='d-flex justify-content-center gap-2'>
                                        <button type="submit" >新增/修改活動</button>
                                        <button type="submit">取消</button>
                                    </div>
                                </form>
                            </div>
                            <table className="table table-bordered align-middle table-hover w-100" style={{ tableLayout: "fixed" }}>
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
                                    <th>編輯 / 刪除</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>2011</td>
                                    <td>【茶香繚繞・仕紳雅聚】手作茶香袋體驗</td>
                                    <td className="overflow-auto w-100" style={{ height: '200px', display: '-webkit-box' }}>過期茶包也能很有品味？香包袋用完就丟太可惜？來場結合環保設計與香氣美學的體驗，為生活注入溫度與儀式感。本次選用『猴子設計』以大稻埕風景為靈感的手作布袋，搭配大稻埕名店『聯通漢芳』嚴選的天然香草原料，讓茶葉與茶包不再只是廢棄物，而是有故事、有風格的香氣祝福。</td>
                                    <td>台灣台北市大同區民生西路309號</td>
                                    <td>開始時間<br />
                                        2025/06/07<hr />
                                        結束時間：<br />
                                        2025/08/16
                                    </td>
                                    <td>40</td>
                                    <td>202</td>
                                    <td>Yini</td>
                                    <td>
                                        2025/05/20 21:49建立<hr />
                                        2025/05/20 21:49更新
                                    </td>
                                    <td>
                                        <button className="btn btn-outline-danger fs-6">編輯</button><hr />
                                        <button className="btn btn-outline-danger fs-6">刪除</button>
                                    </td>
                                </tr>
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