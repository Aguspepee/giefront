import { useEffect, useState } from "react";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function StyledDatepickerFilter({ onChange, ...props }) {
  const [value, setValue] = useState(null);
  let event=[]
  const handleChange = (newValue) => {
    event["target"] = {value: newValue}
    onChange(event)
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        {...props}
        inputFormat="dd/MM/yyyy"
        value={value}
        onChange={(value)=>handleChange(value)}
        renderInput={(params) =>
          <TextField size="small" {...params} />}
      />
    </LocalizationProvider>
  )
}

export default StyledDatepickerFilter