import { Container, Box } from '@mui/material';
import Loader from '../../../../_common/loader';
import ErrorPage from '../../../../_common/error';
import UserEditFormPanel from '../form';
import UserSingleToolbar from '../topbar';

function LayoutContainer({
  error,
  isLoading,
  user = {},
  handleRefresh = () => {},
  onUpdateSuccess = () => {},
}) {
  if (error) {
    return (
      <ErrorPage
        code={error.status}
        title={error.title}
        details={error.details}
        message={error.message}
      />
    );
  } else if (isLoading) {
    return <Loader />;
  } else {
    return (
      <Container maxWidth='xl'>
        <UserSingleToolbar
          userInfo={user}
          handleRefresh={handleRefresh}
          onUpdateSuccess={onUpdateSuccess}
        />
        <Box mt={2}>
          <UserEditFormPanel
            userInfo={user}
            handleRefresh={handleRefresh}
            onUpdateSuccess={onUpdateSuccess}
          />
        </Box>
      </Container>
    );
  }
}

export default LayoutContainer;
