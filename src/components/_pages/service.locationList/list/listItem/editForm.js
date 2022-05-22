import { TextField, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';
import AdminLocationGraphQLAPI from '../../../../../helpers/api/admin/locations/location.graphql';

// import AdminLocationAPI from '../../../../../helpers/api/admin/locations';

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
    // AdminLocationAPI.updateProvince(id, submitData)
    AdminLocationGraphQLAPI.upsertProvince({
      id: id,
      provinceName: submitData.name,
    })
      .then((res) => {
        toast.success('Chỉnh sửa thành công');
        console.log(res.data);
        if (res.data.data?.upsertProvince?.success)
          onSuccess(id, res.data.data?.upsertProvince?.data);
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
