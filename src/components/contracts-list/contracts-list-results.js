import { useState } from 'react';
import { format } from 'date-fns';
import {
  Avatar, Box, Card, Table, TableBody, TableCell, TableHead, TableRow, Typography, IconButton,
  Tooltip, Paper, Stack
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import { contractDelete, contractEdit, contractCopy } from '../../services/contracts';
import { Link } from 'react-router-dom';
import StyledCheckboxActive from '../../styled-components/styled-checkbox-active';

//Alerts y Notifications
import Notification from '../../styled-components/alerts/notification';
import ConfirmDialog from '../../styled-components/alerts/confirm-dialog';

//icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import HighlightOff from "@mui/icons-material/HighlightOff";

export const ContractsListResults = ({ handleReload, contracts, ...props }) => {
  const [notify, setNotify] = useState({ isOpen: false, message: "", type: "success" })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" })

  async function handleDelete(id) {
    contractDelete(id)
    handleReload()
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
    setNotify({
      isOpen: true,
      message: 'El contrato se eliminó se eliminó correctamente',
      type: 'error'
    })
  }

  async function handleCopy(id) {
    contractCopy({ id: id })
    handleReload()
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
    setNotify({
      isOpen: true,
      message: 'El contrato se creó correctamente',
      type: 'success'
    })
  }
  console.log(contracts)
  return (
    <>
      <Card>
        <Paper sx={{ overflowX: "auto", width: "100%", }}>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Contrato
                  </TableCell>
                  <TableCell>
                    Versión
                  </TableCell>
                  <TableCell>
                    Cliente
                  </TableCell>
                  <TableCell>
                    Ref. Orden de Compra
                  </TableCell>
                  <TableCell>
                    Tipo
                  </TableCell>
                  <TableCell>
                    Fecha de Inicio
                  </TableCell>
                  <TableCell>
                    Activo
                  </TableCell>
                  <TableCell>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contracts?.map((contract) => (
                  <TableRow
                    hover
                    key={contract._id}
                  >
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Avatar
                          src={contract.cliente[0]?.image ? `${process.env.REACT_APP_BACKEND_URL}${contract.cliente[0].image}` : ""}
                          sx={{ mr: 2 }}
                        >
                          {getInitials(contract?.nombre)}
                        </Avatar>
                        <Typography
                          color="textPrimary"
                          variant="body1"
                        >
                          {contract.nombre}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {contract.version}
                    </TableCell>
                    <TableCell>
                      {contract.cliente_nombre}
                    </TableCell>
                    <TableCell>
                      {contract.ref_oc}
                    </TableCell>
                    <TableCell>
                      {contract.area}
                    </TableCell>
                    <TableCell>
                      {format(new Date(contract.fecha_inicio), 'dd/MM/yyyy')}
                    </TableCell>
                    <TableCell>
                      <StyledCheckboxActive value={contract.activo} field="activo" id={contract._id} edit={contractEdit} />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row">
                        <Tooltip title="Editar contrato">
                          <IconButton sx={{ ml: 1 }} component={Link} to={`/contracts-edit/${contract._id}`}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Copiar Contratos">
                          <IconButton sx={{ ml: 1 }} onClick={() => {
                            setConfirmDialog({
                              isOpen: true,
                              title: "¿Deseas copiar el contrato?",
                              subTitle: "Se creará una nueva versión.",
                              onConfirm: () => { handleCopy(contract._id) },
                              icon: <FileCopyIcon fontSize='inherit' color="success" />
                            })
                          }}>
                            <FileCopyIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar contrato">
                          <IconButton sx={{ ml: 1 }} onClick={() => {
                            setConfirmDialog({
                              isOpen: true,
                              title: "¿Deseas eliminar este contrato?",
                              subTitle: "La acción es irreversible y puede traer problemas en la aplicación",
                              onConfirm: () => { handleDelete(contract._id) },
                              icon: <HighlightOff fontSize='inherit' color="error" />
                            })
                          }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
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
