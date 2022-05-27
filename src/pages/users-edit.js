import { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { UsersEditProfile } from '../components/users-edit/users-edit-profile';
import { UsersEditProfileDetails } from '../components/users-edit/users-edit-profile-details';
import { DashboardLayout } from '../layout/layout';
import { UsersEditPassword } from '../components/users-edit/users-edit-password';
import { useParams } from "react-router-dom";
import {userOne} from '../services/users';

function UsersEdit() {
  let { id } = useParams();
  const [user, setUser] = useState([])
  const [reload, setReload] = useState(false)

  useEffect(() => {
    async function getUser() {
      try {
        const document = await userOne(id)
        setUser(document.data)
      } catch (e) {
        console.log(e)
      }
    }
    getUser()
  }, [reload])

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
            Editar Usuario
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
              <UsersEditProfile reload={reload} setReload={setReload} user={user}/>
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
                  <UsersEditProfileDetails reload={reload} setReload={setReload} user={user}/>
                </Grid>
                <Grid
                  item
                  lg={12}
                  md={12}
                  xs={12}
                >
                  <UsersEditPassword reload={reload} setReload={setReload} user={user}/>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </DashboardLayout>
  )
}


export default UsersEdit;
