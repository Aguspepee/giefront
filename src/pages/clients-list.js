import { Box, Container } from '@mui/material';
import { useState, useEffect } from 'react';
import { ClientsListResults } from '../components/clients-list/clients-list-results';
import ClientsListToolbar from '../components/clients-list/clients-list-toolbar';
import { DashboardLayout } from '../layout/layout';
import { clientGetAll, clientSearch } from '../services/clients';

function ClientsList() {
  const [reload, setReload] = useState(false)
  const [search, setSearch] = useState("")
  const [clients, setClients] = useState([])

  useEffect(() => { 
    async function getList() {
      try {
        const clients = await  clientSearch(search)
        setClients(clients.data)
      } catch (error) {
        console.log(error)
      }
    }
    getList()
  }, [reload, search])

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
            <ClientsListToolbar handleReload={handleReload} handleSearchChange={handleSearchChange} />
            <Box sx={{ mt: 3 }}>
              <ClientsListResults handleReload={handleReload} clients={clients} />
            </Box>
          </Container>
        </Box>
      </DashboardLayout>
    </>
  )
}

export default ClientsList;
