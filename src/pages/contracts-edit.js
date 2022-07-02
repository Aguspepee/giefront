import { useState, useEffect } from 'react';
import { Box, Container, Card, Paper, Fab, Tooltip, Typography } from '@mui/material';
//import ContractsEditItems from '../components/contracts-edit/contracts-edit-items';
import { DashboardLayout } from '../layout/layout';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import SaveIcon from '@mui/icons-material/Save';
import { contractOne } from "../services/contracts";
import { useParams } from "react-router-dom";
import ContractsEditGenerales from '../components/contracts-edit/contracts-edit-generales';
import ContractsEditUnidades from '../components/contracts-edit/contracts-edit-unidades';
import ContractsEditCertificantes from '../components/contracts-edit/contracts-edit-certificantes';
import ContractsEditCampos from '../components/contracts-edit/contracts-edit-campos';
import ContractsEditItems from '../components/contracts-edit/contracts-edit-items';

function EditContract() {
  let { id } = useParams();
  const [data, setData] = useState([])

  //Tabs
  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    async function getData() {
      try {
        const document = await contractOne(id)
        setData(document.data[0])
        console.log(document)
      } catch (e) {
        console.log(e)
      }
    }
    getData()
  }, [id])

  return (
    <DashboardLayout>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Editar Contrato
          </Typography>
          <TabContext value={value}>
            <Card >
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'space-between',
                      // flexWrap: 'wrap',

                    }}
                  >
                    <TabList onChange={handleChange}
                      aria-label="lab API tabs example"
                      variant="scrollable"
                      scrollButtons="auto"
                      value={value}>
                      <Tab label="Datos Generales" value="1" />
                      <Tab label="Ítems del contrato" value="2" />
                      <Tab label="Unidades" value="3" />
                      <Tab label="Certificantes" value="4" />
                      <Tab label="Campos" value="5" />
                    </TabList>
                    <Box sx={{ m: 1 }}>
                      <Tooltip title="Guardar cambios">
                        <Fab size="small" color="primary" type="submit" form={`myform${value}`} value="Update">
                          <SaveIcon />
                        </Fab>
                      </Tooltip>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Card>
            <Paper sx={{ overflowX: "auto", width: "100%", }}>
              <TabPanel value="1">
                <ContractsEditGenerales data={data} />
              </TabPanel>
              <TabPanel value="2" style={{ padding: "0em 0em 1em 0em" }}>
                <ContractsEditItems data={data} />
              </TabPanel>
              <TabPanel value="3" style={{ padding: "0em 0em 1em 0em" }}>
                <ContractsEditUnidades data={data} />
              </TabPanel>
              <TabPanel value="4">
                <ContractsEditCertificantes data={data} />
              </TabPanel>
              <TabPanel value="5">
                <ContractsEditCampos data={data} />
              </TabPanel>
            </Paper>
          </TabContext>
        </Container>
      </Box>
    </DashboardLayout >

  )
}

export default EditContract;
