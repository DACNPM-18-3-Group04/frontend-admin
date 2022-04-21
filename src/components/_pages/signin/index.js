import { 
  Paper, Typography, Grid, Box
} from '@mui/material';
import { withRouter } from 'react-router-dom';
import SignInForm from './signInForm';

import EmptyLayout from '../../_layout/empty';

function SignInPage({ location }) {
  const locationState = location?.state;
  const redirect = locationState ? locationState.from : '/';
  
  return (
    <EmptyLayout>
      <Grid
        container
        spacing={0}
        // Center horizontal & vertical inner element
        direction='column'
        alignItems='center'
        justifyContent='center'
        style={{ minHeight: '90vh' }} //Parent content area min height
      >
        <Grid item xs={3}>
          <Box display='flex' justifyContent='center' mb={2}>
            <Typography variant='h5'><b>Propbook Admin</b></Typography>
          </Box>
          <Paper sx={{ width: 360, padding: 2 }}>            
            <SignInForm redirect={redirect}/>
          </Paper>
        </Grid>   
        
      </Grid> 
    </EmptyLayout>
  )
}

export default withRouter(SignInPage);
