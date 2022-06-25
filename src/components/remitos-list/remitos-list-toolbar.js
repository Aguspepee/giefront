import {
  Box,
  Button, IconButton, Tooltip, Typography
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Settings } from '@mui/icons-material';

export const PartesListToolbar = (props) => (
  <Box {...props}>
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        m: -1
      }}
    >
      <Typography
        sx={{ m: 1 }}
        variant="h4"
      >
        Parte Diario
        <Tooltip title="Editar campos">
          <IconButton sx={{ ml: 1 }} >
            <Settings fontSize="small" />
          </IconButton>
        </Tooltip>
      </Typography>

      <Box sx={{ m: 1 }}>
        {/*         <Button
          startIcon={(<UploadIcon fontSize="small" />)}
          sx={{ mr: 1 }}
        >
          Import
        </Button>
        <Button
          startIcon={(<DownloadIcon fontSize="small" />)}
          sx={{ mr: 1 }}
        >
          Export
        </Button> */}
        <Button
          color="primary"
          variant="contained"
          to='/partes-add'
          component={Link}
        >
          Nuevo Parte
        </Button>
        {/* <PartesListAdd/> */}
      </Box>
    </Box>
    {/* <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      color="action"
                      fontSize="small"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Buscar cliente"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box> */}
  </Box>
);
