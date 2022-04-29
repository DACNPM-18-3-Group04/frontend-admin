import { Box, MenuItem, TextField, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import SaveIcon from '@mui/icons-material/Save';

import AdminPropertiesAPI from '../../../../../../helpers/api/admin/properties';
import { getErrorMessage } from '../../../../../../helpers/error';
import PropertyStatus from '../../../../../../helpers/constants/propertyStatus';

export default function ToggleDisable({
  dataId,
  status = 'A',
  onSuccess = () => {},
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (val) => {
    setIsSubmitting(true);
    const updateData = {
      status: val.status,
    };
    const toastLoadingId = toast.loading('Đang cập nhật');
    AdminPropertiesAPI.edit(dataId, updateData)
      .then((res) => {
        toast.success('Cập nhật thành công');
        onSuccess(updateData);
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(`Lỗi cập nhật - ${getErrorMessage(err)}`);
      })
      .finally(() => {
        setIsSubmitting(false);
        toast.dismiss(toastLoadingId);
      });
  };

  const formik = useFormik({
    initialValues: {
      status: status,
    },
    onSubmit: handleSubmit,
  });

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id='status'
          name='status'
          label='Trạng thái'
          size='small'
          select
          value={formik.values.status}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.status)}
          helperText={formik.errors.status || ' '}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <LoadingButton
                  loading={isSubmitting}
                  variant='contained'
                  size='small'
                  type='submit'
                >
                  <SaveIcon />
                </LoadingButton>
              </InputAdornment>
            ),
          }}
        >
          <MenuItem value={PropertyStatus.ACTIVE}>Đang rao</MenuItem>
          <MenuItem value={PropertyStatus.DISABLED}>Đã vô hiệu</MenuItem>
          <MenuItem value={PropertyStatus.STOP_SELL}>Ngừng rao</MenuItem>
        </TextField>
      </form>
    </Box>
  );
}
