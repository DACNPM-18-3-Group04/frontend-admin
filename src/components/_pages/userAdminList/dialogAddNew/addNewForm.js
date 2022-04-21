import { 
  InputAdornment, IconButton
} from '@mui/material';

import {
  LoadingButton
} from '@mui/lab';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import CustomTextField from '../../../_common/customTextField';

import AdminUsersAPI from '../../../../helpers/api/admin/users';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../../helpers/error';


const validationSchema = yup.object({
  username: yup
    .string('Nhập username')
    .min(5, 'Tối thiểu 5 ký tự')
    .required('Bắt buộc'),
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

export default function NewAdminAccountForm({
  onSuccess = () => {},
}) {
  const [formStates, setFormStates] = useState({
    isSubmitting: false,
    showPassword: false,
    showPasswordConfirm: false,
  });

  const handleSubmit = async (values) => {
    setFormStates({...formStates, isSubmitting: true});
    console.log(values)
    AdminUsersAPI.addAdminUser(values)
    .then(() => {
      onSuccess();
    })
    .catch((err) => {
      console.log(err.response);
      toast.error(`Lỗi - ${getErrorMessage(err)}`);
    })
    .finally(() => {
      setFormStates({...formStates, isSubmitting: false});
    })
  }
  const handleToggleShowPassword = () => {
    setFormStates({...formStates, showPassword: !formStates.showPassword})
  }

  const handleToggleShowConfirmPassword = () => {
    setFormStates({...formStates, showPasswordConfirm: !formStates.showPasswordConfirm})
  }
  
  const formik = useFormik({
    initialValues: {
      username: '',
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
        disabled={formStates.isSubmitting}
        autoFocus
        id='username'
        name='username'
        label='Username'
        value={formik.values.username}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.username)}
        helperText={formik.errors.username}
      />
      <CustomTextField
        fullWidth
        disabled={formStates.isSubmitting}
        type={formStates.showPassword ? 'text' : 'password'}
        id='password'
        name='password'
        label='Mật khẩu'
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              onClick={handleToggleShowPassword}
              edge='end'
            >
              {formStates.showPassword ? <VisibilityOff /> : <Visibility />}
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
        disabled={formStates.isSubmitting}
        type={formStates.showPasswordConfirm ? 'text' : 'password'}
        id='passwordConfirm'
        name='passwordConfirm'
        label='Xác nhận mật khẩu'
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              onClick={handleToggleShowConfirmPassword}
              edge='end'
            >
              {formStates.showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        value={formik.values.passwordConfirm}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.passwordConfirm)}
        helperText={formik.errors.passwordConfirm}
      />
      <LoadingButton 
        loading={formStates.isSubmitting}
        variant='contained'
        fullWidth 
        type='submit'
      >
        Tạo
      </LoadingButton>
    </form>
  );
}
