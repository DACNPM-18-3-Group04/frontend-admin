import { Button } from '@mui/material';

import ErrorPage from '../../../_common/error';
import Loader from '../../../_common/loader';
import ListToolbar from '../topBar';
import DataList from '../list';

export default function LayoutContainer({
  error,
  isLoaded,
  data,
  onAddDataSuccess = () => {},
  onEditDataSuccess = () => {},
  handleRefresh = () => {},
  onAddSubDataSuccess = () => {},
  onEditSubDataSuccess = () => {},
  handleDeleteSubData = () => {},
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
        <DataList
          data={data}
          onAddDataSuccess={onAddDataSuccess}
          onEditDataSuccess={onEditDataSuccess}
          handleRefresh={handleRefresh}
          onAddSubDataSuccess={onAddSubDataSuccess}
          onEditSubDataSuccess={onEditSubDataSuccess}
          handleDeleteSubData={handleDeleteSubData}
        />
      </>
    );
  }
}
