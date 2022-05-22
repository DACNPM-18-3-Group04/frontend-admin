import { TextField, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';
import AdminLocationGraphQLAPI from '../../../../../../helpers/api/admin/locations/location.graphql';

// import AdminLocationAPI from '../../../../../../helpers/api/admin/locations';

const validationSchema = yup.object({
  districtName: yup.string().required('Bắt buộc'),
});

export default function SubDataAddForm({
  //
  dataId = '',
  onSuccess = () => {},
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (values) => {
    const submitData = {
      name: values.districtName,
      province_id: dataId,
    };
    setIsSubmitting(true);
    // AdminLocationAPI.addDistrict(submitData)
    AdminLocationGraphQLAPI.upsertDistrict({
      districtName: submitData.name,
      provinceId: submitData.province_id,
    })
      .then((res) => {
        toast.success('Tạo thành công');
        formik.resetForm();
        if (res.data.data?.upsertDistrict?.success)
          onSuccess(res.data.data?.upsertDistrict?.data);
      })
      .catch(() => {
        toast.error('Lỗi cập nhật');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      districtName: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id='districtName'
        name='districtName'
        label='Tên quận / huyện'
        margin='dense'
        value={formik.values.districtName}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.districtName)}
        helperText={formik.errors.districtName || ' '}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <LoadingButton
                loading={isSubmitting}
                variant='contained'
                type='submit'
                size='small'
              >
                Thêm
              </LoadingButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}
