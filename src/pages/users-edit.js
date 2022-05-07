import { Box, Container, Grid, Typography } from '@mui/material';
import { UsersEditProfile } from '../components/users-edit/users-edit-profile';
import { UsersEditProfileDetails } from '../components/users-edit/users-edit-profile-details';
import { DashboardLayout } from '../layout/layout';
import { UsersEditPassword } from '../components/users-edit/users-edit-password';

function UsersEdit() {
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
            Editar Usuario
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
              <UsersEditProfile />
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
                  <UsersEditProfileDetails />
                </Grid>
                <Grid
                  item
                  lg={12}
                  md={12}
                  xs={12}
                >
                  <UsersEditPassword />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </DashboardLayout>
  )
}


export default UsersEdit;
