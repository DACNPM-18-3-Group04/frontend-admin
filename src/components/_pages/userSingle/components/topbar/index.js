import {
  Toolbar,
  Container,
  Typography,
  Divider,
  Grid,
  Box,
  Breadcrumbs,
  Link,
  Stack,
} from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ToggleDisable from './toggleDisable';

const AlignCenter = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1),
}));

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

function UserSingleToolbar({
  userInfo = {},
  handleRefresh = () => {},
  onUpdateSuccess = () => {},
}) {
  const isUserAdmin = userInfo.user_type === 'A';
  let prevLink = {};
  if (isUserAdmin) {
    prevLink = {
      path: '/users/admin',
      text: 'Quản lý TK Admin',
    };
  } else {
    prevLink = {
      path: '/users',
      text: 'Quản lý TK người dùng',
    };
  }
  console.log(userInfo);
  return (
    <Container maxWidth='xl' component='div' disableGutters>
      <Toolbar>
        <Grid container>
          <Grid item md={8} xs={12}>
            <AlignCenter>
              <Breadcrumbs>
                <LinkRouter
                  underline='hover'
                  color='inherit'
                  to={prevLink.path}
                >
                  {prevLink.text}
                </LinkRouter>
              </Breadcrumbs>
              <Typography variant='subtitle1' component='div'>
                <b>/ {userInfo.full_name}</b>
              </Typography>
            </AlignCenter>
          </Grid>
          <Grid item md={4} xs={12}>
            <Stack
              direction='row'
              justifyContent='flex-end'
              alignItems='center'
              spacing={2}
            >
              <ToggleDisable
                userId={userInfo.id}
                status={userInfo.status}
                onSuccess={onUpdateSuccess}
              />
            </Stack>
          </Grid>
        </Grid>
      </Toolbar>
      <Divider />
    </Container>
  );
}

export default UserSingleToolbar;
