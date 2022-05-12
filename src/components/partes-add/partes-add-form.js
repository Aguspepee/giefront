import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid, IconButton, Tooltip, Typography
} from '@mui/material';
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { partesSchema } from '../../utils/yup';
import { parteCreate } from '../../services/partes';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import StyledTextfield from '../../styled-components/styled-textfield';
import StyledCheckbox from '../../styled-components/styled-checkbox';
import { contractGetList } from '../../services/contracts';
import AutocompleteContracts from './components/autocomplete-contracts'
import StyledAutocompleteList from '../../styled-components/styled-autocomplete-list';
import { tipo_rx } from '../../utils/list';

//Icons
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export const PartesAddForm = (props) => {
  //let { id } = useParams();
  const parte = props.parte;
  let items = []
  let subitems = []
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [contract, setContract] = useState([])
  const { control, handleSubmit, getValues, setValue, reset, formState: { errors, value, isSubmitting } } = useForm({
    resolver: yupResolver(partesSchema),
  });
  //Se crea el listado de descripcion_servicio de ítems a partir del contrato
  items = contract[0]?.items.filter((dato) => dato.clase === "Ítem").map((dato) => dato.descripcion_servicio)
  subitems = contract[0]?.items.filter((dato) => dato.clase === "Subítem").map((dato) => dato.descripcion_servicio)
  console.log(value)
  useEffect(() => {
    reset({
      /*       nombre: parte.nombre,
            abreviatura: parte.abreviatura,
            email: parte.email,
            direccion: parte.direccion,
            telefono: parte.telefono,
            active: parte.active, */
    });
  }, []);

  const adicionales = useFieldArray({
    control,
    name: "adicionales"
  });

  async function onSubmit(parte) {
    try {
      const res = await parteCreate(parte)
      console.log("Se modificó el usuario", res.data)
      setSuccess(true)
      setError(false)
    } catch (e) {
      console.log(e)
      setError(true)
      setSuccess(false)
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={handleSubmit(data => onSubmit(data))}>
        <Card>
          <CardHeader
            subheader="Edite la información y guarde los cambios"
            title="Perfil"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <AutocompleteContracts control={control} name="contrato" get={contractGetList} contract={contract} setContract={setContract} description="Contrato" errors={errors} md={6} xs={12} />
              <StyledTextfield show={contract[0]?.campos[0]?.numero_reporte} control={control} name={`numero_reporte`} type="text" description="Número de Reporte" errors={errors} md={6} xs={12} />
              <StyledTextfield show={contract[0]?.campos[0]?.numero_orden} control={control} name={`numero_orden`} type="text" description="Número de Orden" errors={errors} md={6} xs={12} />
              <StyledTextfield control={control} name={`tag`} type="text" description="TAG del equipo" errors={errors} md={6} xs={12} />
              <StyledTextfield control={control} name={`tag_detalle`} type="text" description="Detalle del equipo" errors={errors} md={6} xs={12} />

              <StyledCheckbox show={true} control={control} name="informe_realizado" defaultValue={false} description="Informe realizado" md={6} xs={12} />
              <StyledAutocompleteList md={6} xs={12} control={control} name={`descripcion_servicio`} list={items ? items : []} description="Descripción del Servicio" errors={errors} />
              <StyledTextfield control={control} name={`cantidad`} type="number" description="Cantidad" errors={errors} md={6} xs={12} />
            </Grid>
          </CardContent>
          <Divider />
          <CardContent>
            <Typography variant="h6" gutterBottom component="div" style={{ paddingTop: "1em" }}>
              Adicionales
            </Typography>
            {adicionales.fields.map((adicional, index) => (
              <Grid key={index} container spacing={3}>
                <StyledAutocompleteList md={6} xs={12} control={control} name={`adicionales.${index}.descripcion_servicio`} list={subitems ? subitems : []} description="Descripción del Servicio" errors={errors} />
                <StyledTextfield control={control} name={`adicionales.${index}.cantidad`} type="number" description="Cantidad" errors={errors} md={6} xs={12} />
                <Tooltip title="Eliminar Adicional">
                  <IconButton sx={{ ml: 1 }} onClick={() => adicionales.remove(index)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Grid>
            ))}
            <Button
              color="primary"
              variant="contained"
              onClick={() => adicionales.append({})}
            >
              Agregar adicional
            </Button>
          </CardContent>
          <CardContent>
            <Grid container spacing={3}>
              <StyledTextfield show={contract[0]?.campos[0]?.diametro} control={control} name={`detalles.diametro`} type="number" description="Diámetro" errors={errors} md={2} xs={2} />
              <StyledTextfield show={contract[0]?.campos[0]?.espesor} control={control} name={`detalles.espesor`} type="number" description="Espesor" errors={errors} md={2} xs={2} />
              <StyledTextfield show={contract[0]?.campos[0]?.numero_costuras} control={control} name={`detalles.numero_costuras`} type="number" description="Número de costuras" errors={errors} md={2} xs={2} />
              <StyledTextfield show={contract[0]?.campos[0]?.cantidad_placas} control={control} name={`detalles.cantidad_placas`} type="number" description="Cantidad de Placas" errors={errors} md={2} xs={2} />
              <StyledAutocompleteList show={contract[0]?.campos[0]?.tipo_rx} md={4} xs={4} control={control} name={`detalles.tipo`} list={tipo_rx} description="Tipo" errors={errors} />
            </Grid>
          </CardContent>


          <Divider style={{ paddingTop: "1.5em" }} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
            <Button type="submit" color="primary" variant="contained" disabled={isSubmitting}>
              Guardar Cambios
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => console.log(getValues('contrato'))}
            >
              Errores
            </Button>
          </Box>
        </Card>
      </form>
    </LocalizationProvider>
  );
};
