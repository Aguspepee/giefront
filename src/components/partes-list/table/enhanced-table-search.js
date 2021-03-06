import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { TextField } from '@mui/material';
import StyledChipFilter from '../../../styled-components/styled-chip-filter'
import StyledDatepickerFilter from '../../../styled-components/styled-datepicker-filter';
import { Fragment } from 'react';

function EnhancedTableSearch({ handleStartLoading, search, columns, handleSearchChange, ...props }) {
    return (
        <TableRow style={{ height: "40px", backgroundColor: "#F3F4F6" }}>
            <TableCell padding="checkbox">
            </TableCell>
            <TableCell style={{ backgroundColor: "#F3F4F6" }}>
            </TableCell>
            {columns.map((column) => {
                function handleChange(event) {
                    handleStartLoading()
                    handleSearchChange({ ...search, [column.id.replace("[", ".").replace("]", "")]: event.target.value })
                }
                return (
                    <Fragment key={column.id}>
                        {column.show &&
                            <TableCell
                                padding={column.disablePadding ? 'none' : 'normal'}
                                style={{ backgroundColor: "#F3F4F6" }}>
                                {column.type === "text" &&
                                    <TextField
                                        defaultValue={column.search}
                                        size="small"
                                        fullWidth
                                        placeholder={column.placeHolder}
                                        variant="outlined"
                                        onChange={handleChange}
                                    />
                                }
                                {column.type === "number" &&
                                    <TextField
                                        defaultValue={column.search}
                                        size="small"
                                        fullWidth
                                        placeholder={column.placeHolder}
                                        variant="outlined"
                                        type="number"
                                        onChange={handleChange}
                                    />
                                }
                                {column.type === "date" &&
                                    <StyledDatepickerFilter onChange={handleChange} />
                                }
                                {column.type === "select" &&
                                    <StyledChipFilter default_value={column.search} onChange={handleChange} />
                                }
                                {column.type === "none" &&
                                    <>
                                    </>
                                }
                            </TableCell>
                        }
                    </Fragment>
                )
            })}
            <TableCell style={{ backgroundColor: "#F3F4F6" }}>
            </TableCell>
        </TableRow>
    );
}


export default EnhancedTableSearch