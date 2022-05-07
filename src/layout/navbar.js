import UserContext from '../context/userContext';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import AccountMenu from './account-menu';
import { Typography } from '@mui/material';
import { userLogout } from '../services/users';
import Stack from '@mui/material/Stack';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

export const DashboardNavbar = (props) => {
  const [user, setUser] = useContext(UserContext);
  const { onSidebarOpen, ...other } = props;

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280
          },
          width: {
            lg: 'calc(100% - 280px)'
          }
        }}
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none'
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Stack spacing={0}>

            <Typography variant="subtitle1" gutterBottom component="div" display="block" color="gray" style={{ padding: "0em 0em 0em 0em", margin:"0em 0em 0em 0em" }}>
              {user?.nombre.toUpperCase()}
            </Typography>
            <Typography variant="caption" gutterBottom component="div" display="block" color="gray" style={{ padding: "0em 0em 0em 0em", margin:"0em 0em 0em 0em" }}>
            {user?.role}
            </Typography>


          </Stack>


          {/*            <Tooltip title="Search">
            <IconButton sx={{ ml: 1 }}>
              <SearchIcon fontSize="small" />
            </IconButton>
          </Tooltip>  */}
          <Box sx={{ flexGrow: 1 }} />
          {/* <Tooltip title="Contacts">
            <IconButton onClick={handleClick} sx={{ ml: 1 }}>
              <UsersIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 1 }}>
              <Badge
                badgeContent={4}
                color="primary"
                variant="dot"
              >
                <BellIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>
          <Avatar
            sx={{
              height: 40,
              width: 40,
              ml: 1
            }}
            src="/static/images/avatars/avatar_1.png"
          >
            <UserCircleIcon fontSize="small" />
          </Avatar> */}
          <AccountMenu />
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};
