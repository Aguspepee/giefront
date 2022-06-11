import Chip from '@mui/material/Chip';
import { Tooltip } from '@mui/material';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

//Alerts y Notifications
import Notification from './alerts/notification';
import ConfirmDialog from './alerts/confirm-dialog';

//icons
import EventIcon from '@mui/icons-material/Event';

export default function StyledChipUpdate({ handleReload, edit, value, field, id, label, onChangeFunction, ...props }) {
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "success" })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" })
    const [loading, setLoading] = useState(false)
    async function handleEdit() {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        setLoading(true)
        try {
            const res = await edit({ [field]: !value }, id)
            setNotify({
                isOpen: true,
                message: `El estado se modificó correctamente a ${value ? "NO" : "SI"}`,
                type: value ? "error" : "success"
            })
            handleReload()
            setLoading(false)
            console.log(`Se modificó el estado a ${value ? "NO" : "SI"}`, res.data)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <Tooltip title={value ? "Cambiar a NO" : "Cambiar a SI"}>
                <Chip size="small" style={{ width: "60px" }} label={loading ? "" : (value ? "SI" : "NO")} color={value ? "success" : "error"}
                    icon={
                        <>
                            {loading &&
                                <Box sx={{ display: 'flex' }}>
                                    <CircularProgress size={15} />
                                </Box>
                            }</>}
                    onClick={() => {
                        setConfirmDialog({
                            isOpen: true,
                            title: `¿Desea cambiar el estado de "${label}" a ${value ? "NO" : "SI"}?`,
                            subTitle: value ? `Al confirmar, se eliminará la fecha registrada y no podrá volver atrás` :
                                `Al confirmar, se guardará la fecha del dia de hoy`,
                            onConfirm: () => { handleEdit() },
                            icon: <EventIcon fontSize='inherit' color={value ? "error" : "success"} />
                        })
                    }} />
            </Tooltip>
            <Notification
                notify={notify}
                setNotify={setNotify} />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog} />
        </>
    );
}