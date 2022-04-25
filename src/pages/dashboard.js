import { useEffect, useState, useContext } from 'react';
import { Box, Container, Grid } from '@mui/material';
import { DashboardLayout } from '../layout/layout';
import UserContext from '../context/userContext';

//Dashboards por usuario
import DashboardAdministrador from '../components/dashboard/dashboard-administrador';
import DashboardSupervisor from '../components/dashboard/dashboard-supervisor';
import DashboardInspector from '../components/dashboard/dashboard-inspector';
import DashboardAsistente from '../components/dashboard/dashboard-asistente';

function Dashboard() {
  const [user, setUser] = useContext(UserContext);
  console.log("dashboard", user.role)
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
          {user.role === "Administrador" && <DashboardAdministrador />}
          {user.role === "Supervisor" && <DashboardSupervisor />}
          {user.role === "Inspector" && <DashboardInspector />}
          {user.role === "Asistente" && <DashboardAsistente />}
        </Box>
      </DashboardLayout>
    </>
  )
}

export default Dashboard;
