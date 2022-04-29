import { Box, Stack, Avatar, Typography } from '@mui/material';
export default function AuthorInfoDisplay({ dataInfo = {} }) {
  const formattedData = dataInfo ? dataInfo : {};
  const userInfo = formattedData.user ? formattedData.user : {};
  const uid = userInfo.id || '';
  const name = userInfo.fullname || '';
  const avatarUrl = userInfo.avatar || '';

  return (
    <Box>
      <Typography variant='body2'>Người đăng</Typography>
      <Stack direction='row' alignItems='center' spacing={2} mt={1}>
        <Avatar alt={name} src={avatarUrl}>
          {name ? name.charAt(0) : null}
        </Avatar>
        <Stack direction='column'>
          <Typography variant='caption' noWrap>
            UID: {uid}
          </Typography>
          <Typography variant='subtitle2' noWrap>
            <b>{name}</b>
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
