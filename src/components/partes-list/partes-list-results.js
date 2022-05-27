import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box, Card, Table, TableBody, TableCell, TableHead, TableRow, IconButton,
  Tooltip
} from '@mui/material';
import { parteGetAll, parteDelete, parteEdit } from '../../services/partes';
import { Link } from 'react-router-dom';
import StyledCheckboxActive from '../../styled-components/styled-checkbox-active'
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

//icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const PartesListResults = (props) => {
  const setReload = props.setReload
  const reload = props.reload
  const [partes, setPartes] = useState([])
  const [open, setOpen] = useState(false);
  useEffect(() => {
    async function getList() {
      try {
        const partes = await parteGetAll()
        setPartes(partes.data)
        setReload(false) 
      } catch (error) {
        console.log(error)
      }

    }
    getList()
  }, [reload])

  function handleDelete(id) {
    parteDelete(id)
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
                  Cliente
                </TableCell>
                <TableCell>
                  Numero de Reporte
                </TableCell>
                <TableCell>
                  Descripción del Servicio
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
              {partes?.map((parte) => (
                <>
                  <TableRow
                    hover
                    key={parte._id}
                  >
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                      >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      {parte.numero_reporte}
                    </TableCell>
                    <TableCell>
                      {parte.items[0].descripcion_servicio}
                    </TableCell>
                    <TableCell>
                      {parte.tag}
                    </TableCell>
                    <TableCell>
                      <StyledCheckboxActive value={parte.informe_realizado} fieldFey="informe_realizado" id={parte._id} edit={parteEdit} />
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Editar contrato">
                        <IconButton sx={{ ml: 1 }} component={Link} to={`/partes-edit/${parte._id}`}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar contrato">
                        <IconButton sx={{ ml: 1 }} onClick={() => { handleDelete(parte._id) }}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>

                  </TableRow>
                  <TableRow>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      hola
                    </Collapse>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};