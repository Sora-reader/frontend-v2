import { NextPage } from 'next';
import { Box, Tab, TabList, Tabs } from '@mui/joy';
import { useColorScheme } from '@mui/joy/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useCallback } from 'react';

const SettingsPage: NextPage = () => {
  const { mode, setMode } = useColorScheme();

  const onChange = useCallback(() => setMode(mode === 'dark' ? 'light' : 'dark'), [mode]);

  return (
    <Box>
      <h3>Тема</h3>
      <Tabs
        sx={{
          // TODO: Remove when fixed
          backgroundColor: 'transparent',
        }}
        onChange={onChange}
        value={mode}
      >
        <TabList variant="soft" color="neutral">
          <Tab value={'dark'}>
            <DarkModeIcon />
          </Tab>
          <Tab value={'light'}>
            <LightModeIcon />
          </Tab>
        </TabList>
      </Tabs>
    </Box>
  );
};

export default SettingsPage;
