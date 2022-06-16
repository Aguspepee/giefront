import { React, useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import InputCheckbox from "./components/contracts-edit-items-checkbox";
import { Box } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { contractEdit } from "../../services/contracts";
import { useParams } from "react-router-dom";

//YUP Schema
import { contractCamposSchema } from '../../utils/yup'

//Icons
import EditIcon from '@mui/icons-material/Edit';

//Alerts y Notifications
import Notification from '../../styled-components/alerts/notification';
import ConfirmDialog from '../../styled-components/alerts/confirm-dialog';

function ContractsEditCampos({ data, ...props }) {

    let { id } = useParams();
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "success" })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" })
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(contractCamposSchema),
    });

    useEffect(() => {
        reset({
            campos: {
                numero_reporte: data.campos ? data.campos[0].numero_reporte : false,
                numero_orden: data.campos ? data.campos[0].numero_orden : false,
                diametro: data.campos ? data.campos[0].diametro : false,
                espesor: data.campos ? data.campos[0].espesor : false,
                numero_costuras: data.campos ? data.campos[0].numero_costuras : false,
                cantidad_placas: data.campos ? data.campos[0].cantidad_placas : false,
                tipo_rx: data.campos ? data.campos[0].tipo_rx : false,
                unidad: data.campos ? data.campos[0].unidad : false,
                paga: data.campos ? data.campos[0].paga : false,
            }
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
            <form id="myform5" onSubmit={handleSubmit(data => onSubmit(data))}>
                <Box style={{ padding: "18px 0px 15px 0px" }}>
                    <InputCheckbox control={control} name="campos.numero_reporte" description="Numero de Reporte" />
                    <InputCheckbox control={control} name="campos.numero_orden" description="Numero de Orden" />
                    <InputCheckbox control={control} name="campos.unidad" description="Unidad" />
                    <InputCheckbox control={control} name="campos.diametro" description="Diámetro" />
                    <InputCheckbox control={control} name="campos.espesor" description="Espesor" />
                    <InputCheckbox control={control} name="campos.numero_costuras" description="Número de Costuras" />
                    <InputCheckbox control={control} name="campos.cantidad_placas" description="Cantidad de Placas" />
                    <InputCheckbox control={control} name="campos.tipo_rx" description="Tipo de Ensayo RX" />
                    <InputCheckbox control={control} name="campos.paga" description="Paga" />
                </Box>
            </form>
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

export default ContractsEditCampos