import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import { Tooltip } from "@mui/material";
import ColumnsEdit from './columns-edit'
import { parteDeleteMany } from "../../../services/partes";
import { Receipt } from "@mui/icons-material";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Link } from 'react-router-dom';
import PartesListAdd from "../partes-list-add";

export default function EnhancedTableToolbar({ numSelected, selected, handleReload, ...props }) {
  const handleDelete = () => {
    console.log("borró")
    parteDeleteMany(selected)
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
          Parte Diario
        </Typography>
      )}

      {numSelected > 0 ? (
        <>
          <Tooltip title="Elaborar Remito">
            <IconButton  >
              <Receipt />
            </IconButton>
          </Tooltip>
          <Tooltip title="Borrar ítems">
            <IconButton onClick={() => handleDelete()} >
              <Delete />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>

          <ColumnsEdit handleReload={handleReload} />
          <PartesListAdd handleReload={handleReload}/>
        </>
      )
      }
    </Toolbar >
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};