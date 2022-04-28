import { TextField, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';

import AdminUsersAPI from '../../../../../../helpers/api/admin/users';
import { ACCOUNT_TYPE } from '../../../../../../helpers/constants';

const validationSchema = yup.object({
  account_type: yup.string().required('Bắt buộc'),
});

export default function AccountTypeEditForm({
  userInfo = {
    account_type: ACCOUNT_TYPE.USER,
  },
  onSuccess = () => {},
  onFailed = () => {},
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (values) => {
    const userId = userInfo.id;
    const submitData = {
      ...values,
    };
    setIsSubmitting(true);
    AdminUsersAPI.editUser(userId, submitData)
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
      account_type: userInfo.account_type,
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id='account_type'
        name='account_type'
        label='Loại tài khoản'
        margin='dense'
        select
        value={formik.values.account_type}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.account_type)}
        helperText={formik.errors.account_type || ' '}
      >
        <MenuItem value={ACCOUNT_TYPE.ADMIN}>Admin</MenuItem>
        <MenuItem value={ACCOUNT_TYPE.USER}>User thường</MenuItem>
      </TextField>
      <LoadingButton
        loading={isSubmitting}
        variant='contained'
        fullWidth
        type='submit'
      >
        Lưu thay đổi
      </LoadingButton>
    </form>
  );
}
