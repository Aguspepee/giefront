import { Button, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Stack } from "@mui/material";

export default function SessionTimeout({ expirationTime }) {
    const [expirationDialog, setExpirationDialog] = useState({ isOpen: false, title: "", subTitle: "", expired: false })
    let Now = new Date()
    let Difference = 100000000
    useEffect(() => {
        const Login = () => {
                let Expiration = new Date(expirationTime * 1000)
                Difference = Expiration - Now;
                console.log(Difference /60000)
                setTimeout(() => {
                    setExpirationDialog({
                        title: "La sesión está por expirar",
                        subTitle: "Su sesión vence en 5 minutos, guarde su trabajo e inicie sesión nuevamente.",
                        isOpen: true,
                        expired: false
                    })
                }, Difference - (5 * 60000))
                setTimeout(() => {
                    setExpirationDialog({
                        title: "La sesión ha finalizado",
                        subTitle: "Debe volver a iniciar sesión nuevamente.",
                        isOpen: true,
                        expired: true
                    })
                }, Difference)
        }
        Login()
    }, []
    )
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