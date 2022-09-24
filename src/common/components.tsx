import {Skeleton, SkeletonProps} from '@mui/material';
import {forwardRef} from 'react';

export type LoadingProps = {
  loading: boolean,
}

type SoraSkeletonProps = SkeletonProps
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

export const useWithOptionalSkeleton = (shouldWrap: boolean) =>
    ({children, ...props}) => shouldWrap ?
        <SoraSkeleton {...props}>
          {children}
        </SoraSkeleton> :
        children;
