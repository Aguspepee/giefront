import { Alert, Snackbar } from "@mui/material";
import React from "react";


export default function Notification(props) {
    const { notify, setNotify } = props

    const handleClose = (event, reason) => {
        setNotify({
            ...notify,
            isOpen: false
        })
    }

    return (

        <div>
            <Snackbar
                open={notify.isOpen}
                autoHideDuration={5000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                style={{ marginTop: "4em" }}
                onClose={handleClose}
            >
                <Alert
                    severity={notify.type}
                    onClose={handleClose}
                >
                    {notify.message}
                </Alert>
            </Snackbar>
        </div>
    )
}