import { ImageProps } from '../types';
import Image from 'next/image';
import { Box } from '@mui/joy';

export const DefaultPagerImage = ({ src, priority, setShowNavbar, alt }: ImageProps) => (
  <Box
    sx={{
      position: 'relative',
      width: '100%',
      // Style property on Image doesn't fucking work
      '& img': {
        objectFit: 'contain',
      },
    }}
  >
    <Image priority={priority} fill={true} src={src} onClick={setShowNavbar} alt={alt} sizes="100vw" />
  </Box>
);
