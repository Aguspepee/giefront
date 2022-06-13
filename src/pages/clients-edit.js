import { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { ClientsEditProfile } from '../components/clients-edit/clients-edit-profile';
import { ClientsEditDetails } from '../components/clients-edit/clients-edit-details';
import { DashboardLayout } from '../layout/layout';
import { useParams } from "react-router-dom";
import { clientOne } from '../services/clients';

function ClientsEdit() {
  let { id } = useParams();
  const [client, setClient] = useState([])
  const [reload, setReload] = useState(false)

  useEffect(() => {
    async function getClient() {
      try {
        const document = await clientOne(id)
        setClient(document.data)
      } catch (e) {
        console.log(e)
      }
    }
    getClient()
  }, [reload])

  const handleReload = () => {
    setReload(!reload)
  }

  return (
    <DashboardLayout>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Typography
            sx={{ mb: 3 }}
            variant="h4"
          >
            Editar Cliente
          </Typography>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <ClientsEditProfile handleReload={handleReload} client={client} />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  lg={12}
                  md={12}
                  xs={12}
                >
                  <ClientsEditDetails handleReload={handleReload} client={client} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </DashboardLayout>
  )
}


export default ClientsEdit;
