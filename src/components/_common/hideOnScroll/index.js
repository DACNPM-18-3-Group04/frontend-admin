import { Slide } from '@mui/material';
import useScrollTrigger from '@mui/material/useScrollTrigger';

export default function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
}
