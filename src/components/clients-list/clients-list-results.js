import { useState, useEffect } from 'react';
import {
  Avatar, Box, Card, Table, TableBody, TableCell, TableHead, TableRow, Typography, IconButton,
  Tooltip, 
  Paper
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import {  clientDelete, clientEdit } from '../../services/clients';
import { Link } from 'react-router-dom';
import StyledCheckboxActive from '../../styled-components/styled-checkbox-active'

//Alerts y Notifications
import Notification from '../../styled-components/alerts/notification';
import ConfirmDialog from '../../styled-components/alerts/confirm-dialog';

//icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOff from "@mui/icons-material/HighlightOff";


export const ClientsListResults = ({handleReload, clients,...props}) => {
  const [notify, setNotify] = useState({ isOpen: false, message: "", type: "success" })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" })

  async function handleDelete(id) {
    clientDelete(id)
    handleReload()
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
    setNotify({
      isOpen: true,
      message: 'El cliente se eliminó correctamente',
      type: 'error'
    })
  }

  return (
    <>
      <Card>
        <Paper sx={{ overflowX: "auto", width: "100%", }}>
            <Box >
              <Table sx={{ minWidth: 700 }}>
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
                            src={client.image ? `${process.env.REACT_APP_BACKEND_URL}${client.image}` : ""}
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
                        <StyledCheckboxActive value={client.active} field="active" id={client._id} edit={clientEdit} />
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Editar contrato">
                          <IconButton sx={{ ml: 1 }} component={Link} to={`/clients-edit/${client._id}`}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar contrato">
                          <IconButton sx={{ ml: 1 }} onClick={() => {
                            setConfirmDialog({
                              isOpen: true,
                              title: "¿Deseas eliminar este cliente?",
                              subTitle: "La acción es irreversible y puede traer problemas en la aplicación",
                              onConfirm: () => { handleDelete(client._id) },
                              icon:<HighlightOff fontSize='inherit' color="error"/>
                            })
                          }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
        </Paper>
      </Card>
      <Notification
        notify={notify}
        setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog} />
    </>
  );
};