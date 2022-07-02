import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Chip, Stack, Tooltip } from "@mui/material";
import { useEffect, useState } from 'react';
import { Box, Button, Table, TableBody, TableHead } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import { TableCell } from '@mui/material';
import { TableRow } from '@mui/material';
import { certificadoCreate, certificadoNumero } from '../../services/certificados'
import { Typography } from '@mui/material';

//Icons
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';


export default function CertificadoCreate({ handleReload, handleEdit, certificado, selected, handleConfirmDialogChange, handleNotifyChange, ...props }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [numeroCertificado, setNumeroCertificado] = useState(0);

  useEffect(() => {
    let estado = !certificado.some((item) => (item.certificado_realizado === true || item.remito_entregado === false || item.remito_firmado === false || item.remito_revisado === false))
    setShow(estado)
  }, [certificado])

  useEffect(() => {
    async function getList() {
      try {
        const res = await certificadoNumero()
        console.log(res.data)
        setNumeroCertificado(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getList()
  }, [])

  const handleCertificadoCreate = () => {
    handleConfirmDialogChange({
      isOpen: false,
      title: "",
      subTitle: ""
    })
    handleNotifyChange({
      isOpen: true,
      message: `El certificado N° ${numeroCertificado.certificado_numero + 1} se agregó correctamente.`,
      type: 'success'
    })
    certificadoCreate(selected)
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
          <Tooltip title="Nuevo Certificado">
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
          <Stack spacing={2} direction="row" alignItems="center"><Box>Nuevo Certificado</Box> <Chip label={`N° ${numeroCertificado.certificado_numero + 1}`} color="secondary" variant="outlined" /></Stack>
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
        <DialogContent style={{ paddingTop: "1em" }}>
          <Typography variant="subtitle2" gutterBottom component="div">
            ¿Desea crear un nuevo certificado?
          </Typography>
          <Typography variant="body2" gutterBottom>
            El nuevo certificado tendrá el número {numeroCertificado.certificado_numero + 1} y contendrá los siguientes ítems:
          </Typography>
        </DialogContent>
        <DialogContent style={{ padding: "0px 0px 0px 0px" }}>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Número de Remito</TableCell>
                <TableCell>Contrato</TableCell>
                <TableCell>Unidad</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{
              certificado.map((item) => {
                return (
                  <TableRow key={item._id} >
                    <TableCell>{item.remito_numero}</TableCell>
                    <TableCell>{item.contrato[0].nombre}</TableCell>
                    <TableCell>{item.planta}</TableCell>
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
                title: "¿Deseas crear un nuevo certificado?",
                onConfirm: () => { handleCertificadoCreate() },
                icon: <PlaylistAddIcon fontSize='inherit' color="success" />
              })
            }}>
            Crear Certificado
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}