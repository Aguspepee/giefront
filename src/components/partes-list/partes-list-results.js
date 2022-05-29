import { useState, useEffect } from 'react';
import {
  Box, Card, Table, TableBody, TableCell, TableRow, IconButton,
  Paper,
} from '@mui/material';
import { parteGetRestricted, parteDelete, parteEdit } from '../../services/partes';
import EnhancedTableHead from './table/enhanced-table-head';
import EnhancedTableSearch from './table/enhanced-table-search';
import EnhancedTableRow from './table/enhanced-table-row';
import TablePagination from '@mui/material/TablePagination';

export const PartesListResults = (props) => {
  const [partes, setPartes] = useState([])
  const [reload, setReload] = useState(false)

  //Sort states and functions
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
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
    setPage(1);
  };
  
  useEffect(() => {
    async function getList() {
      try {
        const res = await parteGetRestricted(page,rowsPerPage)
        setPartes(res.data.docs)
        setRowsCount(res.data.totalDocs)
        setReload(!false)
      } catch (error) {
        console.log(error)
      }
    }
    getList()
  }, [reload,page,rowsPerPage])

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
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={rowsCount}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
           // style={{ backgroundColor: "#F3F4F6" , width:"100%"}}
            labelRowsPerPage={"Filas por página"}
          />
        </Box>
      </Paper>
    </Card>

  );
};