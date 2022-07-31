import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import {
  Box,
  Paper,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Skeleton
} from '@mui/material';
import { useState, useEffect } from 'react';
import TablePagination from '@mui/material/TablePagination';
import { parteGetRestricted } from '../../../../services/partes';


export const PartesTable = (props) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const partes = data?.docs || []
  const [reload, setReload] = useState(false)

  const handleReload = () => {
    setReload(!reload)
  }

  //Pagination states and functions
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const rowsCount = data.totalDocs || 6
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setLoading(true)
    async function getList() {
      try {
        const res = await parteGetRestricted(page, rowsPerPage, 1, "_id", {})
        setData(res.data)
        setLoading(false)
        handleReload()
      } catch (error) {
        console.log(error)
      }
    }
    getList()
  }, [page])

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = partes.length < rowsPerPage ? rowsPerPage - partes.length : 0;

  return (
    <Card style={{ height: "540px" }} {...props}>
      <CardHeader title="Inspecciones por Remitar" />
      <Paper sx={{ overflowX: "auto", width: "100%", boxShadow: "none", borderRadius: "0" }}>
        <Box sx={{ minWidth: 500 }}>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Número de Orden
                </TableCell>
                <TableCell>
                  Cliente
                </TableCell>
                <TableCell>
                  TAG Equipo
                </TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip
                    enterDelay={300}
                    title="Sort"
                  >
                    <TableSortLabel
                      active
                      direction="desc"
                    >
                      Fecha
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading &&
                partes.map((parte) => (
                  <TableRow
                    hover
                    key={parte._id}
                  >
                    <TableCell>
                      {parte.numero_orden}
                    </TableCell>
                    <TableCell>
                      {parte.cliente[0].nombre}
                    </TableCell>
                    <TableCell>
                      {parte.tag}
                    </TableCell>
                    <TableCell>
                      {parte.fecha_inspeccion ? format(new Date(parte.fecha_inspeccion), 'dd/MM/yyyy') : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              {loading &&
                [...Array(rowsPerPage)].map((x, i) =>
                  <TableRow key={i} >
                    <TableCell>
                      <Skeleton variant="text" animation="wave"/>
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" animation="wave"/>
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" animation="wave"/>
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" animation="wave"/>
                    </TableCell>
                  </TableRow>
                )
              }
            </TableBody>
          </Table>



        </Box>
      </Paper>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={rowsCount}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

    </Card>
  )
}