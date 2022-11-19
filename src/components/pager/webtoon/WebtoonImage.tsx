import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { WebtoonImageProps } from './types';
import { LogoSpinner } from '../../../misc/components/LogoSpinner';
import { Card, Typography } from '@mui/joy';

export const WebtoonImage = ({ src, position, setPage, setShowNavbar }: WebtoonImageProps) => {
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    if (src) {
      img.src = src;
      if (img.complete) {
        setImageLoading(false);
      } else {
        img.onload = () => {
          setImageLoading(false);
        };
      }
    }
  }, [src]);

  const { ref, inView } = useInView({
    rootMargin: '-50% 0% -50% 0%',
    threshold: 0,
  });

  useEffect(() => {
    if (inView) setPage(position);
  }, [inView]);

  return imageLoading ? (
    // TODO: Make a separate component out of it and provide similar interface for next/image (default pager)
    <Card
      sx={{
        minWidth: '80%',
        maxWidth: '100%',
        height: '150vh',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      ref={ref}
    >
      <Typography level="h3">Изображение загружается</Typography>
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
