import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Avatar, Box, Card, Checkbox, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography,  IconButton,
  Tooltip } from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import { contractGetList, contractDelete } from '../../services/contracts';
import { Link } from 'react-router-dom';

//icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';

export const ContractsListResults = (props) => {
  const setReload = props.setReload
  const reload = props.reload
  const [contracts, setContracts] = useState([])
  useEffect(() => {
    async function getList() {
      try {
        const contracts = await contractGetList()
        setContracts(contracts.data)
        setReload(false)
      } catch (error) {
        console.log(error)
      }

    }
    getList()
  }, [reload])

  function handleDelete (id){
    contractDelete(id)
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
                      <IconButton sx={{ ml: 1 }} onClick={()=>{handleDelete(contract._id)}}>
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
