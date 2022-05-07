import * as yup from "yup";
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
      tipo_ensayo: yup.boolean().nullable(),
    }),
  
    items: yup.array().of(
      yup.object().shape({
        descripcion: yup.string().required("First Name is required"),
        codigo_servicio: yup.string().required("First Name is required"),
        unidad_medida: yup.string().required("First Name is required"),
        tipo_actividad: yup.string().required("First Name is required"),
        subtipo_actividad: yup.string().required("First Name is required"),
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

  export const userSchema = yup.object().shape({
    nombre: yup.string().required("El nombre del cliente es requerido"),
    apellido: yup.string().required("La descripción del contrato es requerida"),
    area: yup.string().required("La descripción del contrato es requerida"),
    role: yup.string().required("El cliente es requerido"),
    active: yup.boolean(),
  })

  export const clientSchema = yup.object().shape({
    nombre: yup.string().required("El nombre del cliente es requerido"),
    abreviatura: yup.string().required("La descripción del contrato es requerida"),
    telefono: yup.string().required("La descripción del contrato es requerida"),
    direccion: yup.string().required("La descripción del contrato es requerida"),
    email: yup.string().required("La descripción del contrato es requerida"),
    active: yup.boolean(),
  })

  
  