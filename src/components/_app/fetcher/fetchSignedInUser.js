import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Loader from '../../_common/loader';

import { signIn } from '../../../redux/slices/user';
import {
  USER_INFO_CACHE_NAME,
  ACCESS_TOKEN_NAME,
} from '../../../helpers/constants/auth';

export default function FetchSignedInUser({ children }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    const userInfoString = localStorage.getItem(USER_INFO_CACHE_NAME) || null;
    const token = localStorage.getItem(ACCESS_TOKEN_NAME) || '';
    if (userInfoString) {
      try {
        let userInfo = JSON.parse(userInfoString);
        userInfo.token = token;
        dispatch(signIn(userInfo));
      } catch (parseError) { /* ignored */}
    }
    setIsLoading(false);
  }, [dispatch]);

  if (isLoading) {
    return <Loader label='Tải thông tin đăng nhập'/>
  }
  return children;
}
