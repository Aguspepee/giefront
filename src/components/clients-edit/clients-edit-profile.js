import React from 'react';
import { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import { clientImage } from '../../services/clients';

export const ClientsEditProfile = (props) => {
  const client = props.client;

  async function handleFileSelect(event) {
    const formData = new FormData();
    formData.append("userImage", event.target.files[0]);
    try {
      const response = await clientImage(client._id, formData)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={client.image ? `${process.env.REACT_APP_BACKEND_URL}${client.image}` : ""}
            sx={{
              height: 200,
              mb: 0,
              width: 200
            }}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            {client.abreviatura}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {client.nombre}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="contained"
          component="label"
        >
          Cambiar foto de perfil
          <input
            type="file"
            hidden
            onChange={handleFileSelect}
          />
        </Button>
      </CardActions>
    </Card>
  );
}
