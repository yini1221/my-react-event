import AdminNavbar from '../components/AdminNavbar';

function AdminEventCategoriesPage() {

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2">
                    <AdminNavbar/> 
                </div>
                <div className="col">
                    <div className="card card-body w-100">
                        <div className="p-4 d-flex flex-column align-items-center">
                            <h2>活動分類管理</h2>
                            <table className="table table-bordered align-middle table-hover">
                                <caption>List of categories</caption>
                                <thead>
                                <tr>
                                    <th>分類編號</th>
                                    <th>活動分類</th>
                                    <th>活動名稱</th>
                                    <th>編輯</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>301</td>
                                    <td>運動</td>
                                    <td>【茶香繚繞・仕紳雅聚】手作茶香袋體驗</td>
                                    <td className='d-flex justify-content-center gap-3'>
                                        <select class="form-select w-50" aria-label="Default select example">
                                            <option value="1">運動</option>
                                            <option value="2">藝文</option>
                                            <option value="3">學習</option>
                                        </select>
                                        <button className="btn btn-light btn-sm fs-6 d-block">確認</button>
                                    </td>
                                </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={4}><button>匯出分類列表</button></td>
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

export default AdminEventCategoriesPage