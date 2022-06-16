import { React, useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Table, Button, TableHead, TableBody, TableRow, TableCell, Stack, Tooltip, IconButton, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { contractEdit } from "../../services/contracts";
import { useParams } from "react-router-dom";
//YUP Schema
import { contractCamposSchema } from '../../utils/yup'
//Icons
import EditIcon from '@mui/icons-material/Edit';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';

//Alerts y Notifications
import Notification from '../../styled-components/alerts/notification';
import ConfirmDialog from '../../styled-components/alerts/confirm-dialog';

function ContractsEditUnidades({ data, ...props }) {
    let { id } = useParams();
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "success" })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" })
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(contractCamposSchema),
    });


    const unidades = useFieldArray({
        control,
        name: "unidades"
    });

    useEffect(() => {
        reset({
            unidades: data.unidades,
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
            <form id="myform3" onSubmit={handleSubmit(data => onSubmit(data))}>
                <Table sx={{ minWidth: 400 }} aria-label="simple table" size="small">
                    <TableHead style={{ height: "50px" }}>
                        <TableRow>
                            <TableCell>
                                #
                            </TableCell>
                            <TableCell>
                                Nombre de la Unidad
                            </TableCell>
                            <TableCell>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {unidades.fields.map((unidad, index) => (
                            <TableRow
                                key={unidad.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="left">
                                    <Controller
                                        render={({ field: { onChange, onBlur, ref, value } }) =>
                                            <TextField
                                                defaultValue={value}
                                                error={Boolean(errors.unidades?.[index]?.nombre)}
                                                helperText={errors.unidades?.[index]?.nombre && errors.unidades?.[index]?.nombre?.message}
                                                label=""
                                                margin="none"
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                size="small"
                                                fullWidth
                                            />}
                                        name={`unidades.${index}.nombre`}
                                        control={control}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Stack direction="row">
                                        <Tooltip title="Subir un nivel">
                                            <IconButton sx={{ ml: 1 }} onClick={() => unidades.move(index, index !== 0 ? index - 1 : index)}>
                                                <ArrowUpwardIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Bajar un nivel">
                                            <IconButton sx={{ ml: 1 }} onClick={() => unidades.move(index, index + 1)}>
                                                <ArrowDownwardIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Eliminar Item">
                                            <IconButton sx={{ ml: 1 }} onClick={() => unidades.remove(index)}>
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
                    onClick={() => unidades.append({})}
                >
                    Agregar Unidades
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

export default ContractsEditUnidades