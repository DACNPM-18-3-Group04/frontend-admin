import { 
  InputAdornment, IconButton
} from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import {
  LoadingButton
} from '@mui/lab';

import CustomTextField from '../../../../../_common/customTextField';

import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';

import AdminUsersAPI from '../../../../../../helpers/api/admin/users';

const validationSchema = yup.object({
  password: yup
    .string('Nhập mật khẩu')
    .min(8, 'Tối thiểu 8 ký tự')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Ít nhất một ký tự viết hoa, một ký tự viết thường, một chữ số và một ký tự đặc biệt(@#$%^&*)"
    )
    .required('Bắt buộc'),
  passwordConfirm: yup
    .string('Xác nhận mật khẫu')
    .required('Bắt buộc')
    .oneOf([yup.ref('password')], 'Không khớp với mật khẩu'),
});

function UserResetPwdForm({
  userInfo = {}, 
  onSuccess = () => {}, 
  onFailed = () => {}
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (values) => {
    const userId = userInfo.id;
    const submitData = values;
    setIsSubmitting(true);
    AdminUsersAPI.resetPassword(userId, submitData)
    .then((res) => {
      onSuccess();
      toast.success('Reset thành công')
      formik.resetForm();
    })
    .catch(() => {
      toast.error('Lỗi cập nhật');
    })
    .finally(() => {
      setIsSubmitting(false);
    })
  }

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleToggleShowConfirmPassword = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  }

  const formik = useFormik({
    initialValues: {
      password: '',
      passwordConfirm: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <CustomTextField
        fullWidth
        disabled={isSubmitting}
        type={showPassword ? 'text' : 'password'}
        id='password'
        name='password'
        label='Mật khẩu'
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              onClick={handleToggleShowPassword}
              edge='end'
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        value={formik.values.password}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.password)}
        helperText={formik.errors.password}
      />
      <CustomTextField
        fullWidth
        disabled={isSubmitting}
        type={showPasswordConfirm ? 'text' : 'password'}
        id='passwordConfirm'
        name='passwordConfirm'
        label='Xác nhận mật khẩu'
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              onClick={handleToggleShowConfirmPassword}
              edge='end'
            >
              {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        value={formik.values.passwordConfirm}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.passwordConfirm)}
        helperText={formik.errors.passwordConfirm}
      />
      <LoadingButton 
        loading={isSubmitting}
        variant='contained'
        fullWidth 
        type='submit'
      >
        Reset mật khẩu
      </LoadingButton>
    </form>
  )
}

export default UserResetPwdForm;
