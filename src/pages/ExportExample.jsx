// import AdminNavbar from '../components/AdminNavbar';

// function AdminDashboardPage() {
//     return (
//         <div className="container-fluid">
//             <div className="row">
//                 <div className="col-2">
//                     <AdminNavbar/> 
//                 </div>
//                 <div className="col">
//                     <div className="card card-body mt-3">
//                         <div className="p-4 d-flex flex-column align-items-center">
//                             <h2>後台儀表板</h2>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//          </div>
//     )
// }

// export default AdminDashboardPage
import React, { useRef } from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';

function ExportExample() {
  const tableRef = useRef(null);

  return (
    <div>
      <DownloadTableExcel
        filename="報名列表"
        sheet="報名資料"
        currentTableRef={tableRef.current}
      >
        <button>匯出 Excel</button>
      </DownloadTableExcel>

      <table ref={tableRef} border="1">
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
            <td>1</td>
            <td>1001</td>
            <td>2001</td>
            <td>2025-06-20 12:00</td>
            <td>待審核</td>
          </tr>
          {/* 其他資料列 */}
        </tbody>
      </table>
    </div>
  );
}

export default ExportExample;
