import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import {
  updateProvince,
  addDistrict,
  updateDistrict,
  removeDistrict,
} from '../../../redux/slices/propertyLocation';

// import AdminLocationAPI from '../../../helpers/api/admin/locations';
// import formatErrorResponse from '../../../helpers/utils/formatErrorResponse';
import LayoutContainer from './layoutContainer';
import DefaultLayout from '../../_layout/default';
import AdminLocationGraphQLAPI from '../../../helpers/api/admin/locations/location.graphql';

export default function SubServiceLocationList() {
  const [locations, setLocations] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLocations([]);
    setError(null);
    setIsLoaded(false);
    // AdminLocationAPI.fetchAll()
    AdminLocationGraphQLAPI.fetchAll()
      .then((res) => {
        setIsLoaded(true);
        // if (res.data.success) {
        //   setLocations(res.data.data.provinces);
        // } else {
        //   throw new Error('Lỗi lấy danh sách');
        // }
        if (res.data.data.provinces?.success) {
          setLocations(res.data.data.provinces.data);
        } else {
          throw new Error('Lỗi lấy danh sách');
        }
      })
      .catch((error) => {
        // let res = formatErrorResponse(error);
        // setError(res);
        setIsLoaded(true);
        console.log(error.response.data.errors[0]?.message);
      });
  };

  const handleRefresh = () => {
    loadData();
  };

  const onAddDataSuccess = (newData = {}) => {
    const formattedData = {
      id: newData.id,
      name: newData.name,
      districts: [],
    };
    setLocations([...locations, formattedData]);
  };

  const onEditDataSuccess = (id, newData) => {
    const index = locations.findIndex((x) => x.id === id);
    if (index === -1) {
      // Not found
      return;
    }
    setLocations([
      ...locations.slice(0, index),
      Object.assign({}, locations[index], newData),
      ...locations.slice(index + 1),
    ]);
    // Update local redux data
    dispatch(
      updateProvince({
        provinceId: id,
        provinceName: newData.name,
      }),
    );
  };

  const onAddSubDataSuccess = (dataId, newData) => {
    const index = locations.findIndex((x) => x.id === dataId);

    if (index < 0) return;
    const data = { ...locations[index] };

    const districts = data.districts || [];
    const formattedNewData = {
      ...newData,
    };

    data.districts = [...districts, formattedNewData];

    setLocations([
      ...locations.slice(0, index),
      Object.assign({}, locations[index], data),
      ...locations.slice(index + 1),
    ]);

    // Update local redux data
    dispatch(
      addDistrict({
        id: newData.id,
        name: newData.name,
        provinceId: dataId,
        provinceName: data.name,
      }),
    );
  };

  const onUpdateSubDataSuccess = (dataId, subDataId, newData) => {
    const index = locations.findIndex((x) => x.id === dataId);

    if (index < 0) return;
    const data = { ...locations[index] };

    const districts = data.districts || [];
    const subIndex = districts.findIndex((x) => x.id === subDataId);
    if (subIndex < 0) return;

    data.districts = [
      ...districts.slice(0, subIndex),
      Object.assign({}, districts[subIndex], newData),
      ...districts.slice(subIndex + 1),
    ];

    setLocations([
      ...locations.slice(0, index),
      Object.assign({}, locations[index], data),
      ...locations.slice(index + 1),
    ]);
    // Update local redux data
    dispatch(
      updateDistrict({
        id: newData.id,
        name: newData.name,
      }),
    );
  };

  const onDeleteSubData = (dataId, subDataId) => {
    const index = locations.findIndex((x) => x.id === dataId);

    if (index < 0) return;
    const data = { ...locations[index] };

    const districts = data.districts || [];
    const subIndex = districts.findIndex((x) => x.id === subDataId);
    if (subIndex < 0) return;

    data.districts = [
      ...districts.slice(0, subIndex),
      ...districts.slice(subIndex + 1),
    ];

    setLocations([
      ...locations.slice(0, index),
      Object.assign({}, locations[index], data),
      ...locations.slice(index + 1),
    ]);
    // Update local redux data
    dispatch(
      removeDistrict({
        id: subDataId,
      }),
    );
  };

  const handleDeleteSubData = (dataId, subDataId) => {
    const toastLoadingId = toast.loading('Đang thực hiện thao tác');
    // AdminLocationAPI.removeDistrict(subDataId)
    AdminLocationGraphQLAPI.removeDistrict(subDataId)
      .then((res) => {
        toast.success('Vô hiệu thành công');
        onDeleteSubData(dataId, subDataId);
      })
      .catch(() => {
        toast.error('Lỗi thao tác');
      })
      .finally(() => {
        toast.dismiss(toastLoadingId);
      });
  };

  return (
    <DefaultLayout>
      <LayoutContainer
        error={error}
        isLoaded={isLoaded}
        data={locations}
        onAddDataSuccess={onAddDataSuccess}
        onEditDataSuccess={onEditDataSuccess}
        handleRefresh={handleRefresh}
        onAddSubDataSuccess={onAddSubDataSuccess}
        onEditSubDataSuccess={onUpdateSubDataSuccess}
        handleDeleteSubData={handleDeleteSubData}
      />
    </DefaultLayout>
  );
}
