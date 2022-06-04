import React from "react";
import * as xlsx from "xlsx/xlsx.mjs";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
//import { deleteAll, createAll } from "../../Services/uploadService"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { parteCreate } from '../../services/partes';
import { dateToJS } from '../../utils/date-format';

function Uploader(props) {
    let json = [];
    const Titulo = props.Titulo;
    const Subtitulo = props.Subtitulo;
    const fileTypes = props.fileTypes;
    const [open, setOpen] = React.useState(false);
    const [succes, setSucces] = React.useState(false);

    const convertToSchema = (item, adic) => {
        console.log(item, adic)
        let parte = [{
            contrato: "Contrato de Radiografía",
            numero_reporte: item["Nº Rep."],
            numero_orden: item["Nº Rep."],
            tag: item["TAG"],
            tag_detalle: "",
            items:[],
            informe_realizado: item["Informe Realizado"] === "NO" ? false : true,
            inspector: item["Operador"],
            unidad: item["Unidad"],
            //Campos Booleano/Fecha
            fecha_inspeccion: dateToJS(item["Fecha de Ensayo"]),
            trabajo_terminado_fecha: dateToJS(item["Fecha de Ensayo"]),
            informe_realizado_fecha: dateToJS(item["Fecha Informe"]),
            remito_realizado_fecha: dateToJS(item["Fecha Remito"]),
        }]

        if (adic) {
            parte[0].items = [{
                descripcion_servicio: item["Descripción"],
                cantidad: Number(item["Cant."])
            }, {
                descripcion_servicio: adic["Descripción"],
                cantidad: Number(adic["Cant."])
            }]
        }else{
            parte[0].items = [{
                descripcion_servicio: item["Descripción"],
                cantidad: Number(item["Cant."])
            }]
        }



        console.log(parte)
        return (parte)
    }

    function uploadFiles(json) {
        json.map(async (item, index) => {
            if (item["Tipo Ensayo"] !== "ADICIONAL") {
                let json_item = item;
                let json_adic = json[index - 1] ? json[index - 1]["Tipo Ensayo"] === "ADICIONAL" ? json[index - 1] : null : null;
                try {
                    await parteCreate(convertToSchema(json_item, json_adic)[0])
                } catch (e) {
                    console.log(e)
                }
            }
        })
        /* deleteAll(dbSubBaseURL).then(createAll(dbSubBaseURL, json)
            .then((res) => {
                setOpen(false)
                setSucces(true)
                const ots = res.data;
                console.log("Se cargaron los archivos", ots);
            })
        ); */
    }

    const readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                json = xlsx.utils.sheet_to_json(worksheet, { raw: false });
                console.log(json);
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    };

    return (
        <>

            <div style={{ paddingTop: "10px" }}>
                <Card style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                    <CardContent>
                        <CardHeader
                            title={Titulo}
                            subheader={Subtitulo}
                        />
                        <form style={{ padding: " 0em 3em 0em 3em" }}>
                            <div>
                                <label htmlFor="upload"></label>
                            </div>
                            <input
                                type="file"
                                name="upload"
                                id="upload"
                                onChange={readUploadFile}
                                accept={fileTypes}
                            />
                            <div style={{ padding: "1em 1em 1em 1em" }}>
                                <Button variant="contained" onClick={() => uploadFiles(json)}>
                                    Guardar
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                    <Collapse in={succes}>
                        <Alert action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setSucces(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                            severity="success">
                            El archivo se cargó correctamente
                        </Alert>
                    </Collapse>
                </Card>
            </div>
            <div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        </>
    );
}

export default Uploader;