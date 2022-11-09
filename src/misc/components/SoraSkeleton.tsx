import { Skeleton, SkeletonProps } from '@mui/material';
import { forwardRef } from 'react';

export type SoraSkeletonProps = SkeletonProps;
/** Skeleton override with better defaults (use joy theme style overrides when it's supported by JoyUI). */
export const SoraSkeleton = forwardRef<any, SoraSkeletonProps>(({ sx, variant, ...props }, ref) => {
  const mySx = {
    borderRadius: '.5rem',
    ...(sx || {}),
  };
  variant = variant || 'rectangular';
  return <Skeleton variant={variant} sx={mySx} {...props} ref={ref} />;
});

type OptionalSkeletonHookProps = SoraSkeletonProps & { loading: boolean };
/** HOC to support rendering optional Skeleton wrapper depending on some value.
 * children which should be wrapped and usual <Skeleton/> props.
 *
 * @param loading bool to determine if skeleton should be rendered
 * @param children
 * @param props
 */
export const WithOptionalSkeleton = ({
  loading,
  children,
  ...props
}: OptionalSkeletonHookProps): JSX.Element =>
  loading ? <SoraSkeleton children={children} {...props} /> : (children as any);
