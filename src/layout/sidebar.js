import { useEffect } from 'react';
//import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Divider, Drawer, useMediaQuery } from '@mui/material';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { Cog as CogIcon } from '../icons/cog';
import { Lock as LockIcon } from '../icons/lock';
import { ShoppingBag as ShoppingBagIcon } from '../icons/shopping-bag';
import { User as UserIcon } from '../icons/user';
import { UserAdd as UserAddIcon } from '../icons/user-add';
import { Users as UsersIcon } from '../icons/users';
import { XCircle as XCircleIcon } from '../icons/x-circle';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Logo } from '../components/logo';
import { NavItem } from './nav-item';
import TableRowsIcon from '@mui/icons-material/TableRows';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PaidIcon from '@mui/icons-material/Paid';

import { Typography } from '@mui/material';
import { default as LinkMaterial } from '@mui/material/Link';

const items = [
  {
    href: '/',
    icon: (<ChartBarIcon fontSize="small" />),
    title: 'Dashboard'
  },
  {
    href: '/partes-add',
    icon: (<NoteAddIcon fontSize="small" />),
    title: 'Cargar Parte'
  },
  {
    href: '/clients-list',
    icon: (<SupervisedUserCircleIcon fontSize="small" />),
    title: 'Clientes'
  },
  {
    href: '/users-list',
    icon: (<UsersIcon fontSize="small" />),
    title: 'Usuarios'
  },
  {
    href: '/contracts-list',
    icon: (<HistoryEduIcon fontSize="small" />),
    title: 'Contratos'
  },
  {
    href: '/contracts-edit',
    icon: (<HistoryEduIcon fontSize="small" />),
    title: 'Editar Contrato'
  },
  {
    href: '/users-account',
    icon: (<UserIcon fontSize="small" />),
    title: 'Editar Cuenta'
  },
  {
    href: '/remitos-list',
    icon: (<ReceiptIcon fontSize="small" />),
    title: 'Remitos'
  },
  {
    href: '/certif-list',
    icon: (<PaidIcon fontSize="small" />),
    title: 'Certificaciones'
  },
  {
    href: '/users-login',
    icon: (<LockIcon fontSize="small" />),
    title: 'Login'
  },
  {
    href: '/users-register',
    icon: (<UserAddIcon fontSize="small" />),
    title: 'Registrar'
  },
  {
    href: '/remitos-table',
    icon: (<TableRowsIcon fontSize="small" />),
    title: 'Tabla Remitos'
  },
  {
    href: '/partes-table',
    icon: (<TableRowsIcon fontSize="small" />),
    title: 'Tabla Parte Diario'
  },
  {
    href: '/404',
    icon: (<XCircleIcon fontSize="small" />),
    title: 'Error'
  },
  {
    href: '',
    icon: (<CogIcon fontSize="small" />),
    title: 'Settings'
  },
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

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
          {items.map((item) => (
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
