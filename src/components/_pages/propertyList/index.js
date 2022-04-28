// EXAMPLE FILE
import { useState, useEffect } from 'react';

import AdminPropertiesAPI from '../../../helpers/api/admin/properties';
import LayoutContainer from './layoutContainer';
import DefaultLayout from '../../_layout/default';
import formatErrorResponse from '../../../helpers/utils/formatErrorResponse';

export default function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setProperties([]);
    setError(null);
    setIsLoaded(false);
    AdminPropertiesAPI.fetchAll()
      .then((res) => {
        setIsLoaded(true);
        if (res.data.success) {
          setProperties(res.data.data.properties);
        } else {
          throw new Error('Lỗi lấy danh sách');
        }
      })
      .catch((error) => {
        let res = formatErrorResponse(error);
        setIsLoaded(true);
        setError(res);
      });
  };

  const handleRefresh = () => {
    loadData();
  };

  const onUpdateSuccess = (id, newData) => {
    const index = properties.findIndex((x) => x.id === id);
    if (index === -1) {
      // Not found
      return;
    } else {
      setProperties([
        ...properties.slice(0, index),
        Object.assign({}, properties[index], newData),
        ...properties.slice(index + 1),
      ]);
    }
  };

  return (
    <DefaultLayout>
      <LayoutContainer
        error={error}
        isLoaded={isLoaded}
        data={properties}
        handleRefresh={handleRefresh}
        onUpdateSuccess={onUpdateSuccess}
      />
    </DefaultLayout>
  );
}
