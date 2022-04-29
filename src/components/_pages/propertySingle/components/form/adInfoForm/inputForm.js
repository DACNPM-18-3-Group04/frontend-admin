import { TextField, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';

import AdminPropertiesAPI from '../../../../../../helpers/api/admin/properties';

const validationSchema = yup.object({
  title: yup
    .string()
    .min(10, 'Tối thiểu 10 ký tự')
    .max(100, 'Tối đa 100 ký tự')
    .required('Bắt buộc'),
  description: yup.string().max(500, 'Tối đa 500 ký tự').required('Bắt buộc'),
});

export default function AdInfoEditForm({
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
      title: dataInfo.title || '',
      description: dataInfo.description || '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id='title'
        name='title'
        label='Tiêu đề'
        margin='dense'
        value={formik.values.title}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.title)}
        helperText={formik.errors.title || ' '}
      />
      <TextField
        fullWidth
        id='description'
        name='description'
        label='Mô tả'
        margin='dense'
        multiline
        minRows={2}
        value={formik.values.description}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.description)}
        helperText={formik.errors.description || ' '}
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
