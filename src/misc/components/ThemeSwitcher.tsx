import { useColorScheme } from '@mui/joy/styles';
import Button from '@mui/joy/Button';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import React from 'react';

export const ThemeSwitcher = () => {
  const { mode, setMode } = useColorScheme();
  return (
    <Button
      variant="plain"
      color="neutral"
      sx={{
        position: 'absolute',
        right: '0px',
        top: '0px',
      }}
      onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
    >
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </Button>
  );
};
