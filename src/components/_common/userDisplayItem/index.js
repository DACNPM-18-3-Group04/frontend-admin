import { Box, Typography, Avatar } from '@mui/material';
import { AlignCenter } from '../utilBoxes';

export default function UserDisplayItem({ avatar, fullname }) {
  return (
    <Box display='flex'>
      <Avatar sx={{ bgcolor: 'defaultColor' }} alt={fullname} src={avatar}>
        {/* Fallback to first letter of user's fullname */}
        {fullname ? fullname.charAt(0) : null}
      </Avatar>
      <AlignCenter mx={1}>
        <Typography variant='body1' sx={{ flexGrow: 1 }}>
          {fullname}
        </Typography>
      </AlignCenter>
    </Box>
  );
}
