import { Button } from '@mui/material';

import ErrorPage from '../../../_common/error';
import Loader from '../../../_common/loader';
import ListToolbar from '../topBar';
import ListTable from '../table';

export default function LayoutContainer({
  error,
  isLoaded,
  data,
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
        backToHome={false}
      >
        <Button onClick={handleRefresh}>Tải lại</Button>
      </ErrorPage>
    );
  } else if (!isLoaded) {
    return <Loader />;
  } else {
    return (
      <>
        <ListToolbar handleRefresh={handleRefresh} />
        <ListTable
          data={data}
          handleRefresh={handleRefresh}
          onUpdateSuccess={onUpdateSuccess}
        />
      </>
    );
  }
}
