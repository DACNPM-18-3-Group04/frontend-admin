import { Box, Paper, Container, Typography, Grid } from '@mui/material';
import UserEditForm from './inputForm';
import UserResetPwdForm from './resetPwdForm';

export default function UserEditFormPanel({
  userInfo = {},
  handleRefresh = () => {},
  onUpdateSuccess = () => {},
}) {
  return (
    <Container maxWidth='xl'>
      <Grid container spacing={2}>
        <Grid item lg={8} xs={12} order={{ xs: 2, lg: 1 }}>
          <Paper>
            <Box padding={2}>
              <Typography>Chỉnh sửa thông tin</Typography>
              <Box>
                <UserEditForm userInfo={userInfo} onSuccess={onUpdateSuccess} />
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item lg={4} xs={12} order={{ xs: 1, lg: 2 }}>
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
    </Container>
  );
}
