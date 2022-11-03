import { useEffect, useRef, useState } from 'react';
import { Slide } from '@mui/material';
import { Alert, IconButton } from '@mui/joy';
import { NotificationType } from '../slice';
import CloseIcon from '@mui/icons-material/Close';

type NotificationProps = {
  notification: NotificationType;
  closeCallback: () => any;
  autoHide?: number;
};
export const Notification = ({ notification, closeCallback, autoHide }: NotificationProps) => {
  const [open, setOpen] = useState(true);
  const [direction, setDirection] = useState<'up' | 'left'>('up');
  const closeTimeoutRef = useRef<any>();

  // AutoHide
  const autoHideTimeoutRef = useRef<any>();
  useEffect(() => {
    if (autoHide) {
      autoHideTimeoutRef.current = setTimeout(() => {
        onClose();
      }, autoHide);
    }

    // Clear timeout on unmount
    return () => {
      clearTimeout(autoHideTimeoutRef.current);
    };
  }, []);

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

Notification.defaultProps = {
  autoHide: 3000,
};
