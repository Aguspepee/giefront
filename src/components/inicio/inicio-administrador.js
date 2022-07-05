import { Box, Container, Grid } from '@mui/material';
import { Budget } from './components/budget';
import { TasksProgress } from './components/tasks-progress';
import { TotalCustomers } from './components/total-customers';
import { TotalProfit } from './components/total-profit';
import { Sales } from './components/sales';
import { InicioTable } from './components/table';
import { useEffect, useState } from 'react';
import { inicioIndicadoresAdministrador } from '../../services/inicio';
import UserContext from './../../context/userContext';
import { useContext } from 'react';
import RateReviewIcon from '@mui/icons-material/RateReview';

function InicioAdministrador() {

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
        const res = await inicioIndicadoresAdministrador()
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
              xl={3}
              lg={6}
              sm={6}
              xs={12}
            >
              <TotalCustomers
                value={indicadores[0]?.partes_para_remitar}
                subvalue={indicadores[0]?.partes_para_remitar}
                title="Partes para Remitar"
                subtitle="" />
            </Grid>
            <Grid
              item
              xl={3}
              lg={6}
              sm={6}
              xs={12}
            >
              <TotalCustomers
                value={indicadores[0]?.remitos_para_certificar}
                ubvalue={0}
                title="Remitos para Certificar"
                subtitle="" />
            </Grid>
            <Grid
              item
              xl={3}
              lg={6}
              sm={6}
              xs={12}
            >
              <TotalCustomers
                value={`$${indicadores[0]?.monto_para_remitar}`}
                subvalue={indicadores[0]?.monto_para_remitar}
                title="Monto para remitar"
                subtitle="" />
            </Grid>
            <Grid
              item
              xl={3}
              lg={6}
              sm={6}
              xs={12}
            >
              <TotalCustomers 
              value={`$${indicadores[0]?.monto_para_certificar}`}
              subvalue={indicadores[0]?.monto_para_certificar}
              title="Monto para Certificar" 
              subtitle="" />
            </Grid>
            <Grid
              item
              lg={12}
              md={12}
              xl={12}
              xs={12}
            >
              <InicioTable reload={reload} handleReload={handleReload} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default InicioAdministrador;
