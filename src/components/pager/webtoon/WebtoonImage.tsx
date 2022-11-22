import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { WebtoonImageProps } from './types';
import { LogoSpinner } from '../../../misc/components/LogoSpinner';
import { Card, Typography } from '@mui/joy';

export const WebtoonImage = ({ src, position, setPage, setShowNavbar }: WebtoonImageProps) => {
  // TODO: may be change it
  const [startedLoading, setStartedLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const { ref: inViewportRef, inView: inViewport } = useInView({
    rootMargin: '0% 0% 0% 0%',
    threshold: 0,
  });

  useEffect(() => {
    if (inViewport && !startedLoading) {
      const img = new Image();
      if (src) {
        setStartedLoading(true);
        img.src = src;
        if (img.complete) {
          setImageLoading(false);
        } else {
          img.onload = () => {
            setImageLoading(false);
          };
        }
      }
    }
  }, [src, inViewport, startedLoading]);

  const { ref: centeredRef, inView: inCenter } = useInView({
    rootMargin: '-50% 0% -50% 0%',
    threshold: 0,
  });

  useEffect(() => {
    if (inCenter) setPage(position);
  }, [inCenter]);

  const ref = startedLoading ? centeredRef : inViewportRef;

  return imageLoading ? (
    // TODO: Make a separate component out of it and provide similar interface for next/image (default pager)
    <Card
      sx={{
        minWidth: '80%',
        maxWidth: '100%',
        height: '30vh',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      ref={ref}
    >
      <Typography level="h3">{position} Изображение загружается</Typography>
      <LogoSpinner />
    </Card>
  ) : (
    <img
      style={{
        minWidth: '80%',
        maxWidth: '100%',
      }}
      id={`image-${position}`}
      src={src}
      alt=""
      onClick={setShowNavbar}
      ref={ref}
    />
  );
};
