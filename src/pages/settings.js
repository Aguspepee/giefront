import { Box, Container, Grid, Typography } from '@mui/material';
import { DashboardLayout } from '../layout/layout';
import Uploader from '../components/settings/Uploader';

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
                        <Uploader
                            dbSubBaseURL="sapBase"
                            Titulo="Base de datos de Inspección"
                            Subtitulo="Seleccione el archivo"
                            fileTypes=".xlsx , xls"
                        ></Uploader>





                    </Grid>
                </Container>
            </Box>
        </DashboardLayout>
    )
}


export default Settings;
