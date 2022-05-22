import { TextField, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';
import AdminLocationGraphQLAPI from '../../../../helpers/api/admin/locations/location.graphql';

// import AdminLocationAPI from '../../../../helpers/api/admin/locations';

const validationSchema = yup.object({
  provinceName: yup.string().required('Bắt buộc'),
});

export default function DataAddForm({
  //
  onSuccess = () => {},
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (values) => {
    const submitData = {
      name: values.provinceName,
    };
    setIsSubmitting(true);
    // AdminLocationAPI.addProvince(submitData)
    AdminLocationGraphQLAPI.upsertProvince({ provinceName: submitData.name })
      .then((res) => {
        toast.success('Tạo thành công');
        formik.resetForm();
        if (res.data.data?.upsertProvince?.success)
          onSuccess(res.data.data?.upsertProvince?.data);
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
      provinceName: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id='provinceName'
        name='provinceName'
        label='Tên tỉnh / thành phố'
        margin='dense'
        value={formik.values.provinceName}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.provinceName)}
        helperText={formik.errors.provinceName || ' '}
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
