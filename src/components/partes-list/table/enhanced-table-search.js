import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';
import { headCells } from './list';
import { Search } from '@mui/icons-material';
import { TextField } from '@mui/material';
import { Chip } from '@mui/material';
import { Stack } from '@mui/material';
import StyledDatepickerFilter from '../../../styled-components/styled-datepicker-filter';

function EnhancedTableSearch(props) {

    return (
        <TableRow style={{ height: "70px" }}>
            <TableCell style={{ backgroundColor: "#F3F4F6" }}>
                <Tooltip title="Seleccionar columnas">
                    <IconButton sx={{ ml: 1 }} onClick={() => console.log("columnas")}>
                        <Search disabled fontSize="small"  />
                    </IconButton>
                </Tooltip>
            </TableCell>
            {headCells.map((headCell) => (
                <TableCell
                    key={headCell.id}
                    padding={headCell.disablePadding ? 'none' : 'normal'}
                    style={{ backgroundColor: "#F3F4F6", minWidth: headCell.width }}>
                    {(headCell.show && headCell.type === "text") &&
                        <TextField
                            size="small"
                            fullWidth
                            placeholder={headCell.placeHolder}
                            variant="outlined"
                            //onChange={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
                            onChange={(event) => console.log(event.target.value)}
                        />
                    }
                    {(headCell.show && headCell.type === "number") &&
                        <TextField
                            size="small"
                            fullWidth
                            placeholder={headCell.placeHolder}
                            variant="outlined"
                            type="number"
                        />
                    }
                    {(headCell.show && headCell.type === "date") &&
                        <StyledDatepickerFilter />
                    }
                    {(headCell.show && headCell.type === "select") &&
                        <Stack direction="column" spacing={1}>
                            <Chip label="Small" size="small" />
                            <Chip label="Small" size="small" variant="outlined" />
                        </Stack>
                    }
                    {(headCell.show && headCell.type === "none") &&
                        <>
                        </>
                    }
                </TableCell>
            ))}
            <TableCell style={{ backgroundColor: "#F3F4F6" }}>
            </TableCell>
        </TableRow>
    );
}


export default EnhancedTableSearch