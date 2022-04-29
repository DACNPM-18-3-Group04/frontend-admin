import { TextField, Grid, MenuItem, Autocomplete, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectPropertyLocation } from '../../../../../../redux/slices/propertyLocation';

import AdminPropertiesAPI from '../../../../../../helpers/api/admin/properties';
import PropertyTypes from '../../../../../../helpers/constants/propertyTypes';

const validationSchema = yup.object({
  address: yup.string().max(100, 'Tối đa 100 ký tự').required('Bắt buộc'),
  type: yup.string().required('Bắt buộc'),
  district_id: yup.string().required('Bắt buộc'),
});

export default function BasicInfoEditForm({
  dataInfo = {},
  onSuccess = () => {},
  onFailed = () => {},
}) {
  const propertyLocations = useSelector(selectPropertyLocation);
  const districts = [...propertyLocations.districts] || [];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (values) => {
    const dataId = dataInfo.id;
    const submitData = {
      ...values,
    };
    setIsSubmitting(true);
    AdminPropertiesAPI.edit(dataId, submitData)
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
      type: dataInfo.type || 'S',
      address: dataInfo.address || '',
      district_id: dataInfo.district_id || '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id='type'
            name='type'
            label='Thuê / Bán'
            margin='dense'
            select
            value={formik.values.type}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.type)}
            helperText={formik.errors.type || ' '}
          >
            <MenuItem value={PropertyTypes.SELL}>Bán</MenuItem>
            <MenuItem value={PropertyTypes.LENT}>Thuê</MenuItem>
          </TextField>
        </Grid>
        <Grid item container xs={12} spacing={2}>
          <Grid item md={8} xs={12}>
            <TextField
              fullWidth
              id='address'
              name='address'
              label='Địa chỉ (Số nhà, đường, phường)'
              margin='dense'
              value={formik.values.address}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.address)}
              helperText={formik.errors.address || ' '}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <Autocomplete
              fullWidth
              value={formik.values.district_id}
              onChange={(e, value) => {
                if (!value) return;
                formik.setFieldValue('district_id', '' + value.id);
              }}
              options={districts}
              isOptionEqualToValue={(option, value) => {
                // There are warnings, OK for now
                return '' + option.id === '' + value;
              }}
              getOptionLabel={(option) => {
                if (option.id) {
                  return `${option.name}${
                    option.province ? `, ${option.province}` : ''
                  }`;
                }

                if (option.id === '') {
                  return option.name;
                }

                const data = districts.find(
                  (district) => '' + district.id === '' + option,
                );
                if (!data) return '(Không có)';
                return `${data.name}${
                  data.province ? `, ${data.province}` : ''
                }`;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin='dense'
                  label='Quận'
                  error={Boolean(formik.errors.district_id)}
                  helperText={formik.errors.district_id || ' '}
                />
              )}
            />
          </Grid>
        </Grid>
      </Grid>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <LoadingButton loading={isSubmitting} variant='contained' type='submit'>
          Lưu thay đổi
        </LoadingButton>
      </Box>
    </form>
  );
}
