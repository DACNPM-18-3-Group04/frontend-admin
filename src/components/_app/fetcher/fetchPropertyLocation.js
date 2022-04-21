import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { updateLocationInfo } from '../../../redux/slices/propertyLocation';
import UtilAPI from '../../../helpers/api/utils';

export default function FetchPropertyLocation() {
  const dispatch = useDispatch();
  useEffect(() => {
    UtilAPI.getPropertyLocations()
      .then((res) => {
        dispatch(updateLocationInfo(res.data.data));
      })
      .catch((err) => {
        toast.error(`Lỗi tải thông tin vị trí - ${err.message}`);
      });
  }, [dispatch]);

  return <></>;
}
