import React from "react";
import * as xlsx from "xlsx/xlsx.mjs";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { parteMasiva } from '../../services/partes';
import { dateToJS, dateTimeToJS, ExcelDateToJSDate } from '../../utils/date-format';


const insp = [
    {
        "nombre": "WATTSON, Alan Braian",
        "id": "62b2200cdad85c26fc3357d5"
    },
    {
        "nombre": "LARES, Cristian ",
        "id": "62b2203adad85c26fc3357fc"
    },
    {
        "nombre": "SANCHEZ, Daniel Oscar",
        "id": "62b22f147fcb0a68a54c6e12"
    },
    {
        "nombre": "FUENTES, Eduardo",
        "id": "62b223e9dad85c26fc3358d5"
    },
    {
        "nombre": "DE RUBERTIS, Ezequiel",
        "id": "62b22d847fcb0a68a54c6bc9"
    },
    {
        "nombre": "FERNANDEZ, Favio",
        "id": "62b22dbe7fcb0a68a54c6c17"
    },
    {
        "nombre": "ULLMAN, Franco",
        "id": "62b2241cdad85c26fc335923"
    },
    {
        "nombre": "ROMEGIALLI, Joaquin",
        "id": "62b22eef7fcb0a68a54c6dc4"
    },
    {
        "nombre": "MORENO, Jonathan",
        "id": "62b22ec07fcb0a68a54c6d76"
    },
    {
        "nombre": "GALLARDO, Jorge Nicolás ",
        "id": "62b2243edad85c26fc33594a"
    },
    {
        "nombre": "GAMARRA, Jose",
        "id": "62b22dda7fcb0a68a54c6c3e"
    },
    {
        "nombre": "GONZALEZ, Jose Maria",
        "id": "62b22e217fcb0a68a54c6cb3"
    },
    {
        "nombre": "GOMEZ, Juan Carlos",
        "id": "62b22df77fcb0a68a54c6c65"
    },
    {
        "nombre": "GUERRA MEDINA, Juan Rafael",
        "id": "62b22e387fcb0a68a54c6cda"
    },
    {
        "nombre": "LAVIOS, Lucas",
        "id": "62b2249bdad85c26fc335998"
    },
    {
        "nombre": "MARCINI, Manuel",
        "id": "62b22ea57fcb0a68a54c6d4f"
    },
    {
        "nombre": "HEREDIA, Marcos Gabriel ",
        "id": "62b2710730560522a06123e1"
    },
    {
        "nombre": "GIANELLI, Maria Laura",
        "id": "62b2250ddad85c26fc335a0d"
    },
    {
        "nombre": "IGLESIAS, Matias",
        "id": "62b22e6a7fcb0a68a54c6d01"
    },
    {
        "nombre": "JULIEN, Matias Agustin",
        "id": "62b22545dad85c26fc335a5b"
    },
    {
        "nombre": "ESPINOZA, Maximiliano Julio",
        "id": "62b22560dad85c26fc335a82"
    },
    {
        "nombre": "MONTES, Natalia",
        "id": "62b225a0dad85c26fc335aa9"
    },
    {
        "nombre": "CHICO, Natalia",
        "id": "62b22d267fcb0a68a54c6b54"
    },
    {
        "nombre": "ABITU, Nicolas",
        "id": "62b22641dad85c26fc335af7"
    },
    {
        "nombre": "DI MAURO, Pablo",
        "id": "62b22da87fcb0a68a54c6bf0"
    },
    {
        "nombre": "ZALAZAR, Paula",
        "id": "62b22f367fcb0a68a54c6e39"
    },
    {
        "nombre": "De SIMONE, Ricardo",
        "id": "62b2265adad85c26fc335b1e"
    },
    {
        "nombre": "CIVETTA, Rodrigo",
        "id": "62b22d657fcb0a68a54c6ba2"
    },
    {
        "nombre": "CHUQUILLAMPA, Roxana",
        "id": "62b22d4f7fcb0a68a54c6b7b"
    },
    {
        "nombre": "PADILLA, Wilson",
        "id": "62b22ed57fcb0a68a54c6d9d"
    },
    {
        "nombre": "GONZALEZ SANCHEZ, Yoselyn",
        "id": "62b22e0e7fcb0a68a54c6c8c"
    }
]

function UploaderParoPlanta({ Titulo, Subtitulo, fileTypes, ...props }) {
    let json = [];

    const convertToSchema = (item, adic) => {
        // console.log(item, adic)
        let operador = insp.filter((inspector) => inspector.nombre === item["Operador"])
        //console.log("operador",operador)
        let parte = [{
            contrato: { _id: "62c1b3db60d20f32d6847de2" },
            numero_reporte: item["OS pura"],
            numero_orden: item["OS pura"],
            tag: item["TAG"],
            items: [],
            operador: operador[0] ? operador[0].id : "62a4d4d885bad7c20edc997c",
            paga: "626d99480581fea5022d628e",
            fecha_inspeccion: ExcelDateToJSDate(item["inicio plan"]),

            //Items nuevos Paro de Planta
            OS_completa: item["O.S."],
            fecha_planificacion_inicio: ExcelDateToJSDate(item["inicio plan"]),
            fecha_planificacion_fin: ExcelDateToJSDate(item["fin plan"]),
            descripcion_actividad: item["Descripcion de Actividad"],
            JN: item["JN"],
            clasificacion: item["CLASIFICACION"],
            tiempo_plan: item["tiempo plan"],
            peso: Number(item["peso %"]),
            curva_S_plan: Number(item["curva S plan"])
        }]

        if (adic) {
            parte[0].items = [{
                codigo_servicio: item["ITEM"],
                cantidad: Number(item["CANT"])
            }, {
                codigo_servicio: adic["ITEM"],
                cantidad: Number(adic["CANT"])
            }]
        } else {
            parte[0].items = [{
                codigo_servicio: item["ITEM"],
                cantidad: Number(item["CANT"])
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
                    await parteMasiva(convertToSchema(json_item, json_adic)[0])
                } catch (e) {
                    console.log(e)
                }
            }
        })
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
                json = xlsx.utils.sheet_to_json(worksheet, { raw: true });
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
                </Card>
            </div>
        </>
    );
}

export default UploaderParoPlanta;