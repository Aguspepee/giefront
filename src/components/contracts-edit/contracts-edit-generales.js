import { React, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Grid, Box } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { contractEdit } from "../../services/contracts";
import InputCheckbox from "./components/contracts-edit-items-checkbox"
import { useParams } from "react-router-dom";
import StyledDatepickerDesktop from "../../styled-components/styled-datepicker-desktop";
import StyledAutocompleteClients from "../../styled-components/styled-autocomplete-clients";
//GET listas
import { clientGetAll } from '../../services/clients'
//Listados
import { area } from "../../utils/list";
//YUP Schema
import { contractCamposSchema } from '../../utils/yup'
//Icons
import EditIcon from '@mui/icons-material/Edit';
//Alerts y Notifications
import Notification from '../../styled-components/alerts/notification';
import ConfirmDialog from '../../styled-components/alerts/confirm-dialog';
import StyledAutocompleteList from "../../styled-components/styled-autocomplete-list";
import StyledTexfield from "../../styled-components/styled-textfield";

function ContractsEditGenerales({ data, ...props }) {
    console.log(data)
    let { id } = useParams();
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "success" })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" })
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(contractCamposSchema),
    });

    useEffect(() => {
        reset({
            nombre: data.nombre,
            descripcion: data.descripcion,
            area: data.area,
            cliente: data.cliente ? data.cliente[0] : null,
            fecha_inicio: data.fecha_inicio,
            fecha_fin: data.fecha_fin,
            ref_oc: data.ref_oc,
            version: data.version,
            activo: data.activo,
        });
    }, [data]);

    async function editContract(contract) {
        console.log(contract)
        try {
            await contractEdit(contract, id)
            setConfirmDialog({
                ...confirmDialog,
                isOpen: false
            })
            setNotify({
                isOpen: true,
                message: `El perfil de se modificó correctamente`,
                type: 'success'
            })
        } catch (e) {
            setConfirmDialog({
                ...confirmDialog,
                isOpen: false
            })
            setNotify({
                isOpen: true,
                message: 'Ha habido un error, intente nuevamente',
                type: 'error'
            })
            console.log(e)
        }
    }
    async function onSubmit(contract) {
        setConfirmDialog({
            isOpen: true,
            title: `¿Desea modificar el contrato?`,
            subTitle: "",
            onConfirm: () => { editContract(contract) },
            icon: <EditIcon fontSize='inherit' color="success" />
        })
    }
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box style={{ padding: "0em 1em 1em 1em" }}>
                    <form id="myform1" onSubmit={handleSubmit(data => onSubmit(data))}>
                        <Grid container spacing={2}>
                            <StyledTexfield show={true} control={control} name={`nombre`} type="text" description="Nombre del Contrato" errors={errors} md={12} xs={12} />
                            <StyledTexfield show={true} control={control} name={`ref_oc`} type="text" description="Ref. Orden de Compra" errors={errors} md={6} xs={12} />
                            <StyledTexfield show={true} control={control} name={`version`} type="number" description="Version" errors={errors} md={6} xs={12} />
                            <StyledAutocompleteList show={true} md={6} xs={12} control={control} name={`area`} list={area} description="Area" errors={errors} />
                            <StyledAutocompleteClients show={true} control={control} name="cliente" get={clientGetAll} description="Cliente" errors={errors} fullWidth margin="normal" md={6} xs={12} />
                            <StyledDatepickerDesktop control={control} name="fecha_inicio" description="Fecha de Inicio" errors={errors} fullWidth margin="normal" md={6} xs={12} />
                            <StyledDatepickerDesktop control={control} name="fecha_fin" description="Fecha de Fin" errors={errors} fullWidth margin="normal" md={6} xs={12} />
                            <StyledTexfield show={true} control={control} name={`descripcion`} type="text" description="Descripción del Contrato" errors={errors} md={12} xs={12} multiline rows={4} />
                        </Grid>
                        <InputCheckbox control={control} name="activo" defaultValue={false} description="Contrato Activo" />
                    </form>
                </Box>
            </LocalizationProvider>
            <Notification
                notify={notify}
                setNotify={setNotify} />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    );
}

export default ContractsEditGenerales