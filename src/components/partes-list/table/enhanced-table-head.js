import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import TableCell from '@mui/material/TableCell';
import { Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { headCells } from './list';
import { Fragment } from 'react';

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow style={{ height: "70px" }}>
                <TableCell style={{ backgroundColor: "#F3F4F6" }}>
                    <Tooltip title="Seleccionar columnas">
                        <IconButton sx={{ ml: 1 }} onClick={() => console.log("columnas")} >
                            <ViewColumnIcon disabled fontSize="small"  />
                        </IconButton>
                    </Tooltip>
                </TableCell>
                {headCells.map((headCell) => (
                    <Fragment key={headCell.id}>
                        {headCell.show &&
                            <TableCell
                                key={headCell.id}
                                align={headCell.numeric ? 'right' : 'left'}
                                padding={headCell.disablePadding ? 'none' : 'normal'}
                                sortDirection={orderBy === headCell.id ? order : false}
                                style={{ backgroundColor: "#F3F4F6", minWidth: headCell.width }}

                            >
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={createSortHandler(headCell.id)}
                                >
                                    {headCell.label}
                                    {orderBy === headCell.id ? (
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