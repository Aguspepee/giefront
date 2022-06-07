import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { PartesAddForm } from './add-form/partes-add-form';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Tooltip } from "@mui/material";

export default function PartesListAdd({handleReload}) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box sx={{ '& > :not(style)': { m: 1 }}}>
            <Tooltip title="Nuevo Parte Diario">
              <Fab size="small" color="primary" aria-label="add" onClick={handleClickOpen}>
                <NoteAddIcon />
              </Fab>
            </Tooltip>
          </Box>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" style={{ backgroundColor:"#F3F4F6" }}>
          {"Cargar Parte Diario"}
        </DialogTitle>
        <DialogContent>

            <PartesAddForm handleReload={handleReload}/>
        </DialogContent>
      </Dialog>
    </div>
  );
}