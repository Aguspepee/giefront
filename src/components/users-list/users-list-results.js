import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar, Box, Card, Table, TableBody, TableCell, TableHead, TableRow, Typography, IconButton,
  Tooltip
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import { userGetAll, userDelete, userEdit } from '../../services/users';
import { Link } from 'react-router-dom';
import StyledCheckboxActive from '../../styled-components/styled-checkbox-active'

//icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const UsersListResults = (props) => {
  const setReload = props.setReload
  const reload = props.reload
  const [users, setUsers] = useState([])
  useEffect(() => {
    async function getList() {
      try {
        const users = await userGetAll()
        setUsers(users.data)
        setReload(false)
      } catch (error) {
        console.log(error)
      }

    }
    getList()
  }, [reload])

  function handleDelete(id) {
    userDelete(id)
    setReload(true)
  }
  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Nombre
                </TableCell>
                <TableCell>
                  Rol
                </TableCell>
                <TableCell>
                  Área
                </TableCell>
                <TableCell>
                  Activo
                </TableCell>
                <TableCell>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user) => (
                <TableRow
                  hover
                  key={user._id}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={user?.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(user?.nombre)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {user.nombre} {user.apellido}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {user.role}
                  </TableCell>
                  <TableCell>
                    {user.area}
                  </TableCell>
                  <TableCell>
                    <StyledCheckboxActive value={user.active} id={user._id} edit={userEdit} />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Editar contrato">
                      <IconButton sx={{ ml: 1 }} component={Link} to={`/users-edit/${user._id}`}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar contrato">
                      <IconButton sx={{ ml: 1 }} onClick={() => { handleDelete(user._id) }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};