import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';

export const TotalCustomers = ({value,subvalue,title,description, icon, ...props}) => (
  <Card {...props} style={{height:"100%"}}>
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
         
          <Typography
            color="textSecondary"
            //gutterBottom
            variant="overline"
            style={{padding:"0em 0em 0em 0em"}}
          >
            {title}
          </Typography>
         
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {value}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 56,
              width: 56
            }}
          >
            <PeopleIcon />
          </Avatar>
        </Grid>
      </Grid>
{/*       <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          pt: 2
        }}
      >
        <ArrowUpwardIcon color="success" />
        <Typography
          variant="body2"
          sx={{
            mr: 1
          }}
        >
          {subvalue}%
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Since last month
        </Typography>
      </Box> */}
    </CardContent>
  </Card>
);
