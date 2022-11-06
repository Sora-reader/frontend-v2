import { Box } from '@mui/joy';
import { heightWithoutNavbar } from '../misc/utils';

export const CenteredLayout = ({ children, direction = 'column' }) => {
  return (
    <Box
      sx={{
        height: heightWithoutNavbar,
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
