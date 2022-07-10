import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import { contractEmpty } from '../../services/contracts';
import { useNavigate } from "react-router-dom";

//Alerts y Notifications
import Notification from '../../styled-components/alerts/notification';
import ConfirmDialog from '../../styled-components/alerts/confirm-dialog';

//Icons
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

function ContractsListToolbar({ handleReload, handleSearchChange, ...props }) {
  const [notify, setNotify] = useState({ isOpen: false, message: "", type: "success" })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" })
  const navigate = useNavigate();

  async function handleCreate() {
    try{
      const res = await contractEmpty()
      navigate(`/contracts-edit/${res.data._id}`)
     // handleReload()
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false
      })
      setNotify({
        isOpen: true, 
        message: 'El contrato se creó correctamente',
        type: 'success'
      })
    }catch(e){
      setNotify({
        isOpen: true,
        message: 'Hubo un error al crear el contrato',
        type: 'error'
      })
    }
    
  }

  return (
    <>
      <Box {...props}>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            m: -1
          }}
        >
          <Typography
            sx={{ m: 1 }}
            variant="h4"
          >
            Contratos
          </Typography>
          <Box sx={{ m: 1 }}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: "¿Deseas crear un nuevo contrato?",
                  subTitle: "Luego de crearlo, podrás seleccionarlo y editarlo.",
                  onConfirm: () => { handleCreate() },
                  icon: <HistoryEduIcon fontSize='inherit' color="success" />
                })
              }}
            >
              Nuevo Contrato
            </Button>
          </Box>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ maxWidth: 500 }}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon
                          color="action"
                          fontSize="small"
                        >
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Buscar contracte"
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Notification
        notify={notify}
        setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog} />
    </>
  );

}

export default ContractsListToolbar