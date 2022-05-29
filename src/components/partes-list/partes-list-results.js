import { useState, useEffect } from 'react';
import {
  Box, Card, Table, TableBody, TableCell, TableRow, IconButton,
  Paper,
} from '@mui/material';
import { parteGetRestricted, parteDelete, parteEdit } from '../../services/partes';
import StyledCheckboxActive from '../../styled-components/styled-checkbox-active'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { resolvePath } from '../../utils/path-resolvers';



import EnhancedTableHead from './table/enhanced-table-head';
import EnhancedTableSearch from './table/enhanced-table-search';
import EnhancedTableRow from './table/enhanced-table-row';

export const PartesListResults = (props) => {
  const [reload, setReload] = useState(false)
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const [partes, setPartes] = useState([])

  useEffect(() => {
    async function getList() {
      try {
        const partes = await parteGetRestricted()
        setPartes(partes.data)
        setReload(!false)
      } catch (error) {
        console.log(error)
      }
    }
    getList()
  }, [reload,setReload])
  console.log(partes)

  return (

    <Card>
      <Paper sx={{ overflowX: "auto", width: "100%", height: "500px" }}>
        <Box sx={{ minWidth: 1050, maxWidth: 1600 }}>
          <Table stickyHeader size="small" >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              <EnhancedTableSearch />
              {partes?.map((parte) => (
                <EnhancedTableRow key={parte._id} parte={parte} reload={reload} setReload={() => setReload()} />
              ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </Card>

  );
};