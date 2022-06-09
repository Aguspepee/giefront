import { Collapse } from '@mui/material';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import { Stack } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableRow } from '@mui/material';
import { parteEdit } from '../../../services/partes';
import StyledChipUpdate from '../../../styled-components/styled-chip-update';
import format from 'date-fns/format';


function RowDetails({open, parte, colums_quantity, handleReload, ...props}) {

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
                                    {parte?.operador[0].nombre}
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom component="div">
                                    Cliente
                                </Typography>
                                <Typography variant="body2" gutterBottom component="div">
                                    {parte?.cliente[0].nombre}
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom component="div">
                                    Contrato
                                </Typography>
                                <Typography variant="body2" gutterBottom component="div">
                                    {parte?.contrato[0].nombre}
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom component="div">
                                    Numero de Reporte
                                </Typography>
                                <Typography variant="body2" gutterBottom component="div">
                                    {parte?.numero_reporte}
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom component="div">
                                    Numero de Orden
                                </Typography>
                                <Typography variant="body2" gutterBottom component="div">
                                    {parte?.numero_orden}
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom component="div">
                                    Archivo
                                </Typography>
                                <Typography variant="body2" gutterBottom component="div">
                                    {parte?.archivo}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box style={{ maxWidth: "350px" }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Equipo
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom component="div">
                                    TAG
                                </Typography>
                                <Typography variant="body2" gutterBottom component="div">
                                    {parte.tag}
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom component="div">
                                    Detalle
                                </Typography>
                                <Typography variant="body2" gutterBottom component="div">
                                    {parte.tag_detalle !== "" ? parte.tag_detalle : "-"}
                                </Typography>
                                <Typography variant="h6" gutterBottom component="div">
                                    Actividad
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom component="div">
                                    Descripción del servicio
                                </Typography>
                                <Typography variant="body2" gutterBottom component="div">
                                    {parte.items[0].descripcion_servicio}
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom component="div">
                                    Cantidad
                                </Typography>
                                <Typography variant="body2" gutterBottom component="div">
                                    {parte.items[0].cantidad}
                                </Typography>
                                <Typography variant="h6" gutterBottom component="div">
                                    Adicionales
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom component="div">
                                    Descripción del servicio
                                </Typography>
                                <Typography variant="body2" gutterBottom component="div">
                                    {parte.items[0].descripcion_servicio}
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom component="div">
                                    Cantidad
                                </Typography>
                                <Typography variant="body2" gutterBottom component="div">
                                    {parte.items[0].cantidad}
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
                                            value={parte.trabajo_terminado}
                                            edit={parteEdit}
                                            field={"trabajo_terminado"}
                                            label={"Trabajo Terminado"}
                                            id={parte._id}
                                            handleReload={handleReload} />
                                        <Box>
                                            <Typography variant="subtitle2" gutterBottom component="div">
                                                Trabajo Terminado
                                            </Typography>
                                            <Typography variant="caption" gutterBottom component="div">
                                                Fecha: {parte.trabajo_terminado_fecha ? format(new Date(parte.trabajo_terminado_fecha), 'dd/MM/yyyy') : "-"}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                    <Stack direction="row" spacing={1}>
                                        <StyledChipUpdate
                                            value={parte.informe_realizado}
                                            edit={parteEdit}
                                            field={"informe_realizado"}
                                            label={"Informe Realizado"}
                                            id={parte._id}
                                            handleReload={handleReload} />
                                        <Box>
                                            <Typography variant="subtitle2" gutterBottom component="div">
                                                Informe Realizado
                                            </Typography>
                                            <Typography variant="caption" gutterBottom component="div">
                                                Fecha: {parte.informe_realizado_fecha ? format(new Date(parte.informe_realizado_fecha), 'dd/MM/yyyy') : "-"}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                    <Stack direction="row" spacing={1}>
                                        <StyledChipUpdate
                                            value={parte.informe_revisado}
                                            edit={parteEdit}
                                            field={"informe_revisado"}
                                            label={"Informe Revisado"}
                                            id={parte._id}
                                            handleReload={handleReload} />
                                        <Box>
                                            <Typography variant="subtitle2" gutterBottom component="div">
                                                Informe Revisado
                                            </Typography>
                                            <Typography variant="caption" gutterBottom component="div">
                                                Fecha: {parte.informe_revisado_fecha ? format(new Date(parte.informe_revisado_fecha), 'dd/MM/yyyy') : "-"}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                    <Stack direction="row" spacing={1}>
                                        <StyledChipUpdate
                                            value={parte.remito_realizado}
                                            edit={parteEdit}
                                            field={"remito_realizado"}
                                            label={"Remito Realizado"}
                                            id={parte._id}
                                            handleReload={handleReload} />
                                        <Box>
                                            <Typography variant="subtitle2" gutterBottom component="div">
                                                Remito Realizado
                                            </Typography>
                                            <Typography variant="caption" gutterBottom component="div">
                                                Fecha: {parte.remito_realizado_fecha ? format(new Date(parte.remito_realizado_fecha), 'dd/MM/yyyy') : "-"}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                    <Stack direction="row" spacing={1}>
                                        <StyledChipUpdate
                                            value={parte.certificado_realizado}
                                            edit={parteEdit}
                                            field={"certificado_realizado"}
                                            label={"Certificado Realizado"}
                                            id={parte._id}
                                            handleReload={handleReload} />
                                        <Box>
                                            <Typography variant="subtitle2" gutterBottom component="div">
                                                Certificado Realizado
                                            </Typography>
                                            <Typography variant="caption" gutterBottom component="div">
                                                Fecha: {parte.certificado_realizado_fecha ? format(new Date(parte.certificado_realizado_fecha), 'dd/MM/yyyy') : "-"}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Stack>
                                <Typography variant="h6" gutterBottom component="div" >
                                    Modificado
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom component="div">
                                    Fecha
                                </Typography>
                                <Typography variant="body2" gutterBottom component="div">
                                    {parte.tag}
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom component="div">
                                    Usuario
                                </Typography>
                                <Typography variant="body2" gutterBottom component="div">
                                    {parte.tag}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Collapse>
            </TableCell>
        </TableRow>
    )
}

export default RowDetails

