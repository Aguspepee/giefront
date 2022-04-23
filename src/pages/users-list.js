import { Box, Container } from '@mui/material';
import { UsersListResults } from '../components/users/users-list-results';
import { UsersListToolbar } from '../components/users/users-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { users } from '../__mocks__/users';

function UsersList() {
  return (
    <>
      <DashboardLayout>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <UsersListToolbar />
          <Box sx={{ mt: 3 }}>
            <UsersListResults users={users} />
          </Box>
        </Container>
      </Box>
      </DashboardLayout>
    </>
  )
}

export default UsersList;
