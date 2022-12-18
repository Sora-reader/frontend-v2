import { NextPage } from 'next';
import { Box, Switch, Tab, Typography } from '@mui/joy';
import { useColorScheme } from '@mui/joy/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useCallback } from 'react';
import { TabSwitch } from '../components/system/TabSwitch';
import { NoSsr } from '@mui/base';

const SettingsPage: NextPage = () => {
  const { mode, setMode } = useColorScheme();

  const onChange = useCallback(() => setMode(mode === 'dark' ? 'light' : 'dark'), [mode]);

  return (
    <Box>
      <h3>Тема</h3>
      <NoSsr>
        <TabSwitch onChange={onChange} value={mode}>
          <Tab value={'dark'}>
            <DarkModeIcon />
          </Tab>
          <Tab value={'light'}>
            <LightModeIcon />
          </Tab>
        </TabSwitch>
      </NoSsr>
      <h3>Каталоги</h3>
      <Typography component="label" sx={{ mb: 1 }} endDecorator={<Switch checked={true} sx={{ ml: 1 }} />}>
        ReadManga
      </Typography>
      <Typography component="label" sx={{ mb: 1 }} endDecorator={<Switch checked={false} sx={{ ml: 1 }} />}>
        MangaChan
      </Typography>
    </Box>
  );
};

export default SettingsPage;
