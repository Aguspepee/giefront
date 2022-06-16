import { React, useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Table, Button, TableHead, TableBody, TableRow, TableCell, Stack, Tooltip, IconButton, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { contractEdit } from "../../services/contracts";
import { useParams } from "react-router-dom";
//YUP Schema
import { contractCertificantesSchema } from '../../utils/yup'

//Icons
import EditIcon from '@mui/icons-material/Edit';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';

//Alerts y Notifications
import Notification from '../../styled-components/alerts/notification';
import ConfirmDialog from '../../styled-components/alerts/confirm-dialog';

function ContractsEditCertificantes({ data, ...props }) {
    let { id } = useParams();
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "success" })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" })
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(contractCertificantesSchema),
    });


    const certificantes = useFieldArray({
        control,
        name: "certificantes"
    });

    useEffect(() => {
        reset({
            certificantes: data.certificantes,
        });
    }, [data]);


    async function editContract(contract) {
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
            <form id="myform4" onSubmit={handleSubmit(data => onSubmit(data))}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow style={{ height: "50px" }}>
                            <TableCell></TableCell>
                            <TableCell align="left">Nombre del certificante</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {certificantes.fields.map((certificante, index) => (
                            <TableRow
                                key={certificante.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>
                                    {index + 1}
                                </TableCell>
                                <TableCell>
                                    <Controller
                                        render={({ field: { onChange, onBlur, ref, value } }) =>
                                            <TextField
                                                defaultValue={value}
                                                error={Boolean(errors.certificantes?.[index]?.nombre)}
                                                helperText={errors.certificantes?.[index]?.nombre && errors.certificantes?.[index]?.nombre?.message}
                                                label="Nombre"
                                                margin="none"
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                size="small"
                                            />}
                                        name={`certificantes.${index}.nombre`}
                                        control={control}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Stack direction="row">
                                        <Tooltip title="Subir un nivel">
                                            <IconButton sx={{ ml: 1 }} onClick={() => certificantes.move(index, index !== 0 ? index - 1 : index)}>
                                                <ArrowUpwardIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Bajar un nivel">
                                            <IconButton sx={{ ml: 1 }} onClick={() => certificantes.move(index, index + 1)}>
                                                <ArrowDownwardIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Eliminar Item">
                                            <IconButton sx={{ ml: 1 }} onClick={() => certificantes.remove(index)}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </TableCell>
                            </TableRow>))}
                    </TableBody>
                </Table>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => certificantes.append({})}
                >
                    Agregar Certificantes
                </Button>
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

export default ContractsEditCertificantes