import { Box, Container } from '@mui/material';
import { UsersListResults } from '../components/users-list/users-list-results';
import { UsersListToolbar } from '../components/users-list/users-list-toolbar';
import { DashboardLayout } from '../layout/layout';
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
