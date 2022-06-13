import { Box, Container } from '@mui/material';
import { useState,useEffect } from 'react';
import { UsersListResults } from '../components/users-list/users-list-results';
import UsersListToolbar from '../components/users-list/users-list-toolbar';
import { DashboardLayout } from '../layout/layout';
import { userGetAll, userSearch } from '../services/users';

function UsersList() {
  const [reload, setReload] = useState(false)
  const [search, setSearch] = useState("")
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function getList() {
      try {
        const users = await userSearch(search)
        setUsers(users.data)
      } catch (error) {
        console.log(error)
      }
    }
    getList()
  }, [reload,search])

  const handleReload = () => {
    console.log("llamo")
    setReload(!reload)
  }
  const handleSearchChange = (value) => {
    console.log(value)
    setSearch(value)
  }

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
            <UsersListToolbar handleReload={handleReload} handleSearchChange={handleSearchChange}/>
            <Box sx={{ mt: 3 }}>
              <UsersListResults handleReload={handleReload} users={users} />
            </Box>
          </Container>
        </Box>
      </DashboardLayout>
    </>
  )
}

export default UsersList;
