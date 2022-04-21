import { Box, Typography } from "@mui/material"

// Custom message to work with react-toastify
export default function SubmitMessage({
  code = null,
  title,
  details='',
  message=''
}) {
  const msg = `${details ? details : message}${code ? `(${code})`: ''}`;
  return (
    <Box
      display='flex'
      flexDirection='column'
    >
      <Typography variant='h6'>{title}</Typography>
      <Typography variant='subtitle1'>{msg}</Typography>
    </Box>
  );
}
