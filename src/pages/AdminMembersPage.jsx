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
                            <table className="table align-middle table-hover w-100">
                                <caption>目前共載入 5 筆資料</caption>
                                <thead>
                                <tr>
                                    <th>會員編號</th>
                                    <th>名稱</th>
                                    <th>信箱</th>
                                    <th>加入時間</th>
                                    <th>驗證狀態</th>
                                    <th>權限</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>004001</td>
                                    <td>Yini</td>
                                    <td>yini@gmail.com</td>
                                    <td>2025/05/23</td>
                                    <td>
                                        <img src={`${import.meta.env.BASE_URL}images/circle.png`} style={{ width: '30px' }} />
                                    </td>
                                    <td>管理員</td>
                                    <td>
                                        <span className="btn p-0">
                                            <img src={`${import.meta.env.BASE_URL}images/settings.png`} style={{ width: '30px' }} />
                                        </span>
                                        <span className="btn p-0">
                                            <img src={`${import.meta.env.BASE_URL}images/garbage.png`} style={{ width: '30px' }} />
                                        </span>
                                        {/* <select className="form-select" aria-label="Default select example">
                                            <option value="1">一般會員</option>
                                            <option value="2">管理員</option>
                                        </select> */}
                                    </td>                                    
                                </tr>
                                <tr>
                                    <td>004003</td>
                                    <td>Alexis</td>
                                    <td>alexis@gmail.com</td>
                                    <td>2025/06/5</td>
                                    <td>
                                        <img src={`${import.meta.env.BASE_URL}images/circle.png`} style={{ width: '30px' }} />
                                    </td>
                                    <td>一般會員</td>
                                    <td>
                                        <span className="btn p-0">
                                            <img src={`${import.meta.env.BASE_URL}images/settings.png`} style={{ width: '30px' }} />
                                        </span>
                                        <span className="btn p-0">
                                            <img src={`${import.meta.env.BASE_URL}images/garbage.png`} style={{ width: '30px' }} />
                                        </span>
                                        {/* <select className="form-select" aria-label="Default select example">
                                            <option value="1">一般會員</option>
                                            <option value="2">管理員</option>
                                        </select> */}
                                    </td>                                    
                                </tr>
                                <tr>
                                    <td>004006</td>
                                    <td>Valentine</td>
                                    <td>valentine@gmail.com</td>
                                    <td>2025/06/6</td>
                                    <td>
                                        <img src={`${import.meta.env.BASE_URL}images/circle.png`} style={{ width: '30px' }} />
                                    </td>
                                    <td>一般會員</td>
                                    <td>
                                        <span className="btn p-0">
                                            <img src={`${import.meta.env.BASE_URL}images/settings.png`} style={{ width: '30px' }} />
                                        </span>
                                        <span className="btn p-0">
                                            <img src={`${import.meta.env.BASE_URL}images/garbage.png`} style={{ width: '30px' }} />
                                        </span>
                                        {/* <select className="form-select" aria-label="Default select example">
                                            <option value="1">一般會員</option>
                                            <option value="2">管理員</option>
                                        </select> */}
                                    </td>                                    
                                </tr>
                                <tr>
                                    <td>004008</td>
                                    <td>Tiffany</td>
                                    <td>tiffany@gmail.com</td>
                                    <td>2025/06/1</td>
                                    <td>
                                        <img src={`${import.meta.env.BASE_URL}images/multiply.png`} style={{ width: '30px' }} />
                                    </td>
                                    <td>訪客</td>
                                    <td>
                                        <span className="btn p-0">
                                            <img src={`${import.meta.env.BASE_URL}images/settings.png`} style={{ width: '30px' }} />
                                        </span>
                                        <span className="btn p-0">
                                            <img src={`${import.meta.env.BASE_URL}images/garbage.png`} style={{ width: '30px' }} />
                                        </span>
                                        {/* <select className="form-select" aria-label="Default select example">
                                            <option value="1">一般會員</option>
                                            <option value="2">管理員</option>
                                        </select> */}
                                    </td>                                    
                                </tr>
                                <tr>
                                    <td>004011</td>
                                    <td>Nigel</td>
                                    <td>nigel@gmail.com</td>
                                    <td>2025/06/6</td>
                                    <td>
                                        <img src={`${import.meta.env.BASE_URL}images/multiply.png`} style={{ width: '30px' }} />
                                    </td>
                                    <td>訪客</td>
                                    <td>
                                        <span className="btn p-0">
                                            <img src={`${import.meta.env.BASE_URL}images/settings.png`} style={{ width: '30px' }} />
                                        </span>
                                        <span className="btn p-0">
                                            <img src={`${import.meta.env.BASE_URL}images/garbage.png`} style={{ width: '30px' }} />
                                        </span>
                                        {/* <select className="form-select" aria-label="Default select example">
                                            <option value="1">一般會員</option>
                                            <option value="2">管理員</option>
                                        </select> */}
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