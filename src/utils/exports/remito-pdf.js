import jsPDF from "jspdf";
//import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import logo1 from './logo1.png';
import logo2 from './logo2.png';

export function remitoPDF(remito) {
    const doc = new jsPDF()
    console.log("Remito", remito.items)
    let end = 0

    //HEADER
    doc.autoTable({
        showHead: false,
        bodyStyles: {
            fontSize: 7,
            halign: 'left',
            valign: 'middle',
            lineWidth: 0,
            cellPadding: [0.5, 1, 0.5, 5]
        },
        body: [
            ['', ''],
            ['REMITO', 'ssdfsdfsdf'],
            ['GIE S.A.'],
            ['CUIT 30-69001149-9'],
            ['34-DOWAR-022019-026-00-00'],
            ['Galicia N° 52, Mar del Plata, Buenos Aires (7600)'],
            ['Telefono (+54) 0223-482-2308   Fax (+54) 0223- 482-2308'],
            ['www.giegroup.net'],
            ['Senor/es: PBB-Polisur', `N° de REMITO: ${remito.remito_numero}`],
            ['Domicilio: Bahia Blanca', `Fecha: ${remito.fecha ? format(new Date(remito.fecha), 'dd/MM/yyyy') : "-"}`],
        ],
        tableLineWidth: 0.4,
        theme: 'grid',
        didParseCell: function (data) {
            //Le da los estilos a la primera fila "REMITO"
            if (data.row.index === 0) {
                data.cell.styles.minCellHeight = 13
                if (data.column.dataKey === 0) {
                    data.cell.styles.halign = 'left'
                }
                if (data.column.dataKey === 1) {
                    data.cell.styles.halign = 'right'
                }
            }
            if (data.row.index === 1) {
                data.cell.styles.fontSize = 16
                data.cell.styles.halign = 'center'
                data.cell.styles.valign = 'middle'
                data.cell.styles.fontStyle = 'normal'
                data.cell.colSpan = 2
            }
            if (data.row.index === 8 || data.row.index === 9) {
                data.cell.styles.fontSize = 9
                data.cell.styles.valign = 'middle'
                data.cell.styles.fontStyle = 'normal'
                data.cell.styles.textColor = [99, 150, 140]
                data.cell.styles.cellPadding = [1, 5, 1, 5]
                if (data.column.dataKey === 0) {
                    data.cell.styles.halign = 'left'
                }
                if (data.column.dataKey === 1) {
                    data.cell.styles.halign = 'right'
                }
            }
        },
        didDrawPage: (d) => {
            end = d.cursor.y
            console.log(d.cursor.y)
        },
        didDrawCell: function (data) {
            if (data.section === 'body' && data.row.index === 0) {
                 if (data.column.index === 0) {
                    doc.addImage(
                        logo1,
                        'PNG',
                        data.cell.x + 5,
                        data.cell.y + 5,
                        50,
                        5
                    )
                } 
                 if (data.column.index === 1) {
                    doc.addImage(
                        logo2,
                        'PNG',
                        data.cell.x + 55,
                        data.cell.y + 5,
                        7,
                        7
                    )
                } 

            }
        },
    })

    //BODY
    doc.autoTable({
        startY: end,
        headStyles: {
            fillColor: [227, 60, 41],
            fontSize: 7,
            halign: 'center',
            valign: 'middle'
        },
        bodyStyles: {
            fontSize: 7,
            halign: 'center',
            valign: 'middle',
            lineWidth: 0.4
        },
        columnStyles: { 0: { fontStyle: 'bold', textColor: [99, 150, 140] } },
        head: [['CANT', 'ITEM', 'DETALLE', 'EQUIPO', 'FECHA ENSAYO', 'FECHA INFORME', 'OT']],
        body: remito.items.map((item) => [
            item.cantidad,
            item.codigo,
            item.detalle,
            item.equipo,
            item.fecha_inspeccion ? format(new Date(item.fecha_inspeccion), 'dd/MM/yyyy') : "",
            item.fecha_informe ? format(new Date(item.fecha_informe), 'dd/MM/yyyy') : "-",
            item.OT]),
        tableLineWidth: 0.4,
        //tableLineColor: [231, 76, 60],
        margin: { bottom: 0 },
        theme: 'grid',
        didDrawPage: (d) => {
            end = d.cursor.y
            console.log(d.cursor.y)
        },
    })
   // doc.addSvg(img1)

    //FOOTER
    doc.autoTable({
        startY: end,
        headStyles: {
            fillColor: [227, 60, 41],
            fontSize: 7,
            halign: 'left',
            valign: 'middle',
        },
        bodyStyles: {
            fontSize: 7,
            halign: 'right',
            valign: 'middle',
            lineWidth: 0
        },
        columnStyles: {
            0: { fontStyle: 'bold', },
            1: { halign: 'left', }
        },
        head: [[`PLANTA: ${remito.planta}`, ""]],
        body: [["Firma:", ""], ["  Aclaración:", ""], ["Fecha:", "       /        /       "]],
        tableLineWidth: 0.4,
        theme: 'grid',
        didDrawPage: (d) => {
            end = d.cursor.y
            console.log(d.cursor.y)
        },
    })


    //doc.save('table.pdf')
    window.open(doc.output('bloburl'));
}
