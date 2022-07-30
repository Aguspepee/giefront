import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Fragment } from 'react';
import Skeleton from '@mui/material/Skeleton';

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