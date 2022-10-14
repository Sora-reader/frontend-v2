import { useEffect, useRef, useState } from 'react';
import { Fade } from '@mui/material';
import { Alert } from '@mui/joy';
import { ChapterImageList } from '../../core/api/types';

type PageAlertProps = {
  page: number;
  images: ChapterImageList;
};
export const PageAlert = ({ page, images }: PageAlertProps) => {
  const [alertShow, setAlertShow] = useState(false);
  const t = useRef<any>(null);

  useEffect(() => {
    clearTimeout(t.current);
    setAlertShow(true);
    t.current = setTimeout(() => {
      setAlertShow(false);
    }, 2000);
  }, [page]);

  return (
    <Fade in={alertShow}>
      <Alert
        color="neutral"
        sx={{
          position: 'fixed',
          right: '50%',
          left: '50%',
          justifyContent: 'center',
          top: '1rem',
          width: 'max-content',
          zIndex: 1,
        }}
      >
        {page || 0} / {images.length}
      </Alert>
    </Fade>
  );
};
