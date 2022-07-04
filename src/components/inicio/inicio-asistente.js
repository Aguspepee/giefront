import { Box, Container, Grid } from '@mui/material';
import { Budget } from './components/budget';
import { TasksProgress } from './components/tasks-progress';
import { TotalCustomers } from './components/total-customers';
import { TotalProfit } from './components/total-profit';
import { Sales } from './components/sales';
import { InicioTable } from './components/table';


function InicioAsistente() {
  return (
    <>
      <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 2
      }}
    >
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
            <TotalCustomers />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalCustomers />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalCustomers />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalCustomers />
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
             <InicioTable/>
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            {/* <TrafficByDevice sx={{ height: '100%' }} /> */}
          </Grid>
{/*           <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestProducts sx={{ height: '100%' }} />
          </Grid> */}
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
           {/*  <LatestOrders /> */}
          </Grid>
        </Grid>
      </Container>
    </Box>
        </>
        )
}

        export default InicioAsistente;
