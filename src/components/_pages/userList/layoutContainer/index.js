import { Button } from '@mui/material';

import ErrorPage from '../../../_common/error';
import Loader from '../../../_common/loader';
import UserListToolbar from '../topBar';
import UserListTable from '../usersTable';

function UserLayoutContainer({
  error, isLoaded, users, 
  handleRefresh = () => {},
  onUpdateSuccess = () => {}
}) {
  if (error) {
    return <ErrorPage 
      code = {error.status}
      title = {error.title}
      details = {error.details}
      message = {error.message}
      backToHome = {false}>
        <Button onClick={handleRefresh}>Tải lại</Button>
      </ErrorPage>;
  } else if (!isLoaded) {
    return <Loader/>;
  } else {
    return (
      <>
        <UserListToolbar handleRefresh={handleRefresh}/>
        <UserListTable 
          userData={users}
          handleRefresh={handleRefresh}
          onUpdateSuccess={onUpdateSuccess}
        />
      </>
    );
  }
}

export default UserLayoutContainer;
