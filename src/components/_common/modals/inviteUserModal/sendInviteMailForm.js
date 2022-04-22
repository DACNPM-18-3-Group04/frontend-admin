import { Button, TextField, CircularProgress } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';
import InviteAPI from '../../../../helpers/api/invite';

const validationSchema = yup.object({
  email: yup.string().email('Email không hợp lệ').required('bắt buộc'),
});

export default function SendInviteMailForm({ role, classInfo = {} }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (values) => {
    const submitData = {
      ...values,
      role,
      class_id: classInfo.id,
    };
    setIsSubmitting(true);
    InviteAPI.sendEmailInvite(submitData)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        // onFailed(err);
        // console.log(err);
        toast.error('Lỗi hệ thống');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
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
        id='email'
        name='email'
        label='Email'
        variant='outlined'
        value={formik.values.email}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.email)}
        helperText={formik.errors.email || ' '}
      />
      <Button
        disabled={isSubmitting}
        variant='contained'
        fullWidth
        type='submit'
      >
        {isSubmitting ? <CircularProgress color='inherit' /> : 'Gửi'}
      </Button>
    </form>
  );
}
