import * as ExcelJS from "exceljs";
import saveAs from "file-saver";
export function certificadoXLS(certificado) {
console.log(certificado)
    var ExcelJSWorkbook = new ExcelJS.Workbook();
             var worksheet = ExcelJSWorkbook.addWorksheet(`Certificado ${certificado.certificado_numero}`, {
                properties: { defaultRowHeight: 30 },
            }); 


    ExcelJSWorkbook.xlsx.writeBuffer().then(function (buffer) {
        saveAs(
            new Blob([buffer], { type: "application/octet-stream" }),
            `Certificado ${certificado.certificado_numero}.xlsx`
        );
    });

}
