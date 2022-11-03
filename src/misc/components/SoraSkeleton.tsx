import { Skeleton, SkeletonProps } from '@mui/material';
import { forwardRef, useMemo } from 'react';

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

type OptionalSkeletonHookProps = SoraSkeletonProps & { forceLoading?: boolean };
/** Hook to support rendering optional Skeleton wrapper depending on some value.
 * Returns a component which accepts children which should be wrapped and usual <Skeleton/> props.
 *
 * You can override initial shouldWrap argument with forceWrap argument to the component itself.
 * @param shouldWrap bool to determine if skeleton should be rendered
 */
export const useWithOptionalSkeleton =
  (shouldWrap: boolean) =>
  ({ forceLoading, children, ...props }: OptionalSkeletonHookProps): JSX.Element =>
    useMemo(
      () =>
        shouldWrap || forceLoading ? <SoraSkeleton children={children} {...props} /> : (children as any),
      []
    );
