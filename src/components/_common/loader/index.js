import {
  Container,
  Grid,
  Box,
  CircularProgress,
  useTheme,
} from '@mui/material';

function Loader({ label = 'Đang tải' }) {
  const theme = useTheme();
  return (
    <Container>
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justifyContent='center'
      >
        <Grid item xs={3}>
          <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='enter'
            style={{ marginTop: theme.spacing(2) }}
          >
            <CircularProgress color='secondary' />
            <p>{label}</p>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Loader;
