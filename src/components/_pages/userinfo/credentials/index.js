import { IconButton, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import {
  cellStyle,
  header,
  rowStyle,
  tableContainer,
  title,
} from '../customStyle';
import { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { handleUpdateUserAccount } from '../../../../helpers/api/user';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../../redux/slices/user';
import { toast } from 'react-toastify';
import { handleFailure } from '../../../../helpers/api/_helpers';

const validationSchema = yup.object({
  email: yup
    .string('Nhập email')
    .email('Email không hợp lệ')
    .required('Bắt buộc'),
  fullname: yup.string('Nhập họ tên').required('Bắt buộc'),
});

export default function Credentials({ email, fullname, onEmailChange }) {
  const [show, setShow] = useState(true);
  const [formStates, setFormStates] = useState({
    isSubmitting: false,
  });

  const dispatch = useDispatch();

  const onUpdateSuccess = (res) => {
    setFormStates({ ...formStates, isSubmitting: false });
    dispatch(updateUser(res.data?.data));
    onEmailChange(res.data?.data?.email);
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
      email: email,
      fullname: fullname,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={header}>
        <Typography noWrap variant='h6' sx={title}>
          Chi tiết tài khoản
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
            Email
          </Typography>

          <Box flex={8} sx={cellStyle}>
            {show ? (
              email
            ) : (
              <TextField
                fullWidth
                autoFocus
                id='email'
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                helperText={formik.errors.email}
                variant='standard'
              />
            )}
          </Box>
        </Box>

        <Box sx={rowStyle}>
          <Typography noWrap flex={2} fontWeight='bold' sx={cellStyle}>
            Họ tên
          </Typography>
          <Box flex={8} sx={cellStyle}>
            {show ? (
              fullname
            ) : (
              <TextField
                fullWidth
                id='fullname'
                name='fullname'
                value={formik.values.fullname}
                onChange={formik.handleChange}
                helperText={formik.errors.fullname}
                variant='standard'
              />
            )}
          </Box>
        </Box>
      </Box>
    </form>
  );
}
