import { Link } from 'react-router-dom';
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
                            <table className="table align-middle table-hover w-100">
                                <caption>目前共載入 3 筆資料</caption>
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
                                    <td>0001</td>
                                    <td className=''>
                                        <Link to="/admin/members" className='text-decoration-underline text-decoration-none text-primary fs-6'>004003 - Alexis</Link>
                                    </td>
                                    <td>
                                        <Link to="/admin/events" className='text-decoration-underline text-decoration-none text-primary fs-6 p-5'>5</Link>
                                    </td>
                                    <td>2025/06/08 </td>
                                    <td>
                                        <select className="form-select" aria-label="Default select example">
                                            <option>待審核</option>
                                            <option value="1">報名完成</option>
                                            <option value="2">報名失敗</option>
                                        </select>
                                    </td>                                      
                                </tr>
                                <tr>
                                    <td>0002</td>
                                    <td>
                                        <Link to="/admin/members" className='text-decoration-underline text-decoration-none text-primary fs-6'>004008 - Tiffany</Link>
                                    </td>
                                    <td>
                                        <Link to="/admin/events" className='text-decoration-underline text-decoration-none text-primary fs-6 p-5'>3</Link>
                                    </td>
                                    <td>2025/06/03</td>
                                    <td>
                                        <select className="form-select" aria-label="Default select example">
                                            <option>待審核</option>
                                            <option value="1">報名完成</option>
                                            <option value="2">報名失敗</option>
                                        </select>
                                    </td>                                      
                                </tr>
                                <tr>
                                    <td>0003</td>
                                    <td>
                                        <Link to="/admin/members" className='text-decoration-underline text-decoration-none text-primary fs-6'>004011 - Nigel</Link>
                                    </td>
                                    <td>
                                        <Link to="/admin/events" className='text-decoration-underline text-decoration-none text-primary fs-6 p-5'>2</Link>
                                    </td>
                                    <td>2025/06/11</td>
                                    <td>
                                        <select className="form-select" aria-label="Default select example">
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
                                            <div className='d-flex justify-content-center gap-2'>
                                                <button>匯出報名列表</button>
                                                <button>確認</button>
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