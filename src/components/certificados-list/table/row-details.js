import { Collapse, Table, TableBody, TableHead, TextField, Tooltip, IconButton } from '@mui/material';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import { Stack } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableRow } from '@mui/material';
import { certificadoEstado } from '../../../services/certificados';
import StyledChipUpdate from '../../../styled-components/styled-chip-update';
import format from 'date-fns/format';
import { parteDeleteRemito, parteEdit } from '../../../services/partes';


//icons
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOff from "@mui/icons-material/HighlightOff";



function RowDetails({ open, certificado, colums_quantity, handleReload, handleConfirmDialogChange, handleNotifyChange, ...props }) {

    const handleDelete = (id) => {
        parteDeleteRemito({ data: { ["certificado_realizado"]: false }, id })
        handleConfirmDialogChange({
            isOpen: false,
            title: "",
            subTitle: ""
        })
        handleNotifyChange({
            isOpen: true,
            message: 'El item se eliminó correctamente',
            type: 'error'
        })
        handleReload()
    }

    return (
        <TableRow style={{ backgroundColor: "#F3F4F6" }}>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={colums_quantity}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Grid container spacing={4} style={{ padding: "1em" }}>
                    <Grid item>
                            <Box style={{ width: "900px", paddingBottom: "1em" }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Ítems y Adicionales
                                </Typography>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow style={{ backgroundColor: "#d8d8d8", height: "6em",fontSize: '0.5em' }}>
                                            <TableCell >CÓDIGO</TableCell>
                                            <TableCell >DESCRIPCIÓN</TableCell>
                                            <TableCell >EQUIPO</TableCell>
                                            <TableCell >FECHA</TableCell>
                                            <TableCell>CLASE</TableCell>
                                            <TableCell>CANTIDAD</TableCell>
                                            <TableCell>VALOR UNITARIO</TableCell>
                                            <TableCell>VALOR TOTAL</TableCell>
                                             <TableCell></TableCell> 
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {certificado.items.map((item) => {
                                            return (
                                                <TableRow key={`${item.id} ${item.clase}`} style={{ backgroundColor: item.clase === "Ítem" ? "#f0f0f0" : "#f9f9f9" }}>
                                                    <TableCell style={{fontSize: '0.8em'}}>{item.codigo}</TableCell>
                                                    <TableCell style={{fontSize: '0.8em'}}>{item.detalle}</TableCell>
                                                    <TableCell style={{fontSize: '0.8em'}}>{item.equipo}</TableCell>
                                                    <TableCell style={{fontSize: '0.8em'}}>{item.fecha_inspeccion ? format(new Date(item.fecha_inspeccion), 'dd/MM/yyyy') : "-"}{ }</TableCell>
                                                    <TableCell style={{fontSize: '0.8em'}}>{item.clase}</TableCell>
                                                    <TableCell style={{fontSize: '0.8em'}}>{item.cantidad}</TableCell>
                                                    <TableCell style={{fontSize: '0.8em'}}>{item.valor_unitario}</TableCell>
                                                    <TableCell style={{fontSize: '0.8em'}}>{item.valor_total}</TableCell>
                                                   <TableCell><TextField id="standard-basic" variant="standard"  size="small" style={{ width:"70px"}} inputProps={{ style: { fontSize: "0.7em" } }} value={item.valor_total}/></TableCell>
                                                    {/* <TableCell>
                                                        {item.clase === "Ítem" &&
                                                            <Tooltip title="Eliminar certificado">
                                                                <IconButton sx={{ ml: 1 }} onClick={() => {
                                                                    handleConfirmDialogChange({
                                                                        isOpen: true,
                                                                        title: "¿Deseas eliminar este ítem del certificado?",
                                                                        subTitle: "Luego de eliminarlo, no podrás recuperar la información.",
                                                                        onConfirm: () => { handleDelete(item.id) },
                                                                        icon: <HighlightOff fontSize='inherit' color="error" />
                                                                    })
                                                                }}>
                                                                    <DeleteIcon fontSize="small" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        }
                                                    </TableCell> */}
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box style={{ maxWidth: "300px" }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Datos generales
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom component="div">
                                    Operador/a
                                </Typography>
                                <Typography variant="body2" gutterBottom component="div">
                                    {certificado?.operador[0].nombre} {certificado?.operador[0].apellido}
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom component="div">
                                    Planta
                                </Typography>
                                <Typography variant="body2" gutterBottom component="div">
                                    {certificado?.planta}
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom component="div">
                                    Contrato
                                </Typography>
                                <Typography variant="body2" gutterBottom component="div">
                                    {certificado?.contrato[0].nombre}
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom component="div">
                                    Certificado
                                </Typography>
                                <Typography variant="body2" gutterBottom component="div">
                                    {certificado?.certificado_numero}
                                </Typography>
                            </Box>
                            <Box style={{ maxWidth: "300px" }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Estado
                                </Typography>
                                <Stack direction="column" spacing={0} style={{ paddingBottom: "1em" }}>
                                    <Stack direction="row" spacing={1}>
                                        <StyledChipUpdate
                                            value={certificado.certificado_finalizado}
                                            edit={certificadoEstado}
                                            field={"certificado_finalizado"}
                                            label={"Remito Finalizado"}
                                            id={certificado._id}
                                            handleReload={handleReload} />
                                        <Box>
                                            <Typography variant="subtitle2" gutterBottom component="div">
                                                Certificado Finalizado
                                            </Typography>
                                            <Typography variant="caption" gutterBottom component="div">
                                                Fecha: {certificado.certificado_finalizado ? format(new Date(certificado.certificado_finalizado_fecha), 'dd/MM/yyyy') : "-"}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Stack>
                            </Box>
                        </Grid>
                        
                    </Grid>
                </Collapse>
            </TableCell>
        </TableRow>
    )
}

export default RowDetails

