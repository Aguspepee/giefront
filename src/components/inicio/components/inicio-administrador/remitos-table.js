import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { remitoGetAll } from '../../../../services/remitos';
import TablePagination from '@mui/material/TablePagination';
import DownloadIcon from '@mui/icons-material/Download';
import { remitoPDF } from '../../../../utils/exports/remito-pdf';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';


export const RemitosTable = (props) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const remitos = data?.docs || []
  const [reload, setReload] = useState(false)

  const handleReload = () => {
    setReload(!reload)
  }

  //Pagination states and functions
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const rowsCount = data.totalDocs || 5
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
        const res = await remitoGetAll(page, rowsPerPage, 1, "_id", {})
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
  const emptyRows = remitos.length < rowsPerPage ? rowsPerPage - remitos.length : 0;

  return (
    < Card style={{ height: "540px" }} {...props}>
      <CardHeader
        subtitle={`${remitos.length} in total`}
        title="Remitos por Certificar"
      />
      <Divider />
      <List>
        {!loading && remitos.map((remito, i) => (

          <ListItem
            divider={i < remitos.length - 1}
            key={remito._id}
          >
            <ListItemAvatar>
              <img
                alt={remito.name}
                src={remito.cliente[0].image ? `${process.env.REACT_APP_BACKEND_URL}${remito.cliente[0].image}` : ""}
                style={{
                  height: 48,
                  width: 48
                }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={`${remito._id}`}
              secondary={remito.contrato[0].nombre}
            />
            <Tooltip title="Descargar Remito">
              <IconButton sx={{ ml: 1 }} onClick={() => {
                remitoPDF(remito)
              }}>
                <DownloadIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </ListItem>
        ))
        }
        {/* Previene Que cambie de tamaño cuando hay menos columnas */}
        {(!loading && emptyRows > 0) &&
          <ListItem style={{ height: `${75 * emptyRows}px` }}>
            {emptyRows === rowsPerPage &&
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                width: "100%"
              }}>
                <Stack direction="column">
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: "100%",
                    paddingBottom:"1.5em"
                  }}>
                    <AssignmentTurnedInIcon sx={{ fontSize: 100, }}  style={{color:"#C1C1C1"}} />
                  </Box>
                  <Typography variant="h5" style={{color:"#C1C1C1"}} align='center'>
                    No hay remitos para certificar
                  </Typography>
                </Stack>
              </Box>

            }
          </ListItem>
        }
        {loading &&
          [...Array(rowsPerPage)].map((x, i) =>
            <ListItem key={i} style={{ height: `${75}px` }}>
              <ListItemAvatar>
                <Skeleton variant="circular" animation="wave" width={48} height={48} />
              </ListItemAvatar>
              <ListItemText
                primary={<Skeleton variant="text" style={{ width: "50%" }} />}
                secondary={<Skeleton animation="wave" variant="text" />}
              />
            </ListItem>
          )
        }
      </List>
      <Divider />
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={rowsCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

    </Card >
  )
}