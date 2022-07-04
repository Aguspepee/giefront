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
import Skeleton from '@mui/material/Skeleton';

//icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOff from "@mui/icons-material/HighlightOff";

function EnhancedTableSkeleton({ columns, ...props }) {

    return (
        <>
            <TableRow  style={{height:"3em"}}>
                <TableCell padding="checkbox" >
                <Skeleton variant="text" />
                </TableCell>
                <TableCell >
                <Skeleton variant="text" />
                </TableCell>
                {columns.map((column) => {
                    return (
                        <Fragment key={column.id}>
                            {column.show &&
                                <TableCell
                                    key={column.id}
                                    align={column.numeric ? 'right' : 'left'}
                                    padding={column.disablePadding ? 'none' : 'normal'}
                                  
                                >
                                    <Skeleton variant="text" />
                                </TableCell>
                            }
                        </Fragment>
                    )
                })}
                <TableCell >
                <Skeleton variant="text" />
                </TableCell>
            </TableRow >

        </>
    );
}


export default EnhancedTableSkeleton