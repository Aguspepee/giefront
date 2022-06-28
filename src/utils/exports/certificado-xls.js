import * as ExcelJS from "exceljs";
import saveAs from "file-saver";
import { format } from 'date-fns';

const columns = [
    { header: "Orden de Compra", key: "orden_compra", width: 15 },
    { header: "Item O/C", key: "item_oc", width: 11 },
    { header: "Orden de Servicio", key: "orden_servicio", width: 15 },
    { header: " ", width: 11 },
    { header: "Siempre que sea O S colocar la letra F", key: "os_o_f", width: 15 },
    { header: "Ítem", key: "item", width: 11 },
    { header: "Cantidad", key: "cantidad", width: 11 },
    { header: "Número de Remito", key: "numero_remito", width: 11 },
    { header: "Fecha de ejecución del servicio dd/mm/aaaa", key: "fecha_ejecucion", width: 20 },
    { header: "Fecha del remito dd/mm/aaaa", key: "fecha_remito", width: 20 },
    { header: "Certificante", key: "certificante", width: 20 },
    { header: " ", width: 10 },
    { header: "Detalle", key: "detalle", width: 30 },
    { header: " ", width: 10 },
    { header: "Importe Unitario", key: "valor_unitario", width: 15 },
    { header: "Importe Total", key: "valor_total", width: 15 }
]

export function certificadoXLS(certificado) {
    console.log(certificado)
    let ExcelJSWorkbook = new ExcelJS.Workbook();
    let ws = ExcelJSWorkbook.addWorksheet(`Certificado ${certificado.certificado_numero}`, {
        properties: {},
    });

    //Especifica las columnas
    ws.columns = columns;

    //Añade las filas
    certificado.items.map((item, index) => {
        ws.addRow({
            id: index + 1,
            orden_compra: "4700804411",
            orden_servicio: "20016449389",
            os_o_f: "F",
            item: item.codigo,
            cantidad: item.cantidad,
            numero_remito: item.numero_remito,
            fecha_ejecucion: item.fecha_inspeccion ? format(new Date(item.fecha_inspeccion), 'dd/MM/yyyy') : "-",
            fecha_remito: item.remito_fecha ? format(new Date(item.remito_fecha), 'dd/MM/yyyy') : "-",
            detalle: item.detalle,
            valor_unitario: item.valor_unitario,
            valor_total: item.valor_total
        })
        ws.getRow(index + 2).font = {
            name: "Arial",
            family: 4,
            size: 8,
        };
        ws.getRow(index + 2).height = 15;
    })

    //Formato del Header
    let headCells = ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1', 'K1', 'L1', 'M1', 'N1', 'O1', 'P1']
    headCells.map(key => {
        ws.getCell(key).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'E33C29' }
        };
        ws.getCell(key).font = {
            name: "Arial",
            family: 4,
            size: 8,
            color: { argb: 'FFFFFF' }
        };
        ws.getCell(key).alignment = {
            vertical: "middle",
            horizontal: "center",
            wrapText: true,
        };
        ws.getCell(key).border = {
            top: { style: "thin", color: { argb: 'FFFFFF' } },
            left: { style: "thin", color: { argb: 'FFFFFF' } },
            bottom: { style: "thin", color: { argb: 'FFFFFF' } },
            right: { style: "thin", color: { argb: 'FFFFFF' } },
        };
    });
    ws.getRow(1).height = 42.5;

    //Exporta el libro
    ExcelJSWorkbook.xlsx.writeBuffer().then(function (buffer) {
        saveAs(
            new Blob([buffer], { type: "application/octet-stream" }),
            `Certificado ${certificado.certificado_numero}.xlsx`
        );
    });

}
