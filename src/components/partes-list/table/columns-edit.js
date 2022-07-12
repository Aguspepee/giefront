import { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UserContext from '../../../context/userContext';
import { useContext } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { userEdit } from '../../../services/users';
import { Stack, Tooltip } from '@mui/material';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const ITEM_HEIGHT = 48;



export default function ColumnsEdit() {
    const [user, setUser] = useContext(UserContext);
    const [anchorEl, setAnchorEl] = useState(null);
    let columns = user.parteColumns;
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const onChangeShow = async (id) => {
        columns = columns.map((column) => {
            column._id === id ? (column.show = !column.show) : (column.show = column.show)
            return ({ ...column })
        })
        let document = await userEdit({ parteColumns: columns }, user._id)
        setUser(document.data)
    };

    const onChangeWidth = async (id, event) => {
        console.log(event.target.value)
        columns = columns.map((column) => {
            column._id === id ? column.width = Number(event.target.value) : (column.width = column.width)
            return ({ ...column })
        })
        let document = await userEdit({ parteColumns: columns }, user._id)
        setUser(document.data)
    };

    const onChangePosition = async (arr, old_index, new_index) => {
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        let document = await userEdit({ parteColumns: arr }, user._id)
        setUser(document.data)
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 7,
                    },
                }}
            >
                <Box sx={{ width: '100%', backgroundColor: "#F3F4F6", padding: "1em 1em 1em 1em" }}>
                    <Typography variant="body2" gutterBottom>
                        Seleccione las columnas que desea ver en la tabla.
                    </Typography>
                </Box>
                {columns.map((option, index) => (
                    <MenuItem key={option._id}>
                        <Stack direction="row">
                            <Tooltip title="Subir un nivel">
                                <IconButton sx={{ ml: 1 }} onClick={() => onChangePosition(columns, index, index - 1)}>
                                    <ArrowUpwardIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Bajar un nivel">
                                <IconButton sx={{ ml: 1 }} onClick={() => onChangePosition(columns, index, index + 1)}>
                                    <ArrowDownwardIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                        <Checkbox
                            checked={option.show}
                            inputProps={{ 'aria-label': 'controlled' }}
                            onChange={() => onChangeShow(option._id)}
                        />
                        <Input
                            value={Number(option.width) || 0}
                            style={{ width: "80px", paddingRight: "5px" }}
                            endAdornment={<InputAdornment position="end">px</InputAdornment>}
                            aria-describedby="standard-weight-helper-text"
                            type="number"
                            onChange={(event) => onChangeWidth(option._id, event)}
                        />
                        <Typography
                            style={{ paddingLeft: "15px" }}
                            variant="body1"
                        >
                            {option.label}
                        </Typography>
                    </MenuItem>
                ))}


            </Menu>
        </div>
    );
}