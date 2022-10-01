import {Skeleton, SkeletonProps} from '@mui/material';
import {forwardRef} from 'react';


export type SoraSkeletonProps = SkeletonProps
// Skeleton override with better defaults (use joy theme style overrides when it's supported by JoyUI).
export const SoraSkeleton = forwardRef<any, SoraSkeletonProps>(
  ({sx, variant, ...props}, ref) => {
    const mySx = {
      borderRadius: '.5rem',
      ...(sx || {}),
    };
    variant = variant || 'rectangular';
    return <Skeleton variant={variant} sx={mySx} {...props} ref={ref}/>;
  },
);
