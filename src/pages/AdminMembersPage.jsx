import AdminNavbar from '../components/AdminNavbar';

function AdminMembersPage() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2">
                    <AdminNavbar/> 
                </div>
                <div className="col">
                    <div className="card card-body mt-3">
                        <div className="p-4 d-flex flex-column align-items-center">
                            <h2>會員管理</h2>
                            <table className="table table-bordered align-middle table-hover w-100" style={{ tableLayout: "fixed" }}>
                                <caption>List of members</caption>
                                <thead>
                                <tr>
                                    <th>會員編號</th>
                                    <th>會員名稱</th>
                                    <th>會員信箱</th>
                                    <th>加入時間</th>
                                    <th>驗證狀態</th>
                                    <th>角色權限</th>
                                    <th>編輯權限</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>004001</td>
                                    <td>Yini</td>
                                    <td>yini@gmail.com</td>
                                    <td>2025/05/23</td>
                                    <td>尚未驗證</td>
                                    <td>admin</td>
                                    <td className='d-flex justify-content-center gap-3'>
                                        <select class="form-select" aria-label="Default select example">
                                            <option value="1">一般會員</option>
                                            <option value="2">管理員</option>
                                        </select>
                                    </td>                                    
                                </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={7}>
                                            <div className='d-flex w-100 justify-content-center gap-2'>
                                                <button>匯出會員列表</button>
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

export default AdminMembersPage