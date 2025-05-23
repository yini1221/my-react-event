import AdminNavbar from '../components/AdminNavbar';

function AdminDashboardPage() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2">
                    <AdminNavbar/> 
                </div>
                <div className="col">
                    <div className="card card-body mt-3">
                        <div className="p-4 d-flex flex-column align-items-center">
                            <h2>後台儀表板</h2>
                        </div>
                    </div>
                </div>
            </div>
         </div>
    )
}

export default AdminDashboardPage