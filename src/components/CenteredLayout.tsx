import { Box } from '@mui/joy';
import { navbarSize } from './layout/Navbar/const';

export const CenteredLayout = ({ children, direction = 'column' }) => {
  return (
    <Box
      sx={{
        height: `calc(100vh - ${navbarSize}rem)`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: direction,
      }}
    >
      {children}
    </Box>
  );
};
