import { TextField, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';

import AdminLocationAPI from '../../../../../helpers/api/admin/locations';

const validationSchema = yup.object({
  dataName: yup.string().required('Bắt buộc'),
});

export default function DataEditForm({
  //
  data = {},
  onSuccess = () => {},
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (values) => {
    const id = data.id;
    const submitData = {
      name: values.dataName,
    };
    setIsSubmitting(true);
    AdminLocationAPI.updateProvince(id, submitData)
      .then((res) => {
        toast.success('Chỉnh sửa thành công');
        console.log(res.data);
        onSuccess(id, res.data.data.province);
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
      dataName: data.name || '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id='dataName'
        name='dataName'
        label='Tên tỉnh / thành phố'
        margin='dense'
        value={formik.values.dataName}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.dataName)}
        helperText={formik.errors.dataName}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <LoadingButton
                loading={isSubmitting}
                variant='contained'
                type='submit'
                size='small'
              >
                Lưu
              </LoadingButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}
