import { Box, Container, Grid } from '@mui/material';
import { IndicadorSimple } from './components/indicador-simple';
import { InicioTable } from './components/table';
import { useEffect, useState } from 'react';
import { inicioIndicadoresInspector } from '../../services/inicio';
import UserContext from './../../context/userContext';
import { useContext } from 'react';

//Icons
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import ReceiptIcon from '@mui/icons-material/Receipt';


function InicioInspector() {
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
        const res = await inicioIndicadoresInspector({id:user._id})
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
              <IndicadorSimple
                value={indicadores[0]?.inspecciones_realizadas}
                subvalue={indicadores[0]?.inspecciones_realizadas}
                title="Inspecciones Cargadas"
                subtitle=""
                Icon={() => <StickyNote2Icon />}
                backgroundColor='secondary.main'
              />
            </Grid>
            <Grid
              item
              xl={3}
              lg={6}
              sm={6}
              xs={12}
            >
              <IndicadorSimple
                value={indicadores[0]?.trabajos_no_terminados}
                subvalue={indicadores[0]?.trabajos_no_terminados}
                title="Trabajos No Terminados"
                subtitle=""
                Icon={() => <StickyNote2Icon />}
                backgroundColor='warning.main'
              />
            </Grid>
            <Grid
              item
              xl={3}
              lg={6}
              sm={6}
              xs={12}
            >
              <IndicadorSimple
                value={indicadores[0]?.informes_no_realizados}
                subvalue={indicadores[0]?.informes_no_realizados}
                title="Informes No Realizados"
                subtitle=""
                Icon={() => <StickyNote2Icon />}
                backgroundColor='error.main'
              />
            </Grid>
            <Grid
              item
              xl={3}
              lg={6}
              sm={6}
              xs={12}
            >
              <IndicadorSimple
                value={indicadores[0]?.informes_en_revision}
                subvalue={indicadores[0]?.informes_en_revision}
                title="Informes en revision"
                subtitle=""
                Icon={() => <StickyNote2Icon />}
                backgroundColor='primary.main'
              />
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

export default InicioInspector;