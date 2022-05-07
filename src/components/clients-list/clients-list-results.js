import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar, Box, Card, Checkbox, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography, IconButton,
  Tooltip
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import { clientGetAll, clientDelete, clientEdit } from '../../services/clients';
import { Link } from 'react-router-dom';
import StyledCheckboxActive from '../../styled-components/styled-checkbox-active'

//icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const ClientsListResults = (props) => {
  const setReload = props.setReload
  const reload = props.reload
  const [clients, setClients] = useState([])
  useEffect(() => {
    async function getList() {
      try {
        const clients = await clientGetAll()
        setClients(clients.data)
        console.log(clients.data)
        setReload(false)
      } catch (error) {
        console.log(error)
      }

    }
    getList()
  }, [reload])


  function handleDelete(id) {
    clientDelete(id)
    setReload(true)
  }
  //let fecha = new Date('2022-04-08T02:55:11.000Z')
  // console.log(fecha)
  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Cliente
                </TableCell>
                <TableCell>
                  Abreviatura
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Activo
                </TableCell>
                <TableCell>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients?.map((client) => (
                <TableRow
                  hover
                  key={client._id}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={client?.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(client?.nombre)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {client.nombre}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {client.abreviatura}
                  </TableCell>
                  <TableCell>
                    {client.email}
                  </TableCell>
                  <TableCell>
                    <StyledCheckboxActive value={client.active} id={client._id} edit={clientEdit}/>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Editar contrato">
                      <IconButton sx={{ ml: 1 }} component={Link} to={`/clients-edit/${client._id}`}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar contrato">
                      <IconButton sx={{ ml: 1 }} onClick={() => { handleDelete(client._id) }}>
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