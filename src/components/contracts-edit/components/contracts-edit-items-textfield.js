import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

function InputTexfield({ control, name, description, type, ...rest }) {
    return (
        <Controller
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) =>
                <TextField
                    {...rest}
                    value={value ? value : ""}
                    error={Boolean(error)}
                    helperText={error && error.message}
                    label={description}
                    onChange={onChange}
                    onBlur={onBlur}
                    type={type}
                />}
            name={name}
            control={control}
        />
    )
}

export default InputTexfield