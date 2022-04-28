import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';

import AdminUsersAPI from '../../../../../../helpers/api/admin/users';

const validationSchema = yup.object({
  username: yup
    .string('Nhập username/ email đăng nhập')
    .min(5, 'Tổi thiểu 5 kí tự')
    .required('Bắt buộc'),
  fullname: yup
    .string('Nhập họ tên')
    .min(6, 'Tối thiểu 6 ký tự')
    .max(30, 'Tối đa 30 ký tự')
    .required('Bắt buộc'),
});

export default function UserEditForm({
  userInfo = {},
  onSuccess = () => {},
  onFailed = () => {},
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (values) => {
    const userId = userInfo.id;
    const submitData = {
      ...values,
      email: values.username,
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
      username: userInfo.email || '',
      fullname: userInfo.fullname || '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        margin='normal'
        id='username'
        name='username'
        label='Tên/email đăng nhập'
        variant='outlined'
        value={formik.values.username}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.username)}
        helperText={formik.errors.username || ' '}
      />
      <TextField
        fullWidth
        margin='normal'
        id='fullname'
        name='fullname'
        label='Họ tên'
        variant='outlined'
        value={formik.values.fullname}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.fullname)}
        helperText={formik.errors.fullname || ' '}
      />
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
