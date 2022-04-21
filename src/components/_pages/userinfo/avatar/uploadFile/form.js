// Split form from dialog to make it not remember previous data
import React, { useState } from 'react';
import {
  //
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';

import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../../../redux/slices/user';

import formatErrorResponse from '../../../../../helpers/utils/formatErrorResponse';
import { ACCEPT_IMAGE_MIMETYPES } from '../../../../../helpers/constants';
import UploadFileAPI from '../../../../../helpers/api/uploadFile/index';

// Leave rooms for later additional types
const acceptFileMimetypes = ACCEPT_IMAGE_MIMETYPES;

export default function UploadAvatarForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const isNoFileSelected = selectedFile == null;

  const handleFileChange = (event) => {
    const newFile = event.target.files[0];

    if (!newFile || !acceptFileMimetypes.includes(newFile.type)) {
      setSelectedFile(null);
      return;
    }
    setSelectedFile(newFile);
  };

  const onFileUpload = () => {
    const formData = new FormData();

    formData.append('image', selectedFile);
    setIsSubmitting(true);
    UploadFileAPI.uploadAvatar(formData)
      .then((res) => {
        // console.log(res.data);
        dispatch(updateUser(res.data?.data));
        toast.success('cập nhật thành công');
      })
      .catch((err) => {
        console.log(err);
        const errDetails = formatErrorResponse(err);
        toast.error(errDetails.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <Box my={1}>
        <TextField
          focused
          readOnly
          fullWidth
          id='avatar-file'
          name='avatar-file'
          type='file'
          onChange={handleFileChange}
          label='File ảnh'
          error={isNoFileSelected}
          helperText='Chỉ chấp nhận .png|.jpeg|.jpg'
        />
      </Box>
      <Button
        fullWidth
        disabled={isNoFileSelected || isSubmitting}
        type='submit'
        variant='contained'
        color='primary'
        onClick={onFileUpload}
      >
        {isSubmitting ? <CircularProgress color='inherit' /> : 'Cập nhật'}
      </Button>
      <FileDataDetail file={selectedFile} />
    </>
  );
}

const FileDataDetail = ({ file }) => {
  if (file) {
    return (
      <Box my={1}>
        <Typography variant='caption'>Chi tiết file</Typography>
        <Typography variant='subtitle2'>Tên file: {file.name}</Typography>
        <Typography variant='subtitle2'>Loại file: {file.type}</Typography>
        {/* <h6>File Details:</h6>
        <p>File Name: {file.name}</p>
        <p>File Type: {file.type}</p>
        <p>Last Modified: {file.lastModifiedDate.toDateString()}</p> */}
      </Box>
    );
  }

  return <div></div>;
};
