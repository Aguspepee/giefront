import { useState, useEffect } from 'react';
import { Box, Card, Table, TableBody, Paper } from '@mui/material';
import { remitoGetAll } from '../../services/remitos';
import EnhancedTableToolbar from './table/enhanced-table-toolbar';
import EnhancedTableHead from './table/enhanced-table-head';
import EnhancedTableSearch from './table/enhanced-table-search';
import EnhancedTableRow from './table/enhanced-table-row';
import TablePagination from '@mui/material/TablePagination';
import UserContext from '../../context/userContext';
import { useContext } from 'react';

//Alerts y Notifications
import Notification from '../../styled-components/alerts/notification';
import ConfirmDialog from '../../styled-components/alerts/confirm-dialog';

export const RemitosListResults = () => {
  const [user, setUser] = useContext(UserContext);
  const [edit, setEdit] = useState({ open: false, remito: [] })
  const [reload, setReload] = useState(false)
  const [data, setData] = useState([])
  const remitos = data?.docs || []
  const [notify, setNotify] = useState({ isOpen: false, message: "", type: "success" })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" })
  const [certificado, setCertificado] = useState([])

  const handleEdit = (value) => {
    setEdit(value)
  }

  const handleConfirmDialogChange = (value) => {
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
      const newSelecteds = remitos.map((n) => n._id);
      const newItemsCertificado = remitos
      setSelected(newSelecteds);
      setCertificado(newItemsCertificado);
      return;
    }
    setSelected([]);
    setCertificado([]);
  };

  const handleClick = (event, name, item) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    let newItem = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
      newItem = newItem.concat(certificado, item)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      newItem = newItem.concat(certificado.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      newItem = newItem.concat(certificado.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
      newItem = newItem.concat(
        certificado.slice(0, selectedIndex),
        certificado.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected);
    setCertificado(newItem)
  };

  //Search filers
  const [search, setSearch] = useState({})
  const handleSearchChange = (newValue) => {
    setSearch(newValue)
  }

  //Sort states and functions
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('remito_numero');
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
        const res = await remitoGetAll(page, rowsPerPage, order, orderBy, search)
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
          certificado={certificado}
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
                rowCount={remitos.length}
                onSelectAllClick={handleSelectAllClick}
                columns={user.remitoColumns}
              />
              <TableBody>
                <EnhancedTableSearch
                  columns={user.remitoColumns}
                  search={search}
                  onChange={handleSearchChange} />
                {remitos?.map((remito, index) => (
                  <EnhancedTableRow
                    key={remito._id}
                    remito={remito}
                    handleReload={handleReload}
                    handleClick={handleClick}
                    index={index}
                    selected={selected}
                    columns={user.remitoColumns}
                    handleConfirmDialogChange={handleConfirmDialogChange}
                    handleNotifyChange={handleNotifyChange}
                    handleEdit={handleEdit}
                    rol={user.role} 
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
          labelRowsPerPage={"Filas por p??gina"}
        />
      </Card>
      <Notification
        notify={notify}
        setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog} />
      {
        edit.open &&
        <>
          edit
        </>
      }
    </>
  );
};