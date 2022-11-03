import { NextPage } from 'next';
import { Box, Tab } from '@mui/joy';
import { useColorScheme } from '@mui/joy/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useCallback } from 'react';
import { TabSwitch } from '../components/system/TabSwitch';

const SettingsPage: NextPage = () => {
  const { mode, setMode } = useColorScheme();

  const onChange = useCallback(() => setMode(mode === 'dark' ? 'light' : 'dark'), [mode]);

  return (
    <Box>
      <h3>Тема</h3>
      <TabSwitch onChange={onChange} value={mode}>
        <Tab value={'dark'}>
          <DarkModeIcon />
        </Tab>
        <Tab value={'light'}>
          <LightModeIcon />
        </Tab>
      </TabSwitch>
    </Box>
  );
};

export default SettingsPage;
