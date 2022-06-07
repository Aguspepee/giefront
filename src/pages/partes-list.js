import { Box, Container } from '@mui/material';
import { PartesListResults } from '../components/partes-list/partes-list-results';
import { DashboardLayout } from '../layout/layout';

function PartesList() {
  return (
    <>
      <DashboardLayout>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 3
          }}
        >
          <Container maxWidth={false}>
            <PartesListResults />
          </Container>
        </Box>
      </DashboardLayout>
    </>
  )
}

export default PartesList;