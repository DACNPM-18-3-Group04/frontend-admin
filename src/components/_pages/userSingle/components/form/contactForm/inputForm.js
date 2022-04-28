import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';

import AdminUsersAPI from '../../../../../../helpers/api/admin/users';

const validationSchema = yup.object({
  contact_email: yup.string('Nhập email').email('Email không hợp lệ'),
  contact_number: yup.number('Nhập SĐT'),
});

export default function UserContactEditForm({
  userInfo = {},
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
      contact_email: userInfo.contact_email || '',
      contact_number: userInfo.contact_number || '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        margin='normal'
        id='contact_email'
        name='contact_email'
        label='Email liên hệ'
        variant='outlined'
        value={formik.values.contact_email}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.contact_email)}
        helperText={formik.errors.contact_email || ' '}
      />
      <TextField
        fullWidth
        margin='normal'
        id='contact_number'
        name='contact_number'
        label='SĐT liên hệ'
        variant='outlined'
        value={formik.values.contact_number}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.contact_number)}
        helperText={formik.errors.contact_number || ' '}
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
