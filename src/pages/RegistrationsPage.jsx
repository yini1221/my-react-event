import '../css/registrations.css';

const API_URL = 'http://localhost:8084/user/registrations'; // 後台 API

function RegistrationsPage() {

    return (
        <div className="container-fluid">
            <div className="p-4 d-flex flex-column align-items-center bd-registration position-relative">
                <div className='d-flex mb-3 gap-1'>
                    <span>
                        <img src={`${import.meta.env.BASE_URL}images/admin.png`} style={{ width: '40px' }} />
                    </span> 
                    <h2>歷史報名紀錄</h2>
                </div>
                <table className="table align-middle table-hover w-100">
                    <caption>目前共載入  筆資料</caption>
                    <thead>
                    <tr>
                        <th scope="col">編號</th>
                        <th scope="col">活動名稱</th>
                        <th scope="col">活動時間</th>
                        <th scope="col">人數上限</th>
                        <th scope="col">建立者</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            // events.map((event) => (
                                <tr>
                                    <th scope="row">
                                        {/* {event.id} */}
                                    </th>
                                    <td>
                                        {/* {event.title} */}
                                    </td>
                                    <td>
                                        {/* {event.location} */}
                                    </td>
                                    <td>
                                        {/* {formatDateTime(event.startTime, 'startTime')}~{formatDateTime(event.endTime, 'endTime')} */}
                                    </td>
                                    <td>取消報名
                                    </td>
                                </tr>
                            // ))
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={8} className='position-relative'>
                                <button>匯出活動列表</button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );

}

export default RegistrationsPage