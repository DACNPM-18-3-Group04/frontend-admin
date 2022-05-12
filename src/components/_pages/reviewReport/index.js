// EXAMPLE FILE
import { useState, useEffect } from 'react';

import LayoutContainer from './layoutContainer';
import DefaultLayout from '../../_layout/default';
import { getReviewReportList } from '../../../helpers/api/contact/reviewReport';
import formatErrorResponse from '../../../helpers/utils/formatErrorResponse';

export default function ReviewReport() {
  const [rv, setRvReports] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setRvReports([]);
    let isMounted = true;
    setError(null);
    getReviewReportList()
      .then((res) => {
        if (isMounted) {
          setRvReports(res.data.reports);
          setIsLoaded(true);
        }
      })
      .catch((err) => {
        setError(formatErrorResponse(err));
        setIsLoaded(true);
      });
  };

  const handleRefresh = () => {
    loadData();
  };

  const onUpdateSuccess = (id, newData) => {
    const index = rv.findIndex((x) => x.id === id);
    if (index === -1) {
      // Not found
      return;
    } else {
      setRvReports([
        ...rv.slice(0, index),
        Object.assign({}, rv[index], newData),
        ...rv.slice(index + 1),
      ]);
    }
  };

  return (
    <DefaultLayout>
      <LayoutContainer
        error={error}
        isLoaded={isLoaded}
        data={rv}
        handleRefresh={handleRefresh}
        onUpdateSuccess={onUpdateSuccess}
      />
    </DefaultLayout>
  );
}
