import AdminNavbar from '../components/AdminNavbar';

function AdminEventCategoriesPage() {

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2">
                    <AdminNavbar/> 
                </div>
                <div className="col">
                    <div className="card card-body mt-3">
                        <div className="p-4 d-flex flex-column align-items-center">
                            <h2>活動分類管理</h2>
                            <table className="table table-bordered align-middle table-hover">
                                <caption>List of categories</caption>
                                <thead>
                                <tr>
                                    <th>分類編號</th>
                                    <th>活動分類</th>
                                    <th>活動列表</th>
                                    <th>編輯</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>301</td>
                                    <td>運動</td>
                                    <td>
                                        <select class="form-select" aria-label="Default select example">
                                            <option value="1">編號:1<hr />【茶香繚繞・仕紳雅聚】手作茶香袋體驗</option>
                                            <option value="2">編號:2<hr />【茶香繚繞・仕紳雅聚】手作茶香袋體驗</option>
                                            <option value="3">編號:3<hr />【茶香繚繞・仕紳雅聚】手作茶香袋體驗</option>
                                        </select>
                                    </td>
                                    <td className='d-flex justify-content-center gap-2'>
                                        <button className="btn btn-outline-danger fs-6">編輯</button><hr />
                                        <button className="btn btn-outline-danger fs-6">刪除</button>
                                    </td>
                                </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={4}>
                                            <div className='d-flex justify-content-center gap-2'>
                                                <button className="">新增分類</button>
                                                <button>匯出分類列表</button>
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
    )

}

export default AdminEventCategoriesPage