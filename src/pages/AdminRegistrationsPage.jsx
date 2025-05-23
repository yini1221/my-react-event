import AdminNavbar from '../components/AdminNavbar';

function AdminRegistrationsPage() {
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-2">
                <AdminNavbar/>
                </div>
                <div className="col">
                    <div className="card card-body w-100">
                         <div className="p-4 d-flex flex-column align-items-center">
                            <h2>報名列表</h2>
                            <table className="table table-bordered table-hover">
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
                                        <td colSpan={5}><button>匯出報名名單</button></td>
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