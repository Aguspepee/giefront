import { useState, useEffect } from 'react';
import { Box, Card, Table, TableBody, Paper } from '@mui/material';
import { parteGetRestricted } from '../../services/partes';
import EnhancedTableHead from './table/enhanced-table-head';
import EnhancedTableSearch from './table/enhanced-table-search';
import EnhancedTableRow from './table/enhanced-table-row';
import TablePagination from '@mui/material/TablePagination';
//Configuración de campos
import { headCells } from './table/list';

export const PartesListResults = () => {
  const [partes, setPartes] = useState([])
  const [reload, setReload] = useState(false)

  //Search filers
  const [search, setSearch] = useState(headCells.map((headCell) => {
    let cond = {}
    cond[headCell.id] = ""
    return (cond)
  }))

  //Sort states and functions
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('fecha_carga');
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  //Pagination states and functions
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rowsCount, setRowsCount] = useState(50)
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    async function getList() {
      try {
        const res = await parteGetRestricted(page, rowsPerPage, order, orderBy, search)
        setPartes(res.data.docs)
        setRowsCount(res.data.totalDocs)
        setReload(!false)
      } catch (error) {
        console.log(error)
      }
    }
    getList()
  }, [reload, page, rowsPerPage, order, orderBy])

  return (

    <Card>
      <Paper sx={{ overflowX: "auto", width: "100%" }}>
        <Box sx={{ minWidth: 1050, maxWidth: 1600 }}>
          <Table stickyHeader size="small" >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              <EnhancedTableSearch />
              {partes?.map((parte) => (
                <EnhancedTableRow key={parte._id} parte={parte} reload={reload} setReload={() => setReload()} />
              ))}
            </TableBody>
          </Table>

        </Box>
      </Paper>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={rowsCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{ backgroundColor: "#F3F4F6" }}
        labelRowsPerPage={"Filas por página"}
      />
    </Card>

  );
};