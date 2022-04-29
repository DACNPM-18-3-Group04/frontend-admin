import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import LayoutContainer from './components/layoutContainer';

import AdminPropertiesAPI from '../../../helpers/api/admin/properties';
// import { toast } from 'react-toastify';
import formatErrorResponse from '../../../helpers/utils/formatErrorResponse';

export default function PropertySingle() {
  const { propertyId } = useParams();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData(propertyId);
  }, [propertyId]);

  const loadData = (dataId) => {
    setData({});
    setError(null);
    setIsLoading(true);
    AdminPropertiesAPI.fetchById(dataId)
      .then((res) => {
        if (res.data.success) {
          setData(res.data.data.property);
        } else {
          throw new Error(res.data.message);
        }
      })
      .catch((error) => {
        let err = formatErrorResponse(error);
        setError(err);
      })
      .finally(() => setIsLoading(false));
  };

  const handleRefresh = () => loadData(propertyId);
  const onUpdateSuccess = (updateInfo) => {
    setData(Object.assign({}, data, updateInfo));
  };

  return (
    <LayoutContainer
      data={data}
      isLoading={isLoading}
      error={error}
      handleRefresh={handleRefresh}
      onUpdateSuccess={onUpdateSuccess}
    />
  );
}
