import { Box, Container, Grid } from '@mui/material';
import { Budget } from './components/budget';
import { TasksProgress } from './components/tasks-progress';
import { TotalCustomers } from './components/total-customers';
import { TotalProfit } from './components/total-profit';
import { Sales } from './components/sales';
import { InicioTable } from './components/table';
import { useEffect, useState } from 'react';
import { inicioIndicadoresInspector } from '../../services/inicio';
import UserContext from './../../context/userContext';
import { useContext } from 'react';
import RateReviewIcon from '@mui/icons-material/RateReview';

function InicioAsistente() {
  
  const [reload, setReload] = useState(false)
  const [user, setUser] = useContext(UserContext);
  const [indicadores, setIndicadores] = useState([])

  const handleReload = () => {
    setReload(!reload)
    console.log("cambio")
  }
  useEffect(() => {
    const getIndicadores = async () => {
      try {
       const res = await inicioIndicadoresInspector(user._id)
       setIndicadores(res.data)
      } catch (e) {
        console.log(e)
      }
    }
    getIndicadores()
  }, [reload])
console.log(indicadores)
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
              <TotalCustomers 
              value={indicadores[0]?.inspecciones_realizadas} 
              subvalue={indicadores[0]?.inspecciones_realizadas} 
              title="Inspecciones" 
              subtitle="" />
            </Grid>
            <Grid
              item
              xl={3}
              lg={3}
              sm={6}
              xs={12}
            >
              <TotalCustomers 
              value={indicadores[0]?.trabajos_no_terminados} 
              ubvalue={0} 
              title="Trabajos Pendientes" 
              subtitle="" />
            </Grid>
            <Grid
              item
              xl={3}
              lg={3}
              sm={6}
              xs={12}
            >
              <TotalCustomers value={indicadores[0]?.informes_no_realizados} subvalue={0} title="Informes Penedientes" subtitle="" />
            </Grid>
            <Grid
              item
              xl={3}
              lg={3}
              sm={6}
              xs={12}
            >
              <TotalCustomers value={indicadores[0]?.inspecciones_realizadas} subvalue={0} title="Informes en Revisión" subtitle="" />
            </Grid>
            <Grid
              item
              lg={12}
              md={12}
              xl={12}
              xs={12}
            >
              <InicioTable reload={reload} handleReload={handleReload}/>
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
