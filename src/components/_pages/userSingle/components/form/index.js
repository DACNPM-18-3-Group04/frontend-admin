import { Box, Paper, Container, Typography, Grid } from '@mui/material';
import UserEditForm from './accountForm/inputForm';
import AccountTypeEditForm from './accountTypeForm/inputForm';
import UserContactEditForm from './contactForm/inputForm';
import UserResetPwdForm from './resetPwdForm';

export default function UserEditFormPanel({
  userInfo = {},
  handleRefresh = () => {},
  onUpdateSuccess = () => {},
}) {
  return (
    <Container maxWidth='xl'>
      <Grid container spacing={2}>
        <Grid
          item
          container
          lg={8}
          xs={12}
          order={{ xs: 2, lg: 1 }}
          spacing={1}
        >
          <Grid item xs={12}>
            <Paper>
              <Box padding={2}>
                <Typography>Chỉnh sửa thông tin tài khoản</Typography>
                <Box>
                  <UserEditForm
                    userInfo={userInfo}
                    onSuccess={onUpdateSuccess}
                  />
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <Box padding={2}>
                <Typography>Chỉnh sửa thông tin liên hệ</Typography>
                <Box>
                  <UserContactEditForm
                    userInfo={userInfo}
                    onSuccess={onUpdateSuccess}
                  />
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <Box padding={2}>
                <Typography>Chỉnh sửa loại tài khoản</Typography>
                <Box>
                  <AccountTypeEditForm userInfo={userInfo} />
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Grid
          item
          lg={4}
          xs={12}
          order={{ xs: 1, lg: 2 }}
          container
          spacing={1}
        >
          <Grid item xs={12}>
            <Paper>
              <Box padding={2}>
                <Typography>Reset mật khẩu</Typography>
                <Box>
                  <UserResetPwdForm userInfo={userInfo} />
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
