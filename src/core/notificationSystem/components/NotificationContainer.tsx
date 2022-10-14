import { Box, useTheme } from '@mui/joy';
import { clearNotification, NotificationType } from '../slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { navbarSize } from '../../../components/layout/Navbar/const';
import { navbarWrapBreakpointKey } from '../../../components/layout/Navbar/utils';
import { Notification } from './Notification';

export const NotificationContainer = () => {
  const notifications = useSelector<RootState>((state) => state.notification) as Array<NotificationType>;
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'fixed',
        minWidth: '250px',
        maxWidth: '280px',
        [theme.breakpoints.down(navbarWrapBreakpointKey)]: {
          bottom: `${navbarSize}rem`,
          right: '1rem',
        },
        [theme.breakpoints.up(navbarWrapBreakpointKey)]: {
          bottom: '1rem',
          right: '1rem',
        },
      }}
    >
      {notifications &&
        notifications.map((n) => (
          <Notification key={n.id} notification={n} closeCallback={() => dispatch(clearNotification(n.id))} />
        ))}
    </Box>
  );
};
