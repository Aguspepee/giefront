import { useState, useEffect } from 'react';
import { Box, Card, Table, TableBody, Paper, Button } from '@mui/material';
import { parteGetRestricted } from '../../../services/partes';
import EnhancedTableToolbar from './table/enhanced-table-toolbar';
import EnhancedTableHead from './table/enhanced-table-head';
import EnhancedTableSearch from './table/enhanced-table-search';
import EnhancedTableRow from './table/enhanced-table-row';
import TablePagination from '@mui/material/TablePagination';
import UserContext from '../../../context/userContext';

import { useContext } from 'react';

//Alerts y Notifications
import Notification from '../../../styled-components/alerts/notification';
import ConfirmDialog from '../../../styled-components/alerts/confirm-dialog';

export const InicioTable = () => {
  const [user, setUser] = useContext(UserContext);
  const [edit, setEdit] = useState({ open: false, parte: [] })
  const [reload, setReload] = useState(false)
  const [data, setData] = useState([])
  const partes = data?.docs || []
  const [notify, setNotify] = useState({ isOpen: false, message: "", type: "success" })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" })
  const [remito, setRemito] = useState([])

  const handleEdit = (value) => {
    setEdit(value)
  }

  const handleConfirmDialogChange = (value) => {
    console.log("confirm", value)
    setConfirmDialog({
      ...confirmDialog,
      ...value
    })
  }

  const handleNotifyChange = (value) => {
    setNotify(value)
  }

  const handleReload = () => {
    setReload(!reload)
  }

  //Selected 
  const [selected, setSelected] = useState([]);
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = partes.map((n) => n._id);
      const newItemsRemito = partes
      setSelected(newSelecteds);
      setRemito(newItemsRemito);
      return;
    }
    setSelected([]);
    setRemito([]);
  };

  const handleClick = (event, name, item) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    let newItem = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
      newItem = newItem.concat(remito, item)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      newItem = newItem.concat(remito.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      newItem = newItem.concat(remito.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
      newItem = newItem.concat(
        remito.slice(0, selectedIndex),
        remito.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected);
    setRemito(newItem)
  };

  //Search filers
  const [search, setSearch] = useState({})
  const handleSearchChange = (newValue) => {
    setSearch(newValue)
  }

  //Sort states and functions
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('Id');
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
      } catch (error) {
        console.log(error)
      }
    }
    getList()
  }, [reload, page, rowsPerPage, order, orderBy, search])

  return (
    <>
      <Card sx={{}}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          selected={selected}
          remito={remito}
          handleReload={handleReload}
          handleConfirmDialogChange={handleConfirmDialogChange}
          handleNotifyChange={handleNotifyChange}
        />
        <Paper sx={{ overflowX: "auto", width: "100%", height: '65vh' }}>
          {/*     <PerfectScrollbar> */}
          <Box sx={{ minWidth: 1050, maxWidth: 1600 }}>
            <Table stickyHeader size="small" >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                numSelected={selected.length}
                rowCount={partes.length}
                onSelectAllClick={handleSelectAllClick}
                columns={user.parteColumns}
              />
              <TableBody>
                <EnhancedTableSearch
                  columns={user.parteColumns}
                  search={search}
                  onChange={handleSearchChange} />
                {partes?.map((parte, index) => (
                  <EnhancedTableRow
                    key={parte._id}
                    parte={parte}
                    handleReload={handleReload}
                    handleClick={handleClick}
                    index={index}
                    selected={selected}
                    columns={user.parteColumns}
                    handleConfirmDialogChange={handleConfirmDialogChange}
                    handleNotifyChange={handleNotifyChange}
                    handleEdit={handleEdit}
                  />
                ))}
              </TableBody>
            </Table>
          </Box>
          {/*  </PerfectScrollbar> */}
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
      <Notification
        notify={notify}
        setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog} />
      
    </>
  );
};