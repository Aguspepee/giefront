import { useState } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { IconButton } from '@mui/material';
import { headCells } from './list';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { resolvePath } from '../../../utils/path-resolvers';
import { format } from 'date-fns';
import { Tooltip } from '@mui/material';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { parteDelete } from '../../../services/partes';
import { Button } from '@mui/material';
//icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



function EnhancedTableRow({ reload, setReload, parte, ...props }) {
    const [open, setOpen] = useState(true);

    const handleDelete = (id) => {
        parteDelete(id)
        setReload(!reload)
    }
    return (
        <TableRow
            hover
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell>
                <IconButton
                    aria-label="expand row"
                    size="small"
                   onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    
                </IconButton>
            </TableCell>
            {headCells.map((headCell) => {
                //console.log("HEADDDD",headCell.id)
                return(
                <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? 'right' : 'left'}
                    padding={headCell.disablePadding ? 'none' : 'normal'}>
                    <>
                        {(headCell.show && headCell.type !== "date") &&
                            resolvePath(parte, headCell.id)
                        }
                        {(headCell.show && headCell.type === "date") &&  
                        (resolvePath(parte, headCell.id)?  format(new Date(resolvePath(parte, headCell.id)), 'dd/MM/yyyy'):"-")
                        }
                    </>

                </TableCell>
            )})}
            <TableCell>
                <Stack direction="row" spacing={2}>
                    <Tooltip title="Editar contrato">
                        <IconButton sx={{ ml: 1 }} component={Link} to={`/partes-edit/${parte._id}`}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar contrato">
                        <IconButton sx={{ ml: 1 }} onClick={() => { handleDelete(parte._id) }}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Stack>

            </TableCell>
        </TableRow>
    );
}


export default EnhancedTableRow