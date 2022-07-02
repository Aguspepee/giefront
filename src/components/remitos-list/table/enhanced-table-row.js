import { useState } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { IconButton } from '@mui/material';
import { resolvePath } from '../../../utils/path-resolvers';
import { format } from 'date-fns';
import { Tooltip } from '@mui/material';
import { Stack } from '@mui/material';
import { remitoDelete, remitoEstado } from '../../../services/remitos';
import { Checkbox } from '@mui/material';
import StyledChipUpdate from '../../../styled-components/styled-chip-update'
//import { remitoEdit } from '../../../services/remitos';
import { Fragment } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { remitoPDF } from '../../../utils/exports/remito-pdf';

//icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOff from "@mui/icons-material/HighlightOff";
import DownloadIcon from '@mui/icons-material/Download';

function EnhancedTableRow({ handleConfirmDialogChange, handleNotifyChange, columns, remito, selected, handleClick, index, handleReload, handleEdit, ...props }) {
    const [open, setOpen] = useState(false);
    const isSelected = (name) => selected.indexOf(name) !== -1;
    const isItemSelected = isSelected(remito._id);
    const labelId = `enhanced-table-checkbox-${index}`;

    //Cantidad de columnas mostradas
    //const colums_quantity = columns.filter((column) => column.show === true).length + 3

    const handleDelete = (id) => {
        remitoDelete(id)
        handleConfirmDialogChange({
            isOpen: false,
            title: "",
            subTitle: ""
        })
        handleNotifyChange({
            isOpen: true,
            message: 'El remito se eliminó correctamente',
            type: 'error'
        })
        handleReload()
    }
    return (
        <>
            <TableRow
                hover
                //onClick={(event) => handleClick(event, remito._id)}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={remito._id}
                selected={isItemSelected}
            >

                <TableCell padding="checkbox" style={{ backgroundColor: open ? "rgba(80, 72, 229, 0.12)" : "" }}>
                    <Checkbox
                        onClick={(event) => handleClick(event, remito._id, remito)}
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
                                            resolvePath(remito, column.id)
                                        }
                                        {column.type === "number" &&
                                            resolvePath(remito, column.id)
                                        }
                                        {column.type === "select" &&
                                            <StyledChipUpdate
                                                value={resolvePath(remito, column.id)}
                                                edit={remitoEstado}
                                                field={column.id}
                                                label={column.label}
                                                id={remito._id}
                                                handleReload={handleReload} />
                                        }
                                        {column.type === "date" &&
                                            (resolvePath(remito, column.id) ? format(new Date(resolvePath(remito, column.id)), 'dd/MM/yyyy') : "-")
                                        }
                                    </>

                                </TableCell>
                            }
                        </Fragment>
                    )
                })}
                <TableCell style={{ backgroundColor: open ? "rgba(80, 72, 229, 0.12)" : "" }}>
                    <Stack direction="row" spacing={2}>
                    <Tooltip title="Descargar Remito">
                            <IconButton sx={{ ml: 1 }} onClick={()=>{
                               remitoPDF(remito)
                            }}>
                                <DownloadIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar contrato">
                            <IconButton sx={{ ml: 1 }} onClick={()=>{
                                handleEdit({open:true, remito:remito})
                            }}>
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar remito">
                            <IconButton sx={{ ml: 1 }} onClick={() => {
                                handleConfirmDialogChange({
                                    isOpen: true,
                                    title: "¿Deseas eliminar este remito?",
                                    subTitle: "Luego de eliminarlo, no podrás recuperar la información.",
                                    onConfirm: () => { handleDelete(remito.remito_numero) },
                                    icon: <HighlightOff fontSize='inherit' color="error" />
                                })
                            }}>
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>

                    </Stack>
                </TableCell>
            </TableRow >
            {/* <RowDetails open={open} remito={remito} colums_quantity={colums_quantity} handleReload={handleReload} /> */}

        </>
    );
}


export default EnhancedTableRow