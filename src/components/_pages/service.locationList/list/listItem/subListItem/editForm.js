import { TextField, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';
import AdminLocationGraphQLAPI from '../../../../../../helpers/api/admin/locations/location.graphql';

// import AdminLocationAPI from '../../../../../../helpers/api/admin/locations';

const validationSchema = yup.object({
  subDataName: yup.string().required('Bắt buộc'),
});

export default function SubDataEditForm({
  //
  data = {},
  onSuccess = () => {},
  provinceId,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (values) => {
    const id = data.id;
    const submitData = {
      name: values.subDataName,
    };
    setIsSubmitting(true);
    // AdminLocationAPI.updateDistrict(id, submitData)
    AdminLocationGraphQLAPI.upsertDistrict({
      districtName: submitData.name,
      provinceId: provinceId,
      id: id,
    })
      .then((res) => {
        toast.success('Chỉnh sửa thành công');
        onSuccess(id, res.data.data.district);
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
      subDataName: data.name || '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id='subDataName'
        name='subDataName'
        label='Tên quận / huyện'
        margin='dense'
        value={formik.values.subDataName}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.subDataName)}
        helperText={formik.errors.subDataName}
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
