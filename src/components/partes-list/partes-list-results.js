import { useState, useEffect } from 'react';
import { Box, Card, Table, TableBody, Paper, Button } from '@mui/material';
import { parteGetRestricted } from '../../services/partes';
import EnhancedTableToolbar from './table/enhanced-table-toolbar';
import EnhancedTableHead from './table/enhanced-table-head';
import EnhancedTableSearch from './table/enhanced-table-search';
import EnhancedTableRow from './table/enhanced-table-row';
import TablePagination from '@mui/material/TablePagination';
//Configuración de campos
import { headCells } from './table/list';
import { TableCell } from '@mui/material';
import { TableRow } from '@mui/material';

export const PartesListResults = () => {
  const [reload, setReload] = useState(false)
  const [data, setData] = useState([])
  const partes = data?.docs || []

console.log(partes)
  const handleReload = () => {
    setReload(!reload)
  }

  //Selected 
  const [selected, setSelected] = useState([]);
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = partes.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  //Search filers
  let cond = {}
  headCells.map((headCell) => {
    cond[headCell.id.replace("[", ".").replace("]", "")] = ""
  })
  const [search, setSearch] = useState(cond)
  const handleSearchChange = (newValue) => {
    setSearch(newValue)
  }

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
  const rowsCount = data.totalDocs || 50
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
        setData(res.data)
        console.log(res.data.docs)
        // setRowsCount(res.data.totalDocs)
      } catch (error) {
        console.log(error)
      }
    }
    getList()
  }, [reload, page, rowsPerPage, order, orderBy, search])

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =  Math.max(0, (1 + page) * rowsPerPage - partes.length);


  return (
    <Card>
      <EnhancedTableToolbar numSelected={selected.length} selected={selected} handleReload={handleReload} />
      <Paper sx={{ overflowX: "auto", width: "100%" }}>
        <Box sx={{ minWidth: 1050, maxWidth: 1600 }}>
          
          <Table stickyHeader size="small" >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              numSelected={selected.length}
              rowCount={partes.length}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              <EnhancedTableSearch search={search} onChange={handleSearchChange} />
              {partes?.map((parte, index) => (
                <EnhancedTableRow
                  key={parte._id}
                  parte={parte}
                  handleReload={handleReload}
                  handleClick={handleClick}
                  index={index}
                  selected={selected}
                  emptyRows={emptyRows}
                />
              ))}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
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