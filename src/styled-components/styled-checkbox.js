import { Controller } from "react-hook-form";
import { Checkbox, Box, Typography, Grid } from '@mui/material';

function StyledCheckbox({ control, name, description, show, md, xs, ...props }) {

    return (
        <>
            {show &&
                <Grid md={md} xs={xs} item >
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            ml: -1
                        }}
                    >
                        <Controller
                            name={name}
                            control={control}
                            render={({ field: { value, ref, onChange } }) => {
                                return (
                                    <Checkbox
                                        inputRef={ref}
                                        checked={!!value}
                                        color="primary"
                                        size={"medium"}
                                        disableRipple
                                        onChange={onChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                )
                            }}
                        />
                        <Typography
                            color="textSecondary"
                            variant="body2"
                        >
                            {description}
                        </Typography>
                    </Box>
                </Grid>}
        </>
    )
}

export default StyledCheckbox