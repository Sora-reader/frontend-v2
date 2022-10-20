import { useEffect, useRef, useState } from 'react';
import { Slide } from '@mui/material';
import { Alert, IconButton } from '@mui/joy';
import { NotificationType } from '../slice';
import CloseIcon from '@mui/icons-material/Close';

type NotificationProps = {
  notification: NotificationType;
  closeCallback: () => any;
};
export const Notification = ({ notification, closeCallback }: NotificationProps) => {
  const [open, setOpen] = useState(true);
  const [direction, setDirection] = useState<'up' | 'left'>('up');
  const closeTimeoutRef = useRef<any>();

  const exitTimeout = 100;

  // Change direction on MOUNT
  useEffect(() => {
    setDirection('left');
  }, []);

  const onClose = () => {
    setOpen(false);

    // Let the animation play before removing the element
    closeTimeoutRef.current = setTimeout(() => {
      closeCallback();
    }, exitTimeout);

    // Clear timeout on unmount
    return () => {
      clearTimeout(closeTimeoutRef.current);
    };
  };

  return (
    <Slide
      in={open}
      direction={direction}
      mountOnEnter
      unmountOnExit
      timeout={{ enter: 300, exit: exitTimeout }}
    >
      <Alert variant="solid" color={notification.type} sx={{ my: 1 }}>
        <p style={{ width: '90%', margin: 0 }}>{notification.message}</p>
        <IconButton variant="solid" color={notification.type} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Alert>
    </Slide>
  );
};
