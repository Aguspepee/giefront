import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid
} from '@mui/material';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from "react-router-dom";
import { partesSchema } from '../../utils/yup';
import { parteCreate } from '../../services/partes';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import StyledTextfield from '../../styled-components/styled-textfield';
import StyledCheckbox from '../../styled-components/styled-checkbox';
//import { contractGetNames } from '../../services/contracts';
import { contractGetList } from '../../services/contracts';
import AutocompleteContracts from './components/autocomplete-contracts'
import StyledAutocompleteList from '../../styled-components/styled-autocomplete-list';
import { contractGetItems } from '../../services/contracts';

export const PartesAddForm = (props) => {
  //let { id } = useParams();
  const parte = props.parte;
  let list = []
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [contract, setContract] = useState([])
  const { control, handleSubmit, setValue, reset, formState: { errors, value } } = useForm({
    resolver: yupResolver(partesSchema),
  });

  console.log("Contrato", contract[0]?.campos[0]?.numero_reporte)
  //Se crea el listado de descripcion_servicio de ítems a partir del contrato
  list = contract[0]?.items.map((items) => items.descripcion_servicio)

  useEffect(() => {
    reset({
      /*       nombre: parte.nombre,
            abreviatura: parte.abreviatura,
            email: parte.email,
            direccion: parte.direccion,
            telefono: parte.telefono,
            active: parte.active, */
    });
  }, [parte]);

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
            <Grid container spacing={3}            >
              <AutocompleteContracts control={control} name="contrato" get={contractGetList} contract={contract} setContract={setContract} description="Contrato" errors={errors} md={6} xs={12} />
              <StyledTextfield show={contract[0]?.campos[0]?.numero_reporte} control={control} name={`numero_reporte`} type="text" description="Número de Reporte" errors={errors} md={6} xs={12} />
              <StyledTextfield show={contract[0]?.campos[0]?.numero_orden} control={control} name={`numero_orden`} type="text" description="Número de Orden" errors={errors} md={6} xs={12} />
              <StyledTextfield control={control} name={`tag`} type="text" description="TAG del equipo" errors={errors} md={6} xs={12} />
              <StyledTextfield control={control} name={`tag_detalle`} type="text" description="Detalle del equipo" errors={errors} md={6} xs={12} />
              <StyledAutocompleteList md={6} xs={12} control={control} name={`descripcion_servicio`} list={list ? list : []} description="Descripción del Servicio" errors={errors} />
              <StyledTextfield control={control} name={`cantidad`} type="number" description="Cantidad" errors={errors} md={6} xs={12} />
              <StyledCheckbox show={true} control={control} name="informe_realizado" defaultValue={false} description="Informe realizado" md={6} xs={12} />
            </Grid>
          </CardContent>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
            <Button type="submit" color="primary" variant="contained"            >
              Guardar Cambios
            </Button>
          </Box>
        </Card>
      </form>
    </LocalizationProvider>
  );
};
