import { useState } from "react";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function StyledDatepickerFilter() {
    const [date, setDate] = useState(null)
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
                inputFormat="dd/MM/yyyy"
                value={date}
                onChange={(value) => setDate(value)}
                renderInput={(params) =>
                    <TextField size="small" {...params} />}
            />
        </LocalizationProvider>
    )
}

export default StyledDatepickerFilter