import { ListItem, ListItemIcon, ListItemText, Switch } from '@mui/material';
import { useContext } from 'react';
import { ThemeContext } from '../../../../../_app/theme';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function ThemeSetting() {
  const { currentTheme, setTheme } = useContext(ThemeContext);
  const isDarkmode = currentTheme === 'dark';

  const handleThemeChange = (event) => {
    const { checked } = event.target;
    if (checked) {
      setTheme('dark');
    } else {
      setTheme('default');
    }
  };

  return (
    <ListItem>
      <ListItemIcon>
        <DarkModeIcon />
      </ListItemIcon>
      <ListItemText>Chủ đề tối</ListItemText>
      <Switch edge='end' checked={isDarkmode} onChange={handleThemeChange} />
    </ListItem>
  );
}
