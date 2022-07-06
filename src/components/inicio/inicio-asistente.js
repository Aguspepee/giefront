import { Box, Container, Grid } from '@mui/material';
import { IndicadorSimple } from './components/indicador-simple';
import { InicioTable } from './components/table';
import { useEffect, useState } from 'react';
import { inicioIndicadoresAsistente } from '../../services/inicio';
import UserContext from './../../context/userContext';
import { useContext } from 'react';

//Icons
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import ReceiptIcon from '@mui/icons-material/Receipt';


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
        const res = await inicioIndicadoresAsistente()
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
                value={indicadores[0]?.remitos_pendiente_entrega}
                subvalue={indicadores[0]?.remitos_pendiente_entrega}
                title="Remitos para Entrega"
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
                value={indicadores[0]?.remitos_pendiente_firma}
                subvalue={indicadores[0]?.remitos_pendiente_firma}
                title="Remitos para Firma"
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
                value={indicadores[0]?.remitos_pendiente_certificado}
                subvalue={indicadores[0]?.remitos_pendiente_certificado}
                title="Remitos para Certificar"
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
                value={indicadores[0]?.certificado_realizado}
                subvalue={indicadores[0]?.certificado_realizado}
                title="Certificados Realizados"
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

export default InicioAsistente;