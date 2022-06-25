import { Box, Container } from '@mui/material';
import { RemitosListResults } from '../components/remitos-list/remitos-list-results';
import { DashboardLayout } from '../layout/layout';

function RemitosList() {
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
            <RemitosListResults />
          </Container>
        </Box>
      </DashboardLayout>
    </>
  )
}


export default RemitosList;
