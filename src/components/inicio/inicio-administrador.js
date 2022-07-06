import { Box, Container, Grid } from '@mui/material';
import { IndicadorSimple } from './components/indicador-simple';
import { InicioTable } from './components/table';
import { useEffect, useState } from 'react';
import { inicioIndicadoresAdministrador } from '../../services/inicio';
import UserContext from './../../context/userContext';
import { useContext } from 'react';

//Icons
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import ReceiptIcon from '@mui/icons-material/Receipt';

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
              <IndicadorSimple
                value={indicadores[0]?.partes_para_remitar}
                subvalue={indicadores[0]?.partes_para_remitar}
                title="Partes para Remitar"
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
                value={indicadores[0]?.remitos_para_certificar}
                subvalue={0}
                title="Remitos para Certificar"
                subtitle=""
                Icon={() => <ReceiptIcon />}
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
                value={indicadores[0]?`$${indicadores[0]?.monto_para_remitar}`:`$0`}
                subvalue={indicadores[0]?.monto_para_remitar}
                title="Monto para remitar"
                subtitle=""
                Icon={() => <AttachMoneyIcon />}
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
                value={indicadores[0]?`$${indicadores[0]?.monto_para_certificar}`:`$0`}
                subvalue={indicadores[0]?.monto_para_certificar}
                title="Monto para Certificar"
                subtitle=""
                Icon={() => <AttachMoneyIcon />}
                backgroundColor='warning.main'
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

export default InicioAdministrador;
