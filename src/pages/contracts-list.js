import { Box, Container } from '@mui/material';
import { useState, useEffect } from 'react';
import { ContractsListResults } from '../components/contracts-list/contracts-list-results';
import ContractsListToolbar from '../components/contracts-list/contracts-list-toolbar';
import { DashboardLayout } from '../layout/layout';
import { contractSearch } from '../services/contracts';

function ContractsList() {
  const [reload, setReload] = useState(false)
  const [search, setSearch] = useState("")
  const [contracts, setContracts] = useState([])

  useEffect(() => {
    async function getList() {
      try {
        const contracts = await contractSearch(search)
        setContracts(contracts.data)
      } catch (error) {
        console.log(error)
      }
    }
    getList()
  }, [reload, search])

  const handleReload = () => {
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
            <ContractsListToolbar handleReload={handleReload} handleSearchChange={handleSearchChange} />
            <Box sx={{ mt: 3 }}>
              <ContractsListResults handleReload={handleReload} contracts={contracts} />
            </Box>
          </Container>
        </Box>
      </DashboardLayout>
    </>
  )
}

export default ContractsList;
