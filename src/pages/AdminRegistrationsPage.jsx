import AdminNavbar from '../components/AdminNavbar';

function AdminRegistrationsPage() {
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-2">
                <AdminNavbar/>
                </div>
                <div className="col">
                    <div className="card card-body mt-3">
                         <div className="p-4 d-flex flex-column align-items-center">
                            <h2>報名列表</h2>
                            <table className="table table-bordered table-hover">
                                <caption>List of registrations</caption>
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
                                    <td className='d-flex justify-content-center gap-3'>
                                        <select class="form-select" aria-label="Default select example">
                                            <option>待審核</option>
                                            <option value="1">報名完成</option>
                                            <option value="2">報名失敗</option>
                                        </select>
                                    </td>                                      
                                </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={5}>
                                            <div className='d-flex w-100 justify-content-center gap-2'>
                                                <button>匯出報名列表</button>
                                                <button className="btn btn-light btn-sm fs-6 d-block">確認</button>
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

export default AdminRegistrationsPage