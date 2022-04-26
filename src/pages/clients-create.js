import { Box, Container, Grid, Typography } from '@mui/material';
import { ClientCreateProfile } from '../components/clients-create/clients-create-profile';
import { ClientCreateDetails } from '../components/clients-create/clients-create-details';
import { DashboardLayout } from '../layout/layout';

function ClientsEdit() {


  
  return (
    <DashboardLayout>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Typography
            sx={{ mb: 3 }}
            variant="h4"
          >
            Crear Cliente
          </Typography>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <ClientCreateProfile />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  lg={12}
                  md={12}
                  xs={12}
                >
                  <ClientCreateDetails />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </DashboardLayout>
  )
}


export default ClientsEdit;
