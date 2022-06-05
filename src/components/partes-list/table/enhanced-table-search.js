import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';
import { TextField } from '@mui/material';
import StyledChipFilter from '../../../styled-components/styled-chip-filter'
import StyledDatepickerFilter from '../../../styled-components/styled-datepicker-filter';
import { Fragment } from 'react';
import { Checkbox } from '@mui/material';

function EnhancedTableSearch({ search, columns, ...props }) {
    return (
        <TableRow style={{ height: "40px" , backgroundColor: "#F3F4F6"}}>
            <TableCell padding="checkbox">
{/*                 <Checkbox
                    //onClick={(event) => handleClick(event, parte._id)}
                    color="primary"
                // checked={isItemSelected}
                 inputProps={{
                     'aria-labelledby': labelId,
                 }} 
                />  */}
            </TableCell>
             <TableCell style={{ backgroundColor: "#F3F4F6" }}>

            </TableCell> 
            {columns.map((column) => {
                function handleChange(event) {
                    props.onChange({ ...search, [column.id.replace("[", ".").replace("]", "")]: event.target.value })
                }
                return (
                    <Fragment key={column.id}>
                        {column.show &&
                            <TableCell
                                padding={column.disablePadding ? 'none' : 'normal'}
                                style={{ backgroundColor: "#F3F4F6", minWidth: column.width }}>
                                {column.type === "text" &&
                                    <TextField
                                        size="small"
                                        fullWidth
                                        placeholder={column.placeHolder}
                                        variant="outlined"
                                        onChange={handleChange}
                                    />
                                }
                                {column.type === "number" &&
                                    <TextField
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
                                    <StyledChipFilter onChange={handleChange} />
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