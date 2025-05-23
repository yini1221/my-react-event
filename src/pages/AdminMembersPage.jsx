import AdminNavbar from '../components/AdminNavbar';

function AdminMembersPage() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2">
                    <AdminNavbar/> 
                </div>
                <div className="col">
                    <div className="card card-body w-100">
                        <div className="p-4 d-flex flex-column align-items-center">
                            <h2>會員管理</h2>
                        </div>
                    </div>
                </div>
            </div>
         </div>
    )
}

export default AdminMembersPage