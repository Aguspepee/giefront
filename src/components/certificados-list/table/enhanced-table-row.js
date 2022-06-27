import { useState } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { IconButton } from '@mui/material';
import { resolvePath } from '../../../utils/path-resolvers';
import { format } from 'date-fns';
import { Tooltip } from '@mui/material';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
//import { certificadoDelete } from '../../../services/certificados';
import { Checkbox } from '@mui/material';
import StyledChipUpdate from '../../../styled-components/styled-chip-update'
//import { certificadoEdit } from '../../../services/certificados';
import { Fragment } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import RowDetails from './row-details';
import { certificadoXLS } from '../../../utils/exports/certificado-xls';



//icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOff from "@mui/icons-material/HighlightOff";
import DownloadIcon from '@mui/icons-material/Download';

function EnhancedTableRow({ handleConfirmDialogChange, handleNotifyChange, columns, certificado, selected, handleClick, index, handleReload, handleEdit, ...props }) {
    const [open, setOpen] = useState(false);
    const isSelected = (name) => selected.indexOf(name) !== -1;
    const isItemSelected = isSelected(certificado._id);
    const labelId = `enhanced-table-checkbox-${index}`;

    //Cantidad de columnas mostradas
    const colums_quantity = columns.filter((column) => column.show === true).length + 3

    const handleDelete = (id) => {
        //certificadoDelete(id)
        handleConfirmDialogChange({
            isOpen: false,
            title: "",
            subTitle: ""
        })
        handleNotifyChange({
            isOpen: true,
            message: 'El certificado se eliminó correctamente',
            type: 'error'
        })
        handleReload()
    }
    return (
        <>
            <TableRow
                hover
                //onClick={(event) => handleClick(event, certificado._id)}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={certificado._id}
                selected={isItemSelected}
            >

                <TableCell padding="checkbox" style={{ backgroundColor: open ? "rgba(80, 72, 229, 0.12)" : "" }}>
                    <Checkbox
                        onClick={(event) => handleClick(event, certificado._id)}
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
                                            resolvePath(certificado, column.id)
                                        }
                                        {column.type === "number" &&
                                            resolvePath(certificado, column.id)
                                        }
                                        {column.type === "select" &&
                                            <StyledChipUpdate
                                                value={resolvePath(certificado, column.id)}
                                                //edit={certificadoEdit}
                                                field={column.id}
                                                label={column.label}
                                                id={certificado._id}
                                                handleReload={handleReload} />
                                        }
                                        {column.type === "date" &&
                                            (resolvePath(certificado, column.id) ? format(new Date(resolvePath(certificado, column.id)), 'dd/MM/yyyy') : "-")
                                        }
                                    </>

                                </TableCell>
                            }
                        </Fragment>
                    )
                })}
                <TableCell style={{ backgroundColor: open ? "rgba(80, 72, 229, 0.12)" : "" }}>
                    <Stack direction="row" spacing={2}>
                    <Tooltip title="Descargar Certificado">
                            <IconButton sx={{ ml: 1 }} onClick={()=>{
                               certificadoXLS(certificado)
                            }}>
                                <DownloadIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar contrato">
                            <IconButton sx={{ ml: 1 }} onClick={()=>{
                                handleEdit({open:true, certificado:certificado})
                            }}>
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar certificado">
                            <IconButton sx={{ ml: 1 }} onClick={() => {
                                handleConfirmDialogChange({
                                    isOpen: true,
                                    title: "¿Deseas eliminar este certificado?",
                                    subTitle: "Luego de eliminarlo, no podrás recuperar la información.",
                                    onConfirm: () => { handleDelete(certificado._id) },
                                    icon: <HighlightOff fontSize='inherit' color="error" />
                                })
                            }}>
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>

                    </Stack>
                </TableCell>
            </TableRow >
            {/* <RowDetails open={open} certificado={certificado} colums_quantity={colums_quantity} handleReload={handleReload} /> */}

        </>
    );
}


export default EnhancedTableRow