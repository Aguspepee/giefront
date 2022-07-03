import { Box, Container, Grid, Typography } from '@mui/material';
import { DashboardLayout } from '../layout/layout';
import UploaderInspecciones from '../components/settings/uploader-inspecciones';
import UploaderParoPlanta from '../components/settings/uploader-paro-planta';


function Settings() {
    return (
        <DashboardLayout>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 4
                }}
            >
                <Container maxWidth="lg">
                    <Typography
                        sx={{ mb: 3 }}
                        variant="h4"
                    >
                        Configuración
                    </Typography>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid item>
                            <UploaderInspecciones
                                dbSubBaseURL="sapBase"
                                Titulo="Base de datos de Inspección"
                                Subtitulo="Seleccione el archivo"
                                fileTypes=".xlsx , xls"
                            ></UploaderInspecciones>
                        </Grid>
                        <Grid item>
                            <UploaderParoPlanta
                                dbSubBaseURL="sapBase"
                                Titulo="Base de datos de Paro de Planta"
                                Subtitulo="Seleccione el archivo"
                                fileTypes=".xlsx , xls"
                            ></UploaderParoPlanta>
                        </Grid>




                    </Grid>
                </Container>
            </Box>
        </DashboardLayout>
    )
}


export default Settings;
