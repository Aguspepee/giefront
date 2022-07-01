import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import TableCell from '@mui/material/TableCell';
import { Fragment } from 'react';
import { Checkbox } from '@mui/material';


function EnhancedTableHead({ columns, order, orderBy, onRequestSort, onSelectAllClick, numSelected, rowCount, ...props }) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow style={{ height: "50px" }}>

                <TableCell padding="checkbox" style={{ backgroundColor: "#F3F4F6" }}>
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                <TableCell style={{ backgroundColor: "#F3F4F6" }}>

                </TableCell>
                {columns.map((column) => (
                    <Fragment key={column.id}>
                        {column.show &&
                            <TableCell
                                key={column.id}
                                align={column.numeric ? 'right' : 'left'}
                                padding={column.disablePadding ? 'none' : 'normal'}
                                sortDirection={orderBy === column.id ? order : false}
                                style={{ backgroundColor: "#F3F4F6", minWidth: `${column.width}px` }}
                            >
                                <TableSortLabel
                                    active={orderBy === column.id}
                                    direction={orderBy === column.id ? order : 'asc'}
                                    onClick={createSortHandler(column.id)}
                                >
                                    {column.label}
                                    {orderBy === column.id ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>
                            </TableCell>}
                    </Fragment>
                ))}
                <TableCell style={{ backgroundColor: "#F3F4F6" }}>
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

export default EnhancedTableHead