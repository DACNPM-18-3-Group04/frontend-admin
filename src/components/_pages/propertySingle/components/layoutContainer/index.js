import { Container, Box } from '@mui/material';
import Loader from '../../../../_common/loader';
import ErrorPage from '../../../../_common/error';
import EditFormPanel from '../form';
import SingleToolbar from '../topbar';

function LayoutContainer({
  error,
  isLoading,
  data = {},
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
        <SingleToolbar
          dataInfo={data}
          handleRefresh={handleRefresh}
          onUpdateSuccess={onUpdateSuccess}
        />
        <Box mt={2}>
          <EditFormPanel
            dataInfo={data}
            handleRefresh={handleRefresh}
            onUpdateSuccess={onUpdateSuccess}
          />
        </Box>
      </Container>
    );
  }
}

export default LayoutContainer;
