import { React, useEffect, useState } from "react";
import { useForm, useFieldArray, } from "react-hook-form";
import { Button, IconButton, Tooltip, Paper } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { contractEdit } from "../../services/contracts";
import InputAutocompleteList from "./components/contracts-edit-items-autocomplete-list";
import { useParams } from "react-router-dom";
//Icons
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
//Listados
import { unidades_medida, tipos_actividad, subtipos_actividad } from "../../utils/list";
//YUP Schema
import { contractItemsSchema } from '../../utils/yup'
import InputTexfield from "./components/contracts-edit-items-textfield";
//Icons
import EditIcon from '@mui/icons-material/Edit';
//Alerts y Notifications
import Notification from '../../styled-components/alerts/notification';
import ConfirmDialog from '../../styled-components/alerts/confirm-dialog';
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { Stack } from "@mui/material";

function ContractsEditItems({ data, ...props }) {
  let { id } = useParams();
  const [notify, setNotify] = useState({ isOpen: false, message: "", type: "success" })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" })
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(contractItemsSchema),
  });

  const items = useFieldArray({
    control,
    name: "items"
  });

  useEffect(() => {
    reset({
      items: data.items,
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
      <form id="myform2" onSubmit={handleSubmit(data => onSubmit(data))}>
        {/* <TableContainer component={Paper}> */}
        <Paper sx={{ overflowX: "auto", width: "100%", height: '65vh' }}>
          <Table aria-label="simple table" stickyHeader size="small">
            <TableHead style={{ height: "50px" }}>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Descripción del Servicio</TableCell>
                <TableCell align="right" sx={{ minWidth: 150 }}>Código del Servicio</TableCell>
                <TableCell align="right" sx={{ minWidth: 150 }}>Tipo de Actividad</TableCell>
                <TableCell align="right" sx={{ minWidth: 180 }}>Subtipo de Actividad</TableCell>
                <TableCell align="right" sx={{ minWidth: 150 }}>Valor</TableCell>
                <TableCell align="right" sx={{ minWidth: 300 }}>Unidad de Medida</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.fields.map((item, index) => (
                <TableRow
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{index + 1}</TableCell>
                  <TableCell align="left" style={{ minWidth: "500px" }}>
                    <InputTexfield control={control} name={`items.${index}.descripcion_servicio`} type="text" description="" errors={errors} multiline maxRows={4} fullWidth size="small"/>
                  </TableCell>
                  <TableCell align="right">
                    <InputTexfield control={control} name={`items.${index}.codigo_servicio`} type="text" description="" errors={errors} size="small"/>
                  </TableCell>
                  <TableCell align="right">
                    <InputAutocompleteList control={control} name={`items.${index}.tipo_actividad`} list={tipos_actividad} description="" errors={errors} size="small"/>
                  </TableCell>
                  <TableCell align="right">
                    <InputAutocompleteList control={control} name={`items.${index}.clase`} list={subtipos_actividad} description="" errors={errors} size="small"/>
                  </TableCell>
                  <TableCell align="right">
                    <InputTexfield control={control} name={`items.${index}.valor`} type="number" description="" errors={errors} size="small"/>
                  </TableCell>
                  <TableCell align="right">
                    <InputAutocompleteList control={control} name={`items.${index}.unidad_medida`} list={unidades_medida} description="" errors={errors} size="small"/>
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row">
                      <Tooltip title="Subir un nivel">
                        <IconButton sx={{ ml: 1 }} onClick={() => items.move(index, index !== 0 ? index - 1 : index)}>
                          <ArrowUpwardIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Bajar un nivel">
                        <IconButton sx={{ ml: 1 }} onClick={() => items.move(index, index + 1)}>
                          <ArrowDownwardIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar Item">
                        <IconButton sx={{ ml: 1 }} onClick={() => items.remove(index)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </Paper>
        {/* </TableContainer> */}
        <Stack direction="row" spacing={2}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => items.append({})}
          >
            Agregar Ítems
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => { for (let i = 1; i < 10; i++) { items.append({}) } }}
          >
            Agregar Ítem x10
          </Button>
        </Stack>
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

export default ContractsEditItems