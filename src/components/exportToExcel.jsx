import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


function exportToExcel(data = [], columns, filename, sheetName ) {

    // 需要匯出的欄位
    const filteredData = data.map(item => {
        const filteredItem = {};
        columns.forEach(col => {
        filteredItem[col.key] = item[col.key];
        });
        return filteredItem;
    });

    const worksheet = XLSX.utils.json_to_sheet(filteredData, { header: columns.map(c => c.key) });

    // 欄位標題
    columns.forEach((col, idx) => {
        const cellRef = XLSX.utils.encode_cell({ r: 0, c: idx });
        worksheet[cellRef].v = col.label;
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, filename);

}

export default exportToExcel