import { ImageProps } from '../../../core/pager/types';
import Image from 'next/image';
import { Box } from '@mui/joy';

export const DefaultPagerImage = ({ src, setShowNavbar, alt }: ImageProps) => (
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
    <Image loading={'lazy'} fill={true} src={src} onClick={setShowNavbar} alt={alt} sizes="100vw" />
  </Box>
);
