import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { toast } from 'react-toastify';
import AdminUsersAPI from '../../../../../../helpers/api/admin/users';
import { getErrorMessage } from '../../../../../../helpers/error';
import { USER_ACCOUNT_STATUS } from '../../../../../../helpers/constants';

export default function ToggleDisable({
  userId,
  status = 'A',
  onSuccess = () => {},
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  let statusInfo = USER_ACCOUNT_STATUS[status];

  if (!statusInfo) {
    statusInfo = USER_ACCOUNT_STATUS['A'];
  }

  const isDisabled = statusInfo.isClassDisabled;
  const extraButtonProps = {};
  if (!isDisabled) {
    extraButtonProps.color = 'error';
  }

  const handleClick = () => {
    setIsSubmitting(true);
    const updateData = {
      status: status === 'A' ? 'D' : 'A',
    };
    const toastLoadingId = toast.loading('Đang cập nhật');
    AdminUsersAPI.editUser(userId, updateData)
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

  return (
    <LoadingButton
      {...extraButtonProps}
      loading={isSubmitting}
      variant='contained'
      onClick={handleClick}
    >
      {isDisabled ? 'Hủy vô hiệu hóa' : 'Vô hiệu hóa'}
    </LoadingButton>
  );
}
