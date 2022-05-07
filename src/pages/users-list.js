import { Box, Container } from '@mui/material';
import { useState } from 'react';
import { UsersListResults } from '../components/users-list/users-list-results';
import UsersListToolbar from '../components/users-list/users-list-toolbar';
import { DashboardLayout } from '../layout/layout';
import { users } from '../__mocks__/users';

function UsersList() {
  const [reload, setReload] = useState(false)
  return (
    <>
      <DashboardLayout>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 4
          }}
        >
          <Container maxWidth={false}>
            <UsersListToolbar setReload={setReload} reload={reload} />
            <Box sx={{ mt: 3 }}>
              <UsersListResults setReload={setReload} reload={reload} />
            </Box>
          </Container>
        </Box>
      </DashboardLayout>
    </>
  )
}

export default UsersList;
