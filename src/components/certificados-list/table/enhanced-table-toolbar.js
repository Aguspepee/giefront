import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import { Tooltip } from "@mui/material";
import ColumnsEdit from './columns-edit'
import { certificadoDelete } from "../../../services/certificados";

//Icons
import HighlightOff from "@mui/icons-material/HighlightOff";

export default function EnhancedTableToolbar({handleConfirmDialogChange, handleNotifyChange, numSelected, selected, handleReload, ...props }) {
  const handleDelete = () => {
    certificadoDelete(selected)
    handleConfirmDialogChange({
      isOpen: false,
      title: "",
      subTitle: ""
    })
    handleNotifyChange({
      isOpen: true,
      message: 'Los certificados se eliminaron correctamente correctamente',
      type: 'error'
    })
    handleReload()
  }

  return (
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
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Certificados
        </Typography>
      )}

      {numSelected > 0 ? (
        <>
          <Tooltip title="Borrar ítems">
            <IconButton onClick={() => {
              handleConfirmDialogChange({
                isOpen: true,
                title: "¿Deseas eliminar el certificado seleccionado?",
                subTitle: "Luego de eliminarlo, no podrás recuperar la información.",
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
        </>
      )
      }
    </Toolbar >
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};