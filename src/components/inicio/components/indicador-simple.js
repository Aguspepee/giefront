import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';

export const IndicadorSimple = ({ value, subvalue, title, description, Icon, backgroundColor, ...props }) => (
  <Card {...props} style={{ height: "100%" }}>
    <CardContent>
      <Grid
        container
        spacing={1}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item style={{width:'60%'}}>
          <Typography
            color="textSecondary"
            //gutterBottom
            variant="h6"
            style={{ padding: "0em 0em 0em 0em", fontSize:"0.75em"}}
          >
            {(title).toUpperCase()}
          </Typography>

          <Typography
            color="textPrimary"
            variant="h4"
          >
            {value !== undefined && value}
            {value === undefined && 0}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: backgroundColor,
              height: 40,
              width: 40
            }}
          >
            {Icon && <Icon />}
            {!Icon && <PeopleIcon />}
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
