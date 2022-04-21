import {Toolbar, Container, IconButton, Typography, Divider, Stack} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import NewAdminUserModal from '../dialogAddNew';

function AdminListToolbar({
  handleRefresh = () => {}
}) {
  return (
    <Container 
      maxWidth='xl' 
      component='div'
      disableGutters
    >
      <Container maxWidth='xl' disableGutters>
        <Toolbar>
          <Typography
            variant='h5'
            component='div'
            sx={{ flexGrow: 1}}
          >
            Danh sách TK Admin
          </Typography>
          <Stack direction='row' spacing={1}>
            <IconButton
              color='defaultColor'
              onClick={handleRefresh}
            >
              <RefreshIcon/>
            </IconButton>
            <NewAdminUserModal
              onSuccess={handleRefresh}
            />
          </Stack>
        </Toolbar>
      </Container>
      <Divider/>
    </Container>
  )
}

export default AdminListToolbar;