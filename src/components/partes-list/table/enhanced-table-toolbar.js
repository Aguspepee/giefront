import { useEffect } from "react";
import { CardContent, Toolbar, Autocomplete, Stack, Box, Checkbox, Divider, Chip, Avatar, Paper } from "@mui/material";
import { Typography } from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import { Tooltip } from "@mui/material";
import ColumnsEdit from './columns-edit'
import { parteDeleteMany } from "../../../services/partes";
import PartesListAdd from "../partes-list-add";
import RemitoCreate from "../partes-list-remito";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Collapse } from '@mui/material';
import { contractGetList } from '../../../services/contracts';
import { TextField } from "@mui/material";
import { styled } from '@mui/material/styles';

//Icons
import HighlightOff from "@mui/icons-material/HighlightOff";
import { useState } from "react";
import { userEdit } from "../../../services/users";

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function EnhancedTableToolbar({ handleStartLoading,
  search, handleSearchChange, handleConfirmDialogChange, handleNotifyChange, numSelected,
  selected, remito, handleReload, selectedToEmpty, user, handleUserChange, ...props }) {
  const [expanded, setExpanded] = useState(false)
  const [contracts, setContracts] = useState([])
  const [contract, setContract] = useState()
  const [presearch, setPresearch] = useState(user.search)

  const handleChange = async (field, item) => {
    //Cambia el filtro de busqueda general que controla todo
    handleSearchChange({ ...search, [field]: item ? item?._id : undefined })
    //Setea la prebusqueda, que queda guardada en el usuario(local)
    handleUserChange({ ...user, ['search']: [{ contrato: item ? item?._id : undefined }] })
    //Guarda la config. en el usuario
    try {
      const res = await userEdit({ ['search']: [{ contrato: item ? item?._id : undefined }] }, user._id)
    } catch (e) {
    }
    //Recarga la tabla
    handleStartLoading()
    handleReload()
  }

  const handleDelete = () => {
    parteDeleteMany(selected)
    handleConfirmDialogChange({
      isOpen: false,
      title: "",
      subTitle: ""
    })
    handleNotifyChange({
      isOpen: true,
      message: 'Los partes se eliminaron correctamente correctamente',
      type: 'error'
    })
    selectedToEmpty()
    handleReload()
  }
  useEffect(() => {
    const getContracts = async () => {
      const res = await contractGetList()
      setContracts(res.data)
      const contract = res.data.filter((contract) => contract._id === user?.search[0]?.contrato)
      setContract(contract[0] ? { _id: contract[0]?._id, nombre: contract[0]?.nombre } : '')
    }
    getContracts()
  }, [])


  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          //bgcolor:"#F3F4F6",
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}

      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} seleccionados
          </Typography>
        ) : (
          <>
            <Typography
              sx={{ flex: '1 1 100%' }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Parte Diario

            </Typography>
            <Tooltip title="Borrar ítems">
              <IconButton onClick={() => setExpanded(!expanded)}>
                <FilterAltIcon />
              </IconButton>
            </Tooltip>
          </>
        )}

        {numSelected > 0 ? (
          <>
            <RemitoCreate
              remito={remito}
              selected={selected}
              handleConfirmDialogChange={handleConfirmDialogChange}
              handleNotifyChange={handleNotifyChange}
              handleReload={handleReload}
              selectedToEmpty={selectedToEmpty} />

            <Tooltip title="Borrar ítems">
              <IconButton onClick={() => {
                handleConfirmDialogChange({
                  isOpen: true,
                  title: "¿Deseas eliminar los partes seleccionados?",
                  subTitle: "Luego de eliminarlos, no podrás recuperar la información.",
                  onConfirm: () => { handleDelete() },
                  icon: <HighlightOff fontSize='inherit' color="error" />
                })
              }} >
                <Delete />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <ColumnsEdit handleReload={handleReload} />
            <PartesListAdd handleReload={handleReload} />
          </>
        )
        }

      </Toolbar >
      <Divider />
      {contract &&
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'left',
            flexWrap: 'wrap',
            listStyle: 'none',
            p: 0.5,
            m: 0,
          }}
          component="ul"
          style={{ padding: '0.5em 0em 0.5em 1em', width: '100%' }}>

          <ListItem>
            <Chip
              color="primary"
              label={contract?.nombre}
              onDelete={() => {
                handleChange('contrato', '')
                setContract('')
              }}
            />
          </ListItem>
          <ListItem>
            <Chip
              color="primary"
              label={contract?.nombre}
              onDelete={() => {
                handleChange('contrato', '')
                setContract('')
              }}
            />
          </ListItem>

        </Box>
      }

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider />
        <CardContent style={{ padding: '1em 1em 1em 1em' }}>
          <Typography
            color="textSecondary"
            variant="h6"
          >
            Filtros generales
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            Los filtros generales quedan guardados en su perfil.
          </Typography>
          <Box style={{ padding: '1em 0em 0em 0em' }}>
            <Stack direction='column'>
              <Autocomplete
                size="small"

                getOptionLabel={(contracts) => `${contracts.nombre}`}
                options={contracts}
                disablePortal
                isOptionEqualToValue={(option, value) => {
                  return (option._id === value._id)
                }}
                noOptionsText={"Sin opciones"}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    label="Contrato"
                    placeholder="Contrato"
                    style={{ width: '370px' }}
                  //  error={Boolean(errors[name])}
                  //  helperText={errors[name] && errors[name]?.message}
                  />}
                value={contract ? contract : null}
                onChange={(event, item) => {
                  setContract(item)
                  handleChange('contrato', item)
                }}
                clearOnBlur={true}
              />
              <Autocomplete
                size="small"

                getOptionLabel={(contracts) => `${contracts.nombre}`}
                options={contracts}
                disablePortal
                isOptionEqualToValue={(option, value) => {
                  return (option._id === value._id)
                }}
                noOptionsText={"Sin opciones"}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    label="Contrato"
                    placeholder="Contrato"
                    style={{ width: '370px' }}
                  //  error={Boolean(errors[name])}
                  //  helperText={errors[name] && errors[name]?.message}
                  />}
                value={contract ? contract : null}
                onChange={(event, item) => {
                  setContract(item)
                  handleChange('contrato', item)
                }}
                clearOnBlur={true}
              />
            </Stack>
          </Box>
        </CardContent>
      </Collapse>
    </>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};