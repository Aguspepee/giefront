import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar, Box, Card, Checkbox, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography, IconButton,
  Tooltip
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import { contractGetList, contractDelete } from '../../services/contracts';
import { Link } from 'react-router-dom';

//Alerts y Notifications
import Notification from '../../styled-components/alerts/notification';
import ConfirmDialog from '../../styled-components/alerts/confirm-dialog';

//icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import HighlightOff from "@mui/icons-material/HighlightOff";

export const ContractsListResults = (props) => {
  const setReload = props.setReload
  const reload = props.reload
  const [contracts, setContracts] = useState([])
  const [notify, setNotify] = useState({ isOpen: false, message: "", type: "success" })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" })
  useEffect(() => {
    async function getList() {
      try {
        const contracts = await contractGetList()
        console.log(contracts)
        setContracts(contracts.data)
        setReload(false)
      } catch (error) {
        console.log(error)
      }

    }
    getList()
  }, [reload])

  async function handleDelete(id) {
    contractDelete(id)
    setReload(true)
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

  return (
    <>
      <Card>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Contrato
                  </TableCell>
                  <TableCell>
                    Cliente
                  </TableCell>
                  <TableCell>
                    Tipo
                  </TableCell>
                  <TableCell>
                    Fecha de Inicio
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
                          src={contract?.avatarUrl}
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
                      {contract.cliente}
                    </TableCell>
                    <TableCell>
                      {contract.area}
                    </TableCell>
                    <TableCell>
                      {format(new Date(contract.fecha_inicio), 'dd/MM/yyyy')}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Editar contrato">
                        <IconButton sx={{ ml: 1 }} component={Link} to={`/contracts-edit/${contract._id}`}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Nueva versión">
                        <IconButton sx={{ ml: 1 }} >
                          <DynamicFeedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar contrato">
                        <IconButton sx={{ ml: 1 }} onClick={() => {
                            setConfirmDialog({
                              isOpen: true,
                              title: "¿Deseas eliminar este contrato?",
                              subTitle: "La acción es irreversible y puede traer problemas en la aplicación",
                              onConfirm: () => { handleDelete(contract._id) },
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
        </PerfectScrollbar>
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
