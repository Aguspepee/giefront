import { Button, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import React from "react";
import { Link } from 'react-router-dom';
import { Stack } from "@mui/material";

export default function SessionTimeout(props) {
    const { expirationDialog, setExpirationDialog } = props;
    return (
        <Dialog open={expirationDialog.isOpen} >
            <DialogContent style={{ textAlign: "center" }}>
                <Typography variant="h6" style={{ paddingTop: "0px" }}>
                    {expirationDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {expirationDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center", paddingBottom: "2em" }}>
                <Stack direction="row" spacing={2}>
                    {!expirationDialog.expired &&
                        <Button
                            variant="outlined"
                            onClick={() => setExpirationDialog({ ...expirationDialog, isOpen: false })} >
                            Cancelar
                        </Button>
                    }

                    <Button
                        variant="contained"
                        autoFocus
                        to='/users-login'
                        component={Link} onClick={() => setExpirationDialog({ ...expirationDialog, isOpen: false, expirated: false })} >
                        Ir a iniciar sesión
                    </Button>
                </Stack>
            </DialogActions>
        </Dialog>

    )
}