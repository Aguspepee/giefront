import { useState } from 'react';
import {
  Avatar, Box, Card, Table, TableBody, TableCell, TableHead, TableRow, Typography, IconButton,
  Tooltip,
  Paper
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import { userDelete, userEdit } from '../../services/users';
import { Link } from 'react-router-dom';
import StyledCheckboxActive from '../../styled-components/styled-checkbox-active'

//Alerts y Notifications
import Notification from '../../styled-components/alerts/notification';
import ConfirmDialog from '../../styled-components/alerts/confirm-dialog';

//icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOff from "@mui/icons-material/HighlightOff";

export const UsersListResults = ({ handleReload, users, ...props }) => {
  const [notify, setNotify] = useState({ isOpen: false, message: "", type: "success" })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" })

  async function handleDelete(id) {
    userDelete(id)
    handleReload()
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
    setNotify({
      isOpen: true,
      message: 'El usuario se eliminó correctamente',
      type: 'error'
    })
  }

  return (
    <>
      <Card>
        <Paper sx={{ overflowX: "auto", width: "100%", }}>
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
                          src={user.image ? `${process.env.REACT_APP_BACKEND_URL}${user.image}` : ""}
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
                      <StyledCheckboxActive value={user.active} field="active" id={user._id} edit={userEdit} />
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Editar contrato">
                        <IconButton sx={{ ml: 1 }} component={Link} to={`/users-edit/${user._id}`}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar contrato">
                        <IconButton sx={{ ml: 1 }} onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: "¿Deseas eliminar este cliente?",
                            subTitle: "La acción es irreversible y puede traer problemas en la aplicación",
                            onConfirm: () => { handleDelete(user._id) },
                            icon: <HighlightOff fontSize='inherit' color="error" />
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