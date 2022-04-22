import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

import { USER_CLASS_ROLES } from '../../../../helpers/constants';
import { getPublicInviteLink } from '../../../../helpers/invite';
import PublicInviteLinkBox from './publicInviteLinkBox';

import SendInviteMailForm from './sendInviteMailForm';

function InviteUserDialog({
  open,
  toggleClose,
  classInfo = {},
  role = USER_CLASS_ROLES.STUDENT,
}) {
  const roleName = role === USER_CLASS_ROLES.TEACHER ? 'giáo viên' : 'học sinh';
  const inviteLink = getPublicInviteLink(classInfo.id, classInfo.class_code);

  const handleClose = () => {
    toggleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
      <DialogTitle>Mời {roleName}</DialogTitle>
      <DialogContent>
        {role !== USER_CLASS_ROLES.TEACHER && (
          <PublicInviteLinkBox link={inviteLink} />
        )}
        <SendInviteMailForm role={role} classInfo={classInfo} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
}

export default InviteUserDialog;
