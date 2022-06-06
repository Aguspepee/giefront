import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import React from "react";


export default function ConfirmDialog(props) {
    
    const { confirmDialog, setConfirmDialog } = props;
    console.log(confirmDialog)
    const Icon = confirmDialog.icon;
    return (
        <Dialog open={confirmDialog.isOpen} >
            <DialogTitle style={{ fontSize: '5em', textAlign: "center", paddingBottom: "0px", height: "1.4em" }}>
                {Icon}
            </DialogTitle>
            <DialogContent style={{ textAlign: "center" }}>
                <Typography variant="h6" style={{ paddingTop: "0px" }}>
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center", paddingBottom: "2em" }}>
                <Button variant="outlined" onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}>
                    Cancelar
                </Button>
                <Button variant="contained" autoFocus onClick={confirmDialog.onConfirm}>
                    Aceptar
                </Button>
            </DialogActions>
        </Dialog>

    )
}