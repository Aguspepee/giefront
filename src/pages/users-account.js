import { Box, Container, Grid, Typography } from '@mui/material';
import { UsersAccountProfile } from '../components/users-account/users-account-profile';
import { UsersAccountProfileDetails } from '../components/users-account/users-account-profile-details';
import { DashboardLayout } from '../components/dashboard-layout';
import { UsersAccountPassword } from '../components/users-account/users-account-password';

function UsersAccount() {
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
            Editar Cuenta
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
              <UsersAccountProfile />
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
                  <UsersAccountProfileDetails />
                </Grid>
                <Grid
                  item
                  lg={12}
                  md={12}
                  xs={12}
                >
                  <UsersAccountPassword />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </DashboardLayout>
  )
}


export default UsersAccount;
