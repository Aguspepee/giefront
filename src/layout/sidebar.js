import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Divider, Drawer, useMediaQuery } from '@mui/material';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { Users as UsersIcon } from '../icons/users';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import ViewListIcon from '@mui/icons-material/ViewList';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Logo } from '../components/logo';
import { NavItem } from './nav-item';
import TableRowsIcon from '@mui/icons-material/TableRows';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PaidIcon from '@mui/icons-material/Paid';
import UserContext from '../context/userContext';
import { useContext } from 'react';


import { Typography } from '@mui/material';
import { default as LinkMaterial } from '@mui/material/Link';

const items = [
  {
    href: '/',
    icon: (<ChartBarIcon fontSize="small" />),
    title: 'Dashboard',
    roles: ["Administrador", "Supervisor", "Inspector", "Asistente"]
  },
  {
    href: '/partes-add',
    icon: (<NoteAddIcon fontSize="small" />),
    title: 'Cargar Parte',
    roles: ["Administrador", "Supervisor", "Inspector", "Asistente"]
  },
  {
    href: '/partes-list',
    icon: (<ViewListIcon fontSize="small" />),
    title: 'Parte Diario',
    roles: ["Administrador", "Supervisor", "Inspector", "Asistente"]
  },


  {
    href: '/clients-list',
    icon: (<SupervisedUserCircleIcon fontSize="small" />),
    title: 'Clientes',
    roles: ["Administrador", "Supervisor"]
  },
  {
    href: '/users-list',
    icon: (<UsersIcon fontSize="small" />),
    title: 'Usuarios',
    roles: ["Administrador", "Supervisor"]
  },
  {
    href: '/contracts-list',
    icon: (<HistoryEduIcon fontSize="small" />),
    title: 'Contratos',
    roles: ["Administrador", "Supervisor"]
  },
  {
    href: '/remitos-list',
    icon: (<ReceiptIcon fontSize="small" />),
    title: 'Remitos',
    roles: ["Administrador", "Supervisor"]
  },
  {
    href: '/certif-list',
    icon: (<PaidIcon fontSize="small" />),
    title: 'Certificaciones',
    roles: ["Administrador", "Supervisor"]
  },
  {
    href: '/remitos-table',
    icon: (<TableRowsIcon fontSize="small" />),
    title: 'Tabla Remitos',
    roles: ["Administrador"]
  },
  {
    href: '/partes-table',
    icon: (<TableRowsIcon fontSize="small" />),
    title: 'Tabla Parte Diario',
    roles: ["Administrador"]
  },
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const [user, setUser] = useContext(UserContext);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });
  //console.log(items[8].roles)
  let items_filtrados = items.filter((items)=>{
    return(items.roles?.includes(user.role))
  })
  useEffect(
    () => {
      if (open) {
        onClose?.();
      }
    },
    []
  );

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box >
            <div style={{ padding: "1.5em 1.5em 0em 1.5em" }}>
              <Logo
                sx={{
                  width: 30
                }}
              />
            </div>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items_filtrados.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}

            />
          ))}
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />

        <div style={{ padding: "2em 4em 2em 4em" }} >

          <Typography variant="caption" display="block" gutterBottom>
            Made by
          </Typography>
          <LinkMaterial target="_blank" href="http://test.growup-digital.com" rel="noreferrer">
            <Logo
              sx={{
                width: 30
              }}

            />
          </LinkMaterial>
        </div>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: '#19334F',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
