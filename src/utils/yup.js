import * as yup from "yup";

//CONTRATOS
export const contractSchema = yup.object().shape({
  nombre: yup.string().required("El nombre del cliente es requerido"),
  descripcion: yup.string().required("La descripción del contrato es requerida"),
  area: yup.string().required("La descripción del contrato es requerida"),
  cliente: yup.string().required("El cliente es requerido"),
  fecha_inicio: yup.date(),
  fecha_fin: yup.date(),
  numero_reporte: yup.boolean(),
  activo: yup.boolean(),

  campos: yup.object().shape({
    numero_reporte: yup.boolean().nullable(),
    numero_orden: yup.boolean().nullable(),
    adicionales: yup.boolean().nullable(),
    equipo_completo: yup.boolean().nullable(),
    diametro: yup.boolean().nullable(),
    espesor: yup.boolean().nullable(),
    numero_costuras: yup.boolean().nullable(),
    cantidad_placas: yup.boolean().nullable(),
    tipo_rx: yup.boolean().nullable(),
  }),

  items: yup.array().of(
    yup.object().shape({
      descripcion_servicio: yup.string().required("First Name is required"),
      codigo_servicio: yup.string().required("First Name is required"),
      unidad_medida: yup.string().required("First Name is required"),
      tipo_actividad: yup.string().required("First Name is required"),
      clase: yup.string().required("First Name is required"),
      valor: yup.number()
        .typeError('age must be a number')
        .positive('age must be greater than zero')
        .required('age is required')
    })
  ),

  unidades: yup.array().of(
    yup.object().shape({
      nombre: yup.string().required("El nombre de la unidad es requerido"),
      abreviatura: yup.string().length(3, "Debe tener 3 caracteres").required("Se debe colocar una abreviatura")
    })
  ),

  certificantes: yup.array().of(
    yup.object().shape({
      nombre: yup.string().required("El nombre de la unidad es requerido"),
      apellido: yup.string().required("El nombre de la unidad es requerido"),
    })
  ),
})

//USUARIOS
export const userSchema = yup.object().shape({
  nombre: yup.string().required("El nombre del cliente es requerido"),
  apellido: yup.string().required("La descripción del contrato es requerida"),
  area: yup.string().required("La descripción del contrato es requerida"),
  role: yup.string().required("El cliente es requerido"),
  active: yup.boolean(),
})

//CLIENTES
export const clientSchema = yup.object().shape({
  nombre: yup.string().required("El nombre del cliente es requerido"),
  abreviatura: yup.string().required("La descripción del contrato es requerida"),
  telefono: yup.string().required("La descripción del contrato es requerida"),
  direccion: yup.string().required("La descripción del contrato es requerida"),
  email: yup.string().required("La descripción del contrato es requerida"),
  active: yup.boolean(),
})

//PARTE DIARIO
export const partesSchema = yup.object().shape({
  contrato: yup.string().required("El contrato es un campo requerido"),
  unidad:  yup.string().required("La unidad es requerida"),
  descripcion_servicio: yup.string().required("First Name is required"),
  numero_reporte: yup.string(),
  numero_orden: yup.string(),
  tag: yup.string().required("El cliente es requerido"),
  tag_detalle: yup.string(), 
  cantidad: yup.number()
  .typeError('La cantidad debe ser un número')
  .positive('Debe ser un número positivo')
  .required('La cantidad es requerida'),
  informe_realizado: yup.boolean(),

  detalles: yup.object().shape({
    diametro: yup.number(),
    espesor: yup.number(),
    numero_costuras: yup.number(),
    cantidad_placas: yup.number()
    .typeError('La cantidad debe ser un número')
    .positive('Debe ser un número positivo'),
    tipo: yup.string(),
  }),

  adicionales: yup.array().of(
    yup.object().shape({
      descripcion_servicio: yup.string().required("First Name is required"),
      cantidad: yup.string().required("First Name is required"),
    })
  ),
})
