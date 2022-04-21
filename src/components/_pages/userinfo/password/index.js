import { IconButton, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import {
  cellStyle,
  header,
  rowStyle,
  tableContainer,
  title,
} from '../customStyle';
import * as yup from 'yup';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleFailure } from '../../../../helpers/api/_helpers';
import { updateUser } from '../../../../redux/slices/user';
import { handleUpdateUserAccount } from '../../../../helpers/api/user';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

const validationSchema = yup.object({
  password: yup
    .string('Nhập mật khẩu')
    .min(8, 'Tối thiểu 8 ký tự')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      'Ít nhất một ký tự viết hoa, một ký tự viết thường, một chữ số và một ký tự đặc biệt(@#$%^&*)',
    )
    .required('Bắt buộc'),
  newPassword: yup
    .string('Nhập mật khẩu')
    .min(8, 'Tối thiểu 8 ký tự')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      'Ít nhất một ký tự viết hoa, một ký tự viết thường, một chữ số và một ký tự đặc biệt(@#$%^&*)',
    )
    .notOneOf([yup.ref('password'), null], 'Mật khẩu phải khác mật khẩu cũ')
    .required('Bắt buộc'),
  rechk_newPassword: yup
    .string('Nhập mật khẩu')
    .min(8, 'Tối thiểu 8 ký tự')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      'Ít nhất một ký tự viết hoa, một ký tự viết thường, một chữ số và một ký tự đặc biệt(@#$%^&*)',
    )
    .oneOf([yup.ref('newPassword'), null], 'Mật khẩu phải trùng khớp')
    .notOneOf([yup.ref('password'), null], 'Mật khẩu phải khác mật khẩu cũ')
    .required('Bắt buộc'),
});

export default function AccountInfo() {
  const [show, setShow] = useState(true);
  const [formStates, setFormStates] = useState({
    isSubmitting: false,
  });

  const dispatch = useDispatch();

  const onUpdateSuccess = (res) => {
    setFormStates({ ...formStates, isSubmitting: false });
    dispatch(updateUser(res.data.data));
    setShow((prev) => !prev);
    toast.success('Cập nhật thông tin thành công');
  };

  const onUpdateFailure = (err) => {
    setFormStates({ ...formStates, isSubmitting: false });
    handleFailure(err);
  };

  const handleSubmit = async (formValues) => {
    setFormStates({ ...formStates, isSubmitting: true });
    const values = {
      ...formValues,
    };
    handleUpdateUserAccount(values)
      .then(onUpdateSuccess)
      .catch(onUpdateFailure);
  };

  const formik = useFormik({
    initialValues: {
      password: '',
      newPassword: '',
      rechk_newPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={header}>
        <Typography noWrap variant='h6' sx={title}>
          Chi tiết đăng nhập
        </Typography>
        <Box display='flex'>
          {show ? (
            <IconButton onClick={() => setShow((prev) => !prev)}>
              <EditIcon />
            </IconButton>
          ) : (
            <Box>
              <IconButton
                disabled={formStates.isSubmitting}
                color='success'
                type='submit'
              >
                <SaveIcon />
              </IconButton>
              <IconButton onClick={() => setShow((prev) => !prev)}>
                <CloseIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>

      <Box sx={tableContainer}>
        <Box sx={rowStyle}>
          <Typography noWrap flex={2} fontWeight='bold' sx={cellStyle}>
            Mật khẩu cũ
          </Typography>

          <Box flex={8} sx={cellStyle}>
            {show ? (
              '●●●●●●●●'
            ) : (
              <TextField
                fullWidth
                autoFocus
                id='password'
                name='password'
                type='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                helperText={formik.errors.password}
                variant='standard'
              />
            )}
          </Box>
        </Box>

        {!show && (
          <Box sx={rowStyle}>
            <Typography noWrap flex={2} fontWeight='bold' sx={cellStyle}>
              Mật khẩu mới
            </Typography>

            <Box flex={8} sx={cellStyle}>
              <TextField
                fullWidth
                id='newPassword'
                name='newPassword'
                type='password'
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                helperText={formik.errors.newPassword}
                variant='standard'
              />
            </Box>
          </Box>
        )}

        {!show && (
          <Box sx={rowStyle}>
            <Typography noWrap flex={2} fontWeight='bold' sx={cellStyle}>
              Nhập lại
            </Typography>

            <Box flex={8} sx={cellStyle}>
              <TextField
                fullWidth
                id='rechk_newPassword'
                name='rechk_newPassword'
                type='password'
                value={formik.values.rechk_newPassword}
                onChange={formik.handleChange}
                helperText={formik.errors.rechk_newPassword}
                variant='standard'
              />
            </Box>
          </Box>
        )}
      </Box>
    </form>
  );
}
