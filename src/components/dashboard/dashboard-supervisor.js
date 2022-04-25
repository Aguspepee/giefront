import { Box, Container, Grid} from '@mui/material';

function DashboardSupervisor() {
  return (
    <>
    Supervisor
          <Container maxWidth={false}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
              >
              </Grid>
              <Grid
                item
                xl={3}
                lg={3}
                sm={6}
                xs={12}
              >
              </Grid>
              <Grid
                item
                xl={3}
                lg={3}
                sm={6}
                xs={12}
              >
              </Grid>
              <Grid
                item
                xl={3}
                lg={3}
                sm={6}
                xs={12}
              >
              </Grid>
              <Grid
                item
                lg={12}
                md={12}
                xl={12}
                xs={12}
              >
              </Grid>
            </Grid>
          </Container>
    </>
  )
}

export default DashboardSupervisor;
