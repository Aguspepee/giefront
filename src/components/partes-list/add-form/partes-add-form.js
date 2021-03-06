import { useEffect, useState } from 'react';
import { Box, Button, CardContent, Divider, Grid } from '@mui/material';
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { partesSchema } from '../../../utils/yup';
import { parteCreate } from '../../../services/partes';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import StyledTextfield from '../../../styled-components/styled-textfield';
import StyledCheckbox from '../../../styled-components/styled-checkbox';
import { contractGetList } from '../../../services/contracts';
import AutocompleteContracts from './components/autocomplete-contracts'
import StyledAutocompleteList from '../../../styled-components/styled-autocomplete-list';
import StyledAdicional from '../../../styled-components/styled-adicional';
import StyledItem from '../../../styled-components/styled-item';
import { tipo_rx } from '../../../utils/list';
import UserContext from '../../../context/userContext';
import { useContext } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import StyledDatepickerDesktop from '../../../styled-components/styled-datepicker-desktop';
import StyledAutocompleteGet from '../../../styled-components/styled-autocomplete-get';
import { userGetNames } from '../../../services/users';

//Alerts y Notifications
import Notification from '../../../styled-components/alerts/notification';
import ConfirmDialog from '../../../styled-components/alerts/confirm-dialog';

//Icons
import EngineeringIcon from '@mui/icons-material/Engineering';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import FactoryIcon from '@mui/icons-material/Factory';

export const PartesAddForm = ({ handleReload }) => {
  //let { id } = useParams();

  const [user, setUser] = useContext(UserContext);
  const [contract, setContract] = useState([])
  const [notify, setNotify] = useState({ isOpen: false, message: "", type: "success" })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" })
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(partesSchema),
  });
  let list = contract[0]?.items
  let unidades = contract[0]?.unidades.map((unidad) => unidad.nombre)

  //Setea el usuario como operador
  useEffect(() => {
    reset({
      operador: { _id: user._id, nombre: user.nombre, apellido: user.apellido },
    });

  }, [user, setUser]);

  const items = useFieldArray({
    control,
    name: "items"
  });

  async function addParte(parte) {
    console.log("parte", parte)
    try {
      const doc = await parteCreate({ ...parte, inspector: `${user.nombre} ${user.apellido}` })
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false
      })
      setNotify({
        isOpen: true,
        message: 'El parte de agreg?? correctamente',
        type: 'success'
      })
      handleReload()
      console.log(doc)
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

  async function onSubmit(parte) {
    setConfirmDialog({
      isOpen: true,
      title: "??Desea agregar el parte?",
      subTitle: "Datos del parte",
      onConfirm: () => { addParte(parte) },
      icon: <AddCircleOutlineIcon fontSize='inherit' color="success" />
    })

  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <form onSubmit={handleSubmit(data => onSubmit(data))}>

          <CardContent >
            <Grid container spacing={1.5}>
              <AutocompleteContracts control={control} name="contrato" get={contractGetList} contract={contract} setContract={setContract} description="Contrato" errors={errors} md={12} xs={12} Icon={() => <HistoryEduIcon />} small />
              <StyledAutocompleteGet control={control} name="operador" get={userGetNames} description="Operador/a" errors={errors} fullWidth margin="normal" md={12} xs={12} Icon={() => <EngineeringIcon />} />
              <StyledAutocompleteList show={contract[0]?.campos[0]?.unidad} md={12} xs={12} control={control} name={`unidad`} list={unidades ? unidades : []} description="Unidad" errors={errors} Icon={() => <FactoryIcon />} />
              <StyledDatepickerDesktop control={control} name="fecha_inspeccion" description="Fecha de Inspecci??n" errors={errors} md={12} xs={12} />
              <StyledTextfield show={contract[0]?.campos[0]?.numero_reporte} control={control} name={`numero_reporte`} type="text" description="N??mero de Reporte" errors={errors} md={6} xs={6} />
              <StyledTextfield show={contract[0]?.campos[0]?.numero_orden} control={control} name={`numero_orden`} type="text" description="N??mero de Orden" errors={errors} md={6} xs={6} />
              <StyledTextfield show={true} control={control} name={`tag`} type="text" description="TAG del equipo" errors={errors} md={12} xs={12} />

              <StyledTextfield control={control} name={`tag_detalle`} type="text" description="Detalle del equipo" errors={errors} md={12} xs={12} />
              <StyledItem name={`items.0.descripcion_servicio`} errors={errors} control={control} list={list ? list : []} items={() => items.append({})} />
              {items.fields.slice(1).map((item, index) => (
                < StyledAdicional name={`items.${index + 1}.descripcion_servicio`} key={item.id} item={item} items={items} errors={errors} index={index + 1} control={control} list={list ? list : []} />
              ))}
              <StyledTextfield show={contract[0]?.campos[0]?.diametro} control={control} name={`detalles.diametro`} type="number" description="Di??metro" errors={errors} md={6} xs={6} />
              <StyledTextfield show={contract[0]?.campos[0]?.espesor} control={control} name={`detalles.espesor`} type="number" description="Espesor" errors={errors} md={6} xs={6} />
              <StyledTextfield show={contract[0]?.campos[0]?.numero_costuras} control={control} name={`detalles.numero_costuras`} type="number" description="N??mero de costuras" errors={errors} md={6} xs={6} />
              <StyledTextfield show={contract[0]?.campos[0]?.cantidad_placas} control={control} name={`detalles.cantidad_placas`} type="number" description="Cantidad de Placas" errors={errors} md={6} xs={6} />
              <StyledAutocompleteList show={contract[0]?.campos[0]?.tipo_rx} md={12} xs={12} control={control} name={`detalles.tipo`} list={tipo_rx} description="Tipo" errors={errors} />
              <StyledCheckbox show={true} control={control} name="informe_realizado" defaultValue={false} description="Informe realizado" md={12} xs={12} />
            </Grid>
          </CardContent>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
            <Button type='submit' color="primary" variant="contained" disabled={isSubmitting} onClick={() => { }
            }>
              Guardar Cambios
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => console.log(errors)}
            >
              Errores
            </Button>
          </Box>

        </form>
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
};
