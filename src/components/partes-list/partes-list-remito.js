import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Autocomplete, Chip, Stack, Tooltip } from "@mui/material";
import { useEffect, useState } from 'react';
import { Box, Button, Table, TableBody, TableHead } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import { TableCell } from '@mui/material';
import { TableRow } from '@mui/material';
import { remitoCreate, remitoNumero } from '../../services/remitos'
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';

//Icons
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';


export default function RemitoCreate({ handleReload, handleEdit, remito, selected, handleConfirmDialogChange, handleNotifyChange, selectedToEmpty, ...props }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [numeroRemito, setNumeroRemito] = useState(0);
  const [certificante, setCertificante] = useState("");
  const certificantes = remito[0]?.contrato[0]?.certificantes?.map((certificante) => certificante.nombre)

  useEffect(() => {
    let estado = !remito.some((item) => (item.remito_realizado === true || item.trabajo_terminado === false || item.informe_realizado === false || item.informe_revisado === false))
    setShow(estado)
  }, [remito])

  useEffect(() => {
    async function getList() {
      try {
        const res = await remitoNumero()
        setNumeroRemito(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getList()
  }, [])

  const handleRemitoCreate = () => {
    handleConfirmDialogChange({
      isOpen: false,
      title: "",
      subTitle: ""
    })
    handleNotifyChange({
      isOpen: true,
      message: `El remito N° ${numeroRemito.remito_numero + 1} se agregó correctamente.`,
      type: 'success'
    })
    remitoCreate({ selected: selected, certificante: certificante })
    selectedToEmpty()
    handleReload()
    handleClose()
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {show &&
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
          <Tooltip title="Nuevo Remito">
            <IconButton
              size="small"
              color="primary"
              aria-label="add"
              onClick={handleClickOpen}>
              <ListAltIcon />
            </IconButton>
          </Tooltip>
        </Box>
      }
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" style={{ backgroundColor: "#F3F4F6" }}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Box>Nuevo Remito</Box>
            <Chip label={`N° ${numeroRemito.remito_numero + 1}`} color="secondary" variant="outlined" />
          </Stack>
          <IconButton
            aria-label="close"
            onClick={() => handleClose()}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ padding: "0em 0em 0em 0em" }}>
          <Box style={{ padding: "1em 1em 1em 1em" }}>
            <Typography variant="subtitle2" gutterBottom component="div">
              ¿Desea crear un nuevo remito?
            </Typography>
            <Typography variant="body2" gutterBottom>
              Seleccione el certificante:
            </Typography>
            <Autocomplete
              getOptionLabel={(certificantes) => `${certificantes}`}
              options={certificantes}
              disablePortal
              isOptionEqualToValue={(option, value) => {
                return (option === value)
              }}
              noOptionsText={"Sin opciones"}
              renderInput={(params) => <TextField
                {...params}
                label="Certificante"
                placeholder="Certificante"
              //  error={Boolean(errors[name])}
              //  helperText={errors[name] && errors[name]?.message}
              />}
              value={certificante ? certificante : null}
              onChange={(event, item) => setCertificante(item)}
              clearOnBlur={true}
            />
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Número de Reporte</TableCell>
                <TableCell>TAG</TableCell>
                <TableCell>Descripción del Servicio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{
              remito.map((item) => {
                return (
                  <TableRow key={item._id} >
                    <TableCell>{item.numero_reporte}</TableCell>
                    <TableCell>{item.tag}</TableCell>
                    <TableCell>{item.items[0]?.descripcion_servicio}</TableCell>
                  </TableRow>
                )
              }
              )}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions >
          <Button type='submit' form="myform" color="primary" variant="contained" fullWidth
            onClick={() => {
              handleConfirmDialogChange({
                isOpen: true,
                title: "¿Deseas crear un nuevo remito?",
                onConfirm: () => { handleRemitoCreate() },
                icon: <PlaylistAddIcon fontSize='inherit' color="success" />
              })
            }}
            //Validación facil de certificante
            disabled={certificante === "" ? true : false}
          >
            Crear Remito
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}