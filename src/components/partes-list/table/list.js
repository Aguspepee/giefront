export const headCells = [
    {
        id: 'numero_reporte',
        numeric: false,
        disablePadding: true,
        label: 'Número de Reporte',
        width: null,
        show: true,
        placeHolder: "#",
        type: "text", //text, number, date, select, none
    },
    {
        id: 'tag',
        numeric: false,
        disablePadding: false,
        label: 'TAG Equipo',
        width: null,
        show: true,
        placeHolder: "#",
        type: "text", 
        
    },
    {
        id: 'items[0].descripcion_servicio',
        numeric: false,
        disablePadding: true,
        label: 'Descripción del Servicio',
        width: "400px",
        show: true,
        placeHolder: "Servicio",
        type: "text",
    },
    {
        id: 'items[0]cantidad',
        numeric: true,
        disablePadding: false,
        label: 'Cantidad',
        width: null,
        show: true,
        placeHolder: "#",
        type: "text", 
    },
    {
        id: 'inspector',
        numeric: false,
        disablePadding: true,
        label: 'Operador',
        width: "150px",
        show: true,
        placeHolder: "Operador",
        type: "text", 
    },
    {
        id: 'numero_orden',
        numeric: false,
        disablePadding: false,
        label: 'Número Orden',
        width: null,
        show: true,
        placeHolder: "#",
        type: "text", 
    },
    {
        id: 'cliente',
        numeric: false,
        disablePadding: true,
        label: 'Cliente',
        width: null,
        show: true,
        placeHolder: "-",
        type: "text", 
    },
    {
        id: 'contrato',
        numeric: false,
        disablePadding: false,
        label: 'Contrato',
        width: null,
        show: true,
        placeHolder: "-",
        type: "text", 
    },
    {
        id: 'unidad',
        numeric: false,
        disablePadding: true,
        label: 'Unidad',
        width: null,
        show: true,
        placeHolder: "-",
        type: "text", 
    },
    {
        id: 'fecha_carga',
        numeric: false,
        disablePadding: false,
        label: 'Fecha Carga',
        width: "190px",
        show: true,
        placeHolder: "-",
        type: "date", 
    },
    {
        id: 'fecha_inspeccion',
        numeric: false,
        disablePadding: false,
        label: 'Fecha Inspeccion',
        width: "190px",
        show: true,
        placeHolder: "-",
        type: "text", 
    },
    {
        id: 'semana_inspeccion',
        numeric: false,
        disablePadding: false,
        label: 'Semana de Inspección',
        width: null,
        show: true,
        placeHolder: "-",
        type: "text", 
    },
    {
        id: 'informe_realizado',
        numeric: false,
        disablePadding: false,
        label: 'Informe Realizado',
        width: null,
        show: true,
        placeHolder: "-",
        type: "select",
    },
    {
        id: 'items[0].codigo_servicio',
        numeric: false,
        disablePadding: false,
        label: 'Ítem Contrato',
        width: null,
        show: true,
        placeHolder: "-",
        type: "text", 
    },
    {
        id: 'archivo',
        numeric: false,
        disablePadding: false,
        label: 'Unidad Medida',
        width: null,
        show: true,
        placeHolder: "-",
        type: "none",
    },
];