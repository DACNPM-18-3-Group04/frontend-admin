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
  contact_email: yup.string('Nhập email').email('Email không hợp lệ'),
  contact_number: yup.number('Nhập SĐT'),
});

export default function Contacts({
  contact_email,
  contact_number,
  account_type,
}) {
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
      contact_email: contact_email,
      contact_number: contact_number,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={header}>
        <Typography noWrap variant='h6' sx={title}>
          Chi tiết liên hệ
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
            Email liên hệ
          </Typography>

          <Box flex={8} sx={cellStyle}>
            {show ? (
              contact_email
            ) : (
              <TextField
                fullWidth
                autoFocus
                id='contact_email'
                name='contact_email'
                value={formik.values.contact_email}
                onChange={formik.handleChange}
                helperText={formik.errors.contact_email}
                variant='standard'
              />
            )}
          </Box>
        </Box>

        <Box sx={rowStyle}>
          <Typography noWrap flex={2} fontWeight='bold' sx={cellStyle}>
            SĐT
          </Typography>

          <Box flex={8} sx={cellStyle}>
            {show ? (
              contact_number
            ) : (
              <TextField
                fullWidth
                id='contact_number'
                name='contact_number'
                value={formik.values.contact_number}
                onChange={formik.handleChange}
                helperText={formik.errors.contact_number}
                variant='standard'
              />
            )}
          </Box>
        </Box>

        <Box sx={rowStyle}>
          <Typography noWrap flex={2} fontWeight='bold' sx={cellStyle}>
            Loại
          </Typography>
          <Box flex={8} sx={cellStyle} color='red'>
            {account_type}
          </Box>
        </Box>
      </Box>
    </form>
  );
}
