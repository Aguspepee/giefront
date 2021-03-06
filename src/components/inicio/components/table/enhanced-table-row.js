import { useState } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { IconButton } from '@mui/material';
import { resolvePath } from '../../../../utils/path-resolvers';
import { format } from 'date-fns';
import { Tooltip } from '@mui/material';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { parteDelete } from '../../../../services/partes';
import { Checkbox } from '@mui/material';
import StyledChipUpdate from '../../../../styled-components/styled-chip-update'
import { parteEdit } from '../../../../services/partes';
import { Fragment } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import RowDetails from './row-details';

//icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOff from "@mui/icons-material/HighlightOff";

function EnhancedTableRow({ handleConfirmDialogChange, handleNotifyChange, columns, parte, selected, handleClick, index, handleReload, handleEdit, ...props }) {
    const [open, setOpen] = useState(false);
    const isSelected = (name) => selected.indexOf(name) !== -1;
    const isItemSelected = isSelected(parte._id);
    const labelId = `enhanced-table-checkbox-${index}`;

    //Cantidad de columnas mostradas
    const colums_quantity = columns.filter((column) => column.show === true).length + 3

    const handleDelete = (id) => {
        parteDelete(id)
        handleConfirmDialogChange({
            isOpen: false,
            title: "",
            subTitle: ""
        })
        handleNotifyChange({
            isOpen: true,
            message: 'El parte se eliminĂ³ correctamente',
            type: 'error'
        })
        handleReload()
    }
    return (
        <>
            <TableRow
                hover
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={parte._id}
                selected={isItemSelected}
            >

                <TableCell padding="checkbox" style={{ backgroundColor: open ? "rgba(80, 72, 229, 0.12)" : "" }}>
                    <Checkbox
                        onClick={(event) => handleClick(event, parte._id, parte)}
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                            'aria-labelledby': labelId,
                        }}
                    />
                </TableCell>
                <TableCell style={{ backgroundColor: open ? "rgba(80, 72, 229, 0.12)" : "" }}>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                {columns.map((column) => {
                    return (
                        <Fragment key={column.id}>
                            {column.show &&
                                <TableCell
                                    key={column.id}
                                    align={column.numeric ? 'right' : 'left'}
                                    padding={column.disablePadding ? 'none' : 'normal'}
                                    style={{ backgroundColor: open ? "rgba(80, 72, 229, 0.12)" : "" }}
                                >
                                    <>
                                        {column.type === "text" &&
                                            resolvePath(parte, column.id)
                                        }
                                        {column.type === "number" &&
                                            resolvePath(parte, column.id)
                                        }
                                        {column.type === "select" &&
                                            <StyledChipUpdate
                                                value={resolvePath(parte, column.id)}
                                                edit={parteEdit}
                                                field={column.id}
                                                label={column.label}
                                                id={parte._id}
                                                handleReload={handleReload} />
                                        }
                                        {column.type === "date" &&
                                            (resolvePath(parte, column.id) ? format(new Date(resolvePath(parte, column.id)), 'dd/MM/yyyy') : "-")
                                        }
                                    </>

                                </TableCell>
                            }
                        </Fragment>
                    )
                })}
                <TableCell style={{ backgroundColor: open ? "rgba(80, 72, 229, 0.12)" : "" }}>
                    <Stack direction="row" spacing={2}>
                        <Tooltip title="Editar contrato">
                            <IconButton sx={{ ml: 1 }} onClick={()=>{
                                handleEdit({open:true, parte:parte})
                            }}>
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar parte">
                            <IconButton sx={{ ml: 1 }} onClick={() => {
                                handleConfirmDialogChange({
                                    isOpen: true,
                                    title: "Â¿Deseas eliminar este parte?",
                                    subTitle: "Luego de eliminarlo, no podrĂ¡s recuperar la informaciĂ³n.",
                                    onConfirm: () => { handleDelete(parte._id) },
                                    icon: <HighlightOff fontSize='inherit' color="error" />
                                })
                            }}>
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>

                    </Stack>
                </TableCell>
            </TableRow >
            <RowDetails open={open} parte={parte} colums_quantity={colums_quantity} handleReload={handleReload} />

        </>
    );
}


export default EnhancedTableRow