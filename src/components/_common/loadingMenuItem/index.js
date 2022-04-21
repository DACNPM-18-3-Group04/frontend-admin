import {
  MenuItem,
  CircularProgress
} from '@mui/material';

export default function LoadingMenuItem({
  loading,
  text = '',
  onClick = () => {},
  loadingText = 'Đang tải',
}) {
  return (
    <MenuItem 
      disabled={loading}
      onClick={onClick}
    >
      {loading ? 
        <span style={{display: 'flex'}}>
          <CircularProgress size={21} sx={{marginRight: 1}}/>
          {loadingText}
        </span> 
        : <span>{text}</span>
      }
    </MenuItem>
  )
}
