import { ImageProps } from '../types';
import Image from 'next/image';
import { Box } from '@mui/joy';

export const DefaultImage = ({ src, priority, setShowNavbar }: ImageProps) => (
  <Box
    sx={{
      // Style property on Image doesn't fucking work
      '& img': {
        objectFit: 'contain',
      },
    }}
  >
    <Image priority={priority} layout="fill" src={src} alt="" onClick={setShowNavbar} />
  </Box>
);
