import { useState } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { IconButton } from '@mui/material';
import { headCells } from './list';
import { resolvePath } from '../../../utils/path-resolvers';
import { format } from 'date-fns';
import { Tooltip } from '@mui/material';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { parteDelete } from '../../../services/partes';
import { Checkbox } from '@mui/material';
import StyledChipUpdate from '../../../styled-components/styled-chip-update'
import {parteEdit} from '../../../services/partes';

//icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



function EnhancedTableRow({ parte, selected, handleClick, index, handleReload, ...props }) {
    const [open, setOpen] = useState(true);
    const isSelected = (name) => selected.indexOf(name) !== -1;
    const isItemSelected = isSelected(parte._id);
    const labelId = `enhanced-table-checkbox-${index}`;

    const handleDelete = (id) => {
        parteDelete(id)
        handleReload()
    }
    return (<>
        <TableRow
            hover
            //onClick={(event) => handleClick(event, parte._id)}
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={parte._id}
            selected={isItemSelected}
        >
            <TableCell padding="checkbox">
                <Checkbox
                    onClick={(event) => handleClick(event, parte._id)}
                    color="primary"
                    checked={isItemSelected}
                    inputProps={{
                        'aria-labelledby': labelId,
                    }}
                />
            </TableCell>

            {headCells.map((headCell) => {
                //console.log("HEADDDD",headCell.id)
                return (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}>
                        <>
                            {(headCell.show && headCell.type === "text") &&
                                resolvePath(parte, headCell.id)
                            }
                            {(headCell.show && headCell.type === "number") &&
                                resolvePath(parte, headCell.id)
                            }
                            {(headCell.show && headCell.type === "select") &&
                                <StyledChipUpdate 
                                value={resolvePath(parte, headCell.id)} 
                                edit={parteEdit} 
                                field={headCell.id} 
                                label={headCell.label}
                                id={parte._id} 
                                handleReload={handleReload}/>
                            }
                            {(headCell.show && headCell.type === "date") &&
                                (resolvePath(parte, headCell.id) ? format(new Date(resolvePath(parte, headCell.id)), 'dd/MM/yyyy') : "-")
                            }
                        </>

                    </TableCell>
                )
            })}
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

    </>
    );
}


export default EnhancedTableRow