// EXAMPLE FILE
import { useState, useEffect } from 'react';

import AdminUsersAPI from '../../../helpers/api/admin/users';
import UserLayoutContainer from './layoutContainer';
import DefaultLayout from '../../_layout/default';
import formatErrorResponse from '../../../helpers/utils/formatErrorResponse';

export default function UserAccountList() {
  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setUsers([]);
    setError(null);
    setIsLoaded(false);
    AdminUsersAPI.fetchAll()
    .then(
      (res) => {
        setIsLoaded(true);
        if (res.data.success) {
          setUsers(res.data.data.users);
        }
        else {
          throw new Error('Lỗi lấy danh sách')
        }        
      },
    )
    .catch(
      (error) => {
        let res = formatErrorResponse(error);
        setIsLoaded(true);
        setError(res);
      }
    )
  }

  const handleRefresh = () => {
    loadData()
  }

  const onUpdateSuccess = (id, newData) => {
    const index = users.findIndex(x => x.id === id);
    if (index === -1) {
      // Not found
      return;
    }
    else {
      setUsers([
        ...users.slice(0,index),
        Object.assign({}, users[index], newData),
        ...users.slice(index + 1),
      ])
    }
  }

  return (
    <DefaultLayout>
      <UserLayoutContainer
        error={error}
        isLoaded={isLoaded}
        users={users}
        handleRefresh={handleRefresh}
        onUpdateSuccess={onUpdateSuccess}
      />
    </DefaultLayout>
  )
}
