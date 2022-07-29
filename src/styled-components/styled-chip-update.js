import Chip from '@mui/material/Chip';
import { Tooltip, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';

//Alerts y Notifications
import Notification from './alerts/notification';
import NotificationDialog from './alerts/notification-dialog';
import ConfirmDialog from './alerts/confirm-dialog';

//icons 
import EventIcon from '@mui/icons-material/Event';
import BlockIcon from '@mui/icons-material/Block';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';


export default function StyledChipUpdate({ handleReload, edit, value, field, id, label, onChangeFunction, rol, data, ...props }) {
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "success" })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" })
    const [notificationDialog, setNotificationDialog] = useState({ isOpen: false, title: "", subTitle: "" })
    const [disable, setDisable] = useState(true)

    //Roles permitidos
    const allowedRoles = [
        { rol: "Administrador", fields_allowed: ["trabajo_terminado", "informe_realizado", "informe_revisado", "remito_realizado", "certificado_realizado", "remito_revisado", "remito_entregado", "remito_firmado", "certificado_realizado", "certificado_finalizado"] },
        { rol: "Supervisor", fields_allowed: ["trabajo_terminado", "informe_realizado", "informe_revisado", "remito_realizado", "certificado_realizado"] },
        { rol: "Inspector", fields_allowed: ["trabajo_terminado", "informe_realizado"] },
        { rol: "Asistente", fields_allowed: ["trabajo_terminado", "informe_realizado", "informe_revisado", "remito_realizado", "certificado_realizado"] },
    ]
    //Correlatividades
    const dependencies = [
        { pre: "trabajo_terminado", post: "ninguno" },
        { pre: "informe_realizado", post: "trabajo_terminado" },
        { pre: "informe_revisado", post: "informe_realizado" },
        { pre: "remito_realizado", post: "informe_revisado" },
        { pre: "remito_revisado", post: "remito_realizado" },
        { pre: "remito_entregado", post: "remito_revisado" },
        { pre: "remito_firmado", post: "remito_entregado" },
        { pre: "certificado_realizado", post: "remito_firmado" },
        { pre: "certificado_finalizado", post: "certificado_realizado" },
    ]

    //Se setea que usuarios están permitidos para cada estado
    useEffect(() => {
        //Dependiento el rol del usuario, se habilita o no el 
        const field_allowed = allowedRoles.filter((item) => item.rol === rol)[0]?.fields_allowed
        let pre_state = data[dependencies.filter((item) => item.pre === field)[0]?.post]
        let post_state = data[dependencies.filter((item) => item.post === field)[0]?.pre]
        pre_state = pre_state === undefined ? true : pre_state
        post_state = post_state === undefined ? true : post_state
        if (field_allowed?.includes(field)) {
            !pre_state || post_state ? setDisable(true) : setDisable(false)
            field === 'remito_realizado' && setDisable(true) 
            field === 'certificado_realizado' && setDisable(true) 
            field === 'certificado_finalizado' && setDisable(false) 
        } else {
            setDisable(true)
        }
    }, [handleReload])

    //console.log(disable)
    function handleRequestToChange() {
        if (disable) {
            console.log("disable")
            setNotificationDialog({
                isOpen: true,
                title: `No es posible cambiar el estado`,
                onConfirm: () => {
                    setNotificationDialog({
                        ...notificationDialog,
                        isOpen: false
                    })
                },
                icon: <BlockIcon fontSize='inherit' color="error" />
            })
        } else {
            setConfirmDialog({
                isOpen: true,
                title: `¿Desea cambiar el estado de "${label}" a ${value ? "NO" : "SI"}?`,
                subTitle: value ? `Al confirmar, se eliminará la fecha registrada y no podrá volver atrás` :
                    `Al confirmar, se guardará la fecha del dia de hoy`,
                onConfirm: () => { handleEdit() },
                icon: <EventIcon fontSize='inherit' color={value ? "error" : "success"} />
            })
        }
    }


    async function handleEdit() {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        try {
            const res = await edit({ data: { [field]: !value }, id })
            setNotify({
                isOpen: true,
                message: `El estado se modificó correctamente a ${value ? "NO" : "SI"}`,
                type: value ? "error" : "success"
            })
            handleReload()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <Tooltip title={!disable ? (value ? "Cambiar a NO" : "Cambiar a SI") : "NO permitido"}>
                <Chip size="small" sx={{ width: "60px" }} label={value ? "SI" : "NO"} color={value ? "success" : "error"}
                    onClick={() => {
                        handleRequestToChange()
                    }}
                    variant={disable ? 'outlined' : "filled"}
                    clickable={!disable} />
            </Tooltip>
            <Notification
                notify={notify}
                setNotify={setNotify} />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog} />
                <NotificationDialog 
                confirmDialog={notificationDialog}
                setConfirmDialog={setNotificationDialog} />
        </>
    );
}