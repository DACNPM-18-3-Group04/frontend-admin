import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/slices/user';

import { useHistory } from 'react-router-dom';

import DefaultLayout from '../../_layout/default';
import LayoutContainer from './components/layoutContainer';

import AdminUsersAPI from '../../../helpers/api/admin/users';
import { toast } from 'react-toastify';

export default function UserSingle() {
  const { userId } = useParams();
  const loginUser = useSelector(selectUser);
  const history = useHistory();

  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId === loginUser.id.toString()) {
      toast.warning('Không thể chỉnh sửa tài khoản hiện tại đang đăng nhập');
      history.push('/users/admin');
    }
    else {
      loadData(userId);
    }
  }, [userId, history, loginUser]);

  const loadData = (userId) => {
    setUser({});
    setError(null);
    setIsLoading(true);
    AdminUsersAPI.fetchUserById(userId)
    .then((res) => {
      if (res.data.success) {
        setUser(res.data.data);
      } else {
        throw new Error(res.data.message);
      }
    })
    .catch((error) => {
      let err = {};
      if (error.response) {
        if (error.response.data) {
          err.status = error.response.status;
          err.message = error.response.data.message;
        } else {
          //Incase cannot request to server
          err.message = error.response.message;
        }
      } else {
        err.message = error.message;
      }
      setError(err);
    })
    .finally(() => setIsLoading(false));
  }

  const handleRefresh = () => loadData(userId);
  const onUpdateSuccess = (updateInfo) => {
    setUser(Object.assign({}, user, updateInfo));
  }

  return (
    <DefaultLayout>
      <LayoutContainer
        user={user}
        isLoading={isLoading}
        error={error}
        handleRefresh={handleRefresh}
        onUpdateSuccess={onUpdateSuccess}
      />
    </DefaultLayout>
  )
}
