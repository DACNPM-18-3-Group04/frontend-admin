import { TextField, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';

import AdminPropertiesAPI from '../../../../../../helpers/api/admin/properties';

const validationSchema = yup.object({
  price: yup.number().moreThan(0, 'Lớn hơn 0').required('Bắt buộc'),
  area: yup.number().moreThan(0, 'Lớn hơn 0').required('Bắt buộc'),
});

export default function PropertyEditForm({
  dataInfo = {},
  onSuccess = () => {},
  onFailed = () => {},
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (values) => {
    const dataId = dataInfo.id;
    const submitData = {
      ...values,
    };
    setIsSubmitting(true);
    AdminPropertiesAPI.edit(dataId, submitData)
      .then((res) => {
        toast.success('Cập nhật thành công');
        onSuccess(submitData);
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
      price: dataInfo.price || 0,
      area: dataInfo.area || 0,
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id='price'
        name='price'
        label='Giá (VNĐ)'
        margin='dense'
        type='number'
        value={formik.values.price}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.price)}
        helperText={formik.errors.price || ' '}
      />
      <TextField
        fullWidth
        id='area'
        name='area'
        label='Diện tích (m2)'
        margin='dense'
        type='number'
        value={formik.values.area}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.area)}
        helperText={formik.errors.area || ' '}
      />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <LoadingButton loading={isSubmitting} variant='contained' type='submit'>
          Lưu thay đổi
        </LoadingButton>
      </Box>
    </form>
  );
}
