import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const AlignCenter = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1)
}));
