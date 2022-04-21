import { Box, Paper, Typography } from '@mui/material';

import TextFieldWithCopy from '../../textFieldWithCopy';

export default function PublicInviteLinkBox({link}) {
  return (
    <Paper variant='outlined'>
      <Box p={2} bgcolor='background.default'>
        <Typography variant='subtitle1'>
          <b>Link public</b>
        </Typography>
        <TextFieldWithCopy
          margin='normal'
          fullWidth
          label='Link'
          text={link}
          helperText={(<span>Người dùng tham gia lớp bằng link này sẽ được tham gia như một <b>học sinh</b></span>)}
        />
      </Box>
    </Paper>
  )
}
