import { Collapse, Table, TableBody, TableHead, Tooltip, IconButton } from '@mui/material';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import { Stack } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableRow } from '@mui/material';
import { remitoEstado } from '../../../services/remitos';
import StyledChipUpdate from '../../../styled-components/styled-chip-update';
import format from 'date-fns/format';
import { parteDeleteRemito, parteEdit } from '../../../services/partes';


//icons
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOff from "@mui/icons-material/HighlightOff";



function RowDetails({ open, remito, colums_quantity, handleReload, handleConfirmDialogChange, handleNotifyChange, ...props }) {

    const handleDelete = (id) => {
        parteDeleteRemito({ data: { ["remito_realizado"]: false }, id })
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
                            <Box style={{ maxWidth: "300px" }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Datos generales
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom component="div">
                                    Operador/a
                                </Typography>
                                <Typography variant="body2" gutterBottom component="div">
                                    {remito?.operador[0].nombre} {remito?.operador[0].apellido}
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom component="div">
                                    Planta
                                </Typography>
                                <Typography variant="body2" gutterBottom component="div">
                                    {remito?.planta}
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom component="div">
                                    Contrato
                                </Typography>
                                <Typography variant="body2" gutterBottom component="div">
                                    {remito?.contrato[0].nombre}
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom component="div">
                                    Certificado
                                </Typography>
                                <Typography variant="body2" gutterBottom component="div">
                                    {remito?.certificado_numero}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box style={{ maxWidth: "300px" }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Estados
                                </Typography>

                                <Stack direction="column" spacing={0} style={{ paddingBottom: "1em" }}>
                                    <Stack direction="row" spacing={1}>
                                        <StyledChipUpdate
                                            value={remito.remito_revisado}
                                            edit={remitoEstado}
                                            field={"remito_revisado"}
                                            label={"Remito Revisado"}
                                            id={remito._id}
                                            handleReload={handleReload} />
                                        <Box>
                                            <Typography variant="subtitle2" gutterBottom component="div">
                                                Remito Revisado
                                            </Typography>
                                            <Typography variant="caption" gutterBottom component="div">
                                                Fecha: {remito.remito_revisado ? format(new Date(remito.remito_revisado_fecha), 'dd/MM/yyyy') : "-"}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                    <Stack direction="row" spacing={1}>
                                        <StyledChipUpdate
                                            value={remito.remito_entregado}
                                            edit={remitoEstado}
                                            field={"remito_entregado"}
                                            label={"Remito Entregado"}
                                            id={remito._id}
                                            handleReload={handleReload} />
                                        <Box>
                                            <Typography variant="subtitle2" gutterBottom component="div">
                                                Remito Entregado
                                            </Typography>
                                            <Typography variant="caption" gutterBottom component="div">
                                                Fecha: {remito.remito_entregado ? format(new Date(remito.remito_entregado_fecha), 'dd/MM/yyyy') : "-"}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                    <Stack direction="row" spacing={1}>
                                        <StyledChipUpdate
                                            value={remito.remito_firmado}
                                            edit={remitoEstado}
                                            field={"remito_firmado"}
                                            label={"Remito Firmado"}
                                            id={remito._id}
                                            handleReload={handleReload} />
                                        <Box>
                                            <Typography variant="subtitle2" gutterBottom component="div">
                                                Remito Firmado
                                            </Typography>
                                            <Typography variant="caption" gutterBottom component="div">
                                                Fecha: {remito.remito_firmado ? format(new Date(remito.remito_firmado_fecha), 'dd/MM/yyyy') : "-"}
                                            </Typography>
                                        </Box>
                                    </Stack>

                                </Stack>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box style={{ width: "800px", paddingBottom: "1em" }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Ítems y Adicionales
                                </Typography>
                                <Table >
                                    <TableHead>
                                        <TableRow style={{ backgroundColor: "#d8d8d8" }}>
                                            <TableCell>CÓDIGO</TableCell>
                                            <TableCell style={{ minWidth: "300px" }}>DESCRIPCIÓN</TableCell>
                                            <TableCell >EQUIPO</TableCell>
                                            <TableCell >FECHA</TableCell>
                                            <TableCell>CANTIDAD</TableCell>
                                            <TableCell>CLASE</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {remito.items.map((item) => {
                                            return (
                                                <TableRow key={`${item.id} ${item.clase}`} style={{ backgroundColor: item.clase === "Ítem" ? "#f0f0f0" : "#f9f9f9" }}>
                                                    <TableCell>{item.codigo}</TableCell>
                                                    <TableCell>{item.detalle}</TableCell>
                                                    <TableCell>{item.equipo}</TableCell>
                                                    <TableCell>{item.fecha_inspeccion ? format(new Date(item.fecha_inspeccion), 'dd/MM/yyyy') : "-"}{ }</TableCell>
                                                    <TableCell>{item.cantidad}</TableCell>
                                                    <TableCell>{item.clase}</TableCell>
                                                    <TableCell>
                                                        {item.clase === "Ítem" &&
                                                            <Tooltip title="Eliminar remito">
                                                                <IconButton sx={{ ml: 1 }} onClick={() => {
                                                                    handleConfirmDialogChange({
                                                                        isOpen: true,
                                                                        title: "¿Deseas eliminar este ítem del remito?",
                                                                        subTitle: "Luego de eliminarlo, no podrás recuperar la información.",
                                                                        onConfirm: () => { handleDelete(item.id) },
                                                                        icon: <HighlightOff fontSize='inherit' color="error" />
                                                                    })
                                                                }}>
                                                                    <DeleteIcon fontSize="small" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        }
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Grid>
                    </Grid>
                </Collapse>
            </TableCell>
        </TableRow>
    )
}

export default RowDetails

