import {
  Toolbar,
  Container,
  IconButton,
  Typography,
  Divider,
  Stack,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddModal from '../dialogAddNew';

export default function Topbar({ handleRefresh = () => {} }) {
  return (
    <Container maxWidth='xl' component='div' disableGutters>
      <Container maxWidth='xl' disableGutters>
        <Toolbar>
          <Typography variant='h5' component='div' sx={{ flexGrow: 1 }}>
            Danh sách TK
          </Typography>
          <Stack direction='row' spacing={1}>
            <IconButton color='defaultColor' onClick={handleRefresh}>
              <RefreshIcon />
            </IconButton>
            <AddModal onSuccess={handleRefresh} />
          </Stack>
        </Toolbar>
      </Container>
      <Divider />
    </Container>
  );
}
