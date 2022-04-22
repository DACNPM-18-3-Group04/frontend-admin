import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';

import AdminUsersAPI from '../../../../../helpers/api/admin/users';

const validationSchema = yup.object({
  username: yup
    .string('Nhập username/ email đăng nhập')
    .min(5, 'Tổi thiểu 5 kí tự')
    .required('Bặt buộc'),
  full_name: yup
    .string('Nhập tên lớp')
    .min(6, 'Tối thiểu 6 ký tự')
    .max(30, 'Tối đa 30 ký tự')
    .required('Bắt buộc'),
  user_code: yup
    .string('Nhập số mã sinh viên')
    .matches(/[\w-]{6,8}/, 'Mã sinh viên không hợp lệ'),
});

function UserEditForm({
  userInfo = {},
  onSuccess = () => {},
  onFailed = () => {},
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (values) => {
    const userId = userInfo.id;
    const submitData = values;
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
      username: userInfo.username || '',
      full_name: userInfo.full_name || '',
      user_code: userInfo.user_code || '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        autoFocus
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
        id='full_name'
        name='full_name'
        label='Họ tên'
        variant='outlined'
        value={formik.values.full_name}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.full_name)}
        helperText={formik.errors.full_name || ' '}
      />
      <TextField
        fullWidth
        margin='normal'
        id='user_code'
        name='user_code'
        label='MSSV'
        variant='outlined'
        value={formik.values.user_code}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.user_code)}
        helperText={formik.errors.user_code || ' '}
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

export default UserEditForm;
