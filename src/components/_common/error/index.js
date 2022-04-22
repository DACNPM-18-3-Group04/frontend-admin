import { Container, Grid, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

/**
 * Display an empty page to signify an error had occured
 * @param {*} code Error status code
 * @param {*} title Error title
 * @param {*} details Error details
 * @param {*} message Error message (Will be ignored if details is present)
 * @param {*} children Additional
 * @param {boolean} backToHome Display back to home button
 * @returns React Component
 */
function ErrorPage({
  code,
  title,
  details,
  message = null,
  children = null,
  backToHome = true,
  minHeight = '90vh',
}) {
  return (
    <Container>
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justifyContent='center'
        style={{ minHeight: minHeight /* Layout height */ }}
      >
        <Grid item xs={3}>
          <Box>
            <h1>{code}</h1>
            <h2>{title}</h2>
            <p>{details ? details : message}</p>
            {children}
            {backToHome ? (
              <Button variant='contained' component={Link} to='/'>
                Trang chủ
              </Button>
            ) : (
              <div />
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ErrorPage;
