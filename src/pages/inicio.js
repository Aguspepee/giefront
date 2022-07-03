import { useContext } from 'react';
import { Box } from '@mui/material';
import { DashboardLayout } from '../layout/layout';
import UserContext from '../context/userContext';

//Inicios por usuario
import InicioAdministrador from '../components/inicio/inicio-administrador';
import InicioSupervisor from '../components/inicio/inicio-supervisor';
import InicioInspector from '../components/inicio/inicio-inspector';
import InicioAsistente from '../components/inicio/inicio-asistente';

function Inicio() {
  const [user, setUser] = useContext(UserContext);
  return (
    <>
      <DashboardLayout>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 2
          }}
        >
          {user.role === "Administrador" && <InicioAdministrador />}
          {user.role === "Supervisor" && <InicioSupervisor />}
          {user.role === "Inspector" && <InicioInspector />}
          {user.role === "Asistente" && <InicioAsistente />}
        </Box>
      </DashboardLayout>
    </>
  )
}

export default Inicio;
