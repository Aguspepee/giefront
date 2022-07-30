import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import LoadingButton from '@mui/lab/LoadingButton';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { userUpdate } from "../../services/users";

function UpdateUsers({ }) {
    const [loading, setLoading] = useState(false)

    const update = async ()=>{
        setLoading(true)
        try{
            const res = await userUpdate()
            console.log('Los usuarios se actualizaron correctamente')
            setLoading(false)
        }catch(e){
            console.log(e)
        }

    }

    return (
        <Card >
            <CardHeader
                    title={'Reiniciar configuración de los usuarios'}
                    subheader={'Toda las preferencias de los ususarios serán eliminadas y vueltas a su estado inicial'}
                />
            <CardContent>
                <LoadingButton
                    size="small"
                    onClick={()=>update()}
                    endIcon={<RestartAltIcon />}
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                >
                    Reiniciar usuarios
                </LoadingButton>
            </CardContent>
        </Card>
    );
}

export default UpdateUsers;