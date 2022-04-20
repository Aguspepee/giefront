import * as Yup from 'yup';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  IconButton,
  Tooltip
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Formik, Form, FieldArray, getIn, } from 'formik';

//iconos
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';


const validationSchema = Yup.object().shape({
  items: Yup.array().of(
    Yup.object().shape({
      id: Yup.number(),
    //  Descripcion: Yup.string().required("Descripción is required"),
    //  Precio: Yup.string().required("Precio is required")
    })
  )
});

export const EditContractItems = (props) => {


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Card>
        <CardHeader
          subheader="Agregue, modifique o elimine los Ítems del contrato. Recuerde guardar una copia del contrato."
          title="Ítems del contrato"
        />
        <Divider />
        <CardContent>
          <Formik
            initialValues={{
              items: [
                {
                  Id: "1",
                  Codigo: "",
                  Descripcion: "asdasd",
                  Unidad: "",
                  Abreviatura: "",
                  Tipo: "", //Item o Sub Item
                  SubTipo: "",//Adicionales por suministro de materiales, horarios, etc.
                  Precio: ""
                },
                {
                  Id: "1",
                  Codigo: "",
                  Descripcion: "asdasd",
                  Unidad: "",
                  Abreviatura: "",
                  Tipo: "",
                  Precio: ""
                },
                {
                  Id: "1",
                  Codigo: "",
                  Descripcion: "asdasd",
                  Unidad: "",
                  Abreviatura: "",
                  Tipo: "",
                  Precio: ""
                }
              ]
            }}
            validationSchema={validationSchema}
            onSubmit={values => {
              console.log("onSubmit", JSON.stringify(values, null, 2));
            }}
          >
            {({ values, touched, errors, handleChange, handleBlur, isValid }) => (
              <Form noValidate autoComplete="off">
                <FieldArray name="items">

                  {({ push, remove, move }) => (
                    <div>
                      {values.items.map((p, index) => {
                        const Codigo = `items[${index}].Codigo`;
                        const touchedCodigo = getIn(touched, Codigo);
                        const errorCodigo = getIn(errors, Codigo);

                        const Descripcion = `items[${index}].Descripcion`;
                        const touchedDescripcion = getIn(touched, Descripcion);
                        const errorDescripcion = getIn(errors, Descripcion);

                        const Unidad = `items[${index}].Unidad`;
                        const touchedUnidad = getIn(touched, Unidad);
                        const errorUnidad = getIn(errors, Unidad);

                        const Abreviatura = `items[${index}].Abreviatura`;
                        const touchedAbreviatura = getIn(touched, Abreviatura);
                        const errorAbreviatura = getIn(errors, Abreviatura);

                        const Tipo = `items[${index}].Tipo`;
                        const touchedTipo = getIn(touched, Tipo);
                        const errorTipo = getIn(errors, Tipo);

                        const SubTipo = `items[${index}].SubTipo`;
                        const touchedSubTipo = getIn(touched, SubTipo);
                        const errorSubTipo = getIn(errors, SubTipo);

                        const Precio = `items[${index}].Precio`;
                        const touchedPrecio = getIn(touched, Precio);
                        const errorPrecio = getIn(errors, Precio);
                        console.log("RENDERIZÓ")

                        return (
                          <div key={index}>
                            <Grid
                              container
                              spacing={3}
                            >
                              <Grid
                                item
                                md={0.3}
                                xs={12}
                              >
                                <Box style={{ padding: "25px 0px 15px 0px", color: "gray" }}>
                                  <Typography variant="h6" display="block" gutterBottom>
                                    {index}-
                                  </Typography>
                                </Box>

                              </Grid>
                              <Grid
                                item
                                md={1}
                                xs={12}
                              >
                                <TextField
                                  margin="normal"
                                  variant="outlined"
                                  label="Código"
                                  name={Codigo}
                                  value={p.Codigo}
                                  required
                                  helperText={
                                    touchedCodigo && errorCodigo
                                      ? errorCodigo
                                      : ""
                                  }
                                  error={Boolean(touchedCodigo && errorCodigo)}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  size="small"
                                />
                              </Grid>
                              <Grid
                                item
                                md={2}
                                xs={12}
                              >
                                <TextField
                                  margin="normal"
                                  variant="outlined"
                                  label="Descripción"
                                  multiline
                                  name={Descripcion}
                                  value={p.Descripcion}
                                  required
                                  helperText={
                                    touchedDescripcion && errorDescripcion
                                      ? errorDescripcion
                                      : ""
                                  }
                                  error={Boolean(touchedDescripcion && errorDescripcion)}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  size="small"
                                />
                              </Grid>
                              <Grid
                                item
                                md={2}
                                xs={12}
                              >
                                <TextField
                                  margin="normal"
                                  variant="outlined"
                                  label="Unidad"
                                  name={Unidad}
                                  value={p.Unidad}
                                  required
                                  helperText={
                                    touchedUnidad && errorUnidad
                                      ? errorUnidad
                                      : ""
                                  }
                                  error={Boolean(touchedUnidad && errorUnidad)}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  size="small"
                                />
                              </Grid>
                              <Grid
                                item
                                md={2}
                                xs={12}
                              >
                                <TextField
                                  margin="normal"
                                  variant="outlined"
                                  label="Abreviatura"
                                  name={Abreviatura}
                                  value={p.Abreviatura}
                                  required
                                  helperText={
                                    touchedAbreviatura && errorAbreviatura
                                      ? errorAbreviatura
                                      : ""
                                  }
                                  error={Boolean(touchedAbreviatura && errorAbreviatura)}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  size="small"
                                />
                              </Grid>
                              <Grid
                                item
                                md={1}
                                xs={12}
                              >
                                <TextField
                                  margin="normal"
                                  variant="outlined"
                                  label="Tipo"
                                  name={Tipo}
                                  value={p.Tipo}
                                  required
                                  helperText={
                                    touchedTipo && errorTipo
                                      ? errorTipo
                                      : ""
                                  }
                                  error={Boolean(touchedTipo && errorTipo)}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  size="small"
                                />
                              </Grid>
                              <Grid
                                item
                                md={1}
                                xs={12}
                              >
                                <TextField
                                  margin="normal"
                                  variant="outlined"
                                  label="SubTipo"
                                  name={SubTipo}
                                  value={p.SubTipo}
                                  required
                                  helperText={
                                    touchedSubTipo && errorSubTipo
                                      ? errorSubTipo
                                      : ""
                                  }
                                  error={Boolean(touchedSubTipo && errorSubTipo)}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  size="small"
                                />
                              </Grid>
                              <Grid
                                item
                                md={1}
                                xs={12}
                              >
                                <TextField
                                  margin="normal"
                                  variant="outlined"
                                  label="Precio"
                                  name={Precio}
                                  value={p.Precio}
                                  required
                                  helperText={
                                    touchedPrecio && errorPrecio
                                      ? errorPrecio
                                      : ""
                                  }
                                  error={Boolean(touchedPrecio && errorPrecio)}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  size="small"
                                />
                              </Grid>
                              <Grid
                                item
                                md={1.5}
                                xs={12}
                              >
                                <Box style={{ padding: "18px 0px 15px 0px" }}>
                                  <Tooltip title="Subir un nivel">
                                    <IconButton sx={{ ml: 1 }} onClick={() => move(index, index !== 0 ? index - 1 : index)}>
                                      <ArrowUpwardIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Bajar un nivel">
                                    <IconButton sx={{ ml: 1 }} onClick={() => move(index, index + 1)}>
                                      <ArrowDownwardIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Eliminar Item">
                                    <IconButton sx={{ ml: 1 }} onClick={() => remove(index)}>
                                      <DeleteIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                </Box>
                              </Grid>
                            </Grid>
                          </div>
                        );
                      })}
                      <Button
                        type="button"
                        variant="outlined"
                        onClick={() =>
                          push({Id: "",
                          Codigo: "",
                          Descripcion: "",
                          Unidad: "",
                          Abreviatura: "",
                          Tipo: "",
                          Precio: ""})
                        }
                      >
                        Add
                      </Button>

                    </div>
                  )}

                </FieldArray>
                <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                >
                  Guardar Cambios
                </Button>
              </Form>
            )}

          </Formik>
        </CardContent>
      </Card>
    </LocalizationProvider >
  );
};
