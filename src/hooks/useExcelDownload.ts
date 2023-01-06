import { useCallback } from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

interface UseExcelDownloadProps {
  searchDateTimezone: string;
  searchStartDatetime: string | Date;
  searchEndDatetime: string | Date;
  excelFilename: string;
  excelTitle: string[];
  excelInsertData: any[];
}

export default ({
  searchDateTimezone,
  searchStartDatetime,
  searchEndDatetime,
  excelFilename,
  excelTitle,
  excelInsertData,
}: UseExcelDownloadProps) => {
  const excelFileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const excelFileExtension = '.xlsx';
  const excelProvider = [
    '정보 제공자 : (주)트레블씨투비',
    `조회 기간 (타임존: ${searchDateTimezone}) : ${searchStartDatetime} ~ ${searchEndDatetime}`,
  ];

  const excelDownload = useCallback(() => {
    const ws = XLSX.utils.aoa_to_sheet([excelProvider, [], excelTitle]);
    excelInsertData.map((result: any) => {
      XLSX.utils.sheet_add_aoa(ws, [Object.values(result)], { origin: -1 });
      ws['!cols'] = [{ wpx: 200 }, { wpx: 200 }];
      return false;
    });
    const wb: any = { Sheets: { result: ws }, SheetNames: ['result'] };
    const excelButter = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const excelFile = new Blob([excelButter], { type: excelFileType });
    FileSaver.saveAs(excelFile, excelFilename + excelFileExtension);
  }, [excelInsertData]);

  return excelDownload;
};
