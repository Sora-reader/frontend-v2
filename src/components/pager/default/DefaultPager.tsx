import { DefaultPagerProps } from './types';
import { DefaultImage } from './DefaultImage';
import { useCallback, useMemo } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

export const DefaultPager = ({ images, page, setPage, setShowNavbar }: DefaultPagerProps) => {
  const onChangeIndex = useCallback(
    (newIndex, p) => {
      // Ignore laps, like going backwards from first lands on last panel
      if (Math.abs(p - newIndex) > 1) return;
      // Otherwise set new page
      setPage(newIndex + 1);
    },
    [images, page]
  );

  // 100vh doesn't work when mobile app bar is visible :)
  const jsViewportHeight = useMemo(() => `${window.innerHeight}px`, undefined);

  return (
    <BindKeyboardSwipeableViews
      hysteresis={0.3}
      threshold={10}
      index={page - 1}
      onChangeIndex={onChangeIndex}
      style={{ width: '100%', overflow: 'hidden' }}
      slideStyle={{
        height: jsViewportHeight,
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {images.map((image, n) => (
        <DefaultImage priority={n === 0} key={image} src={image} setShowNavbar={setShowNavbar} />
      ))}
    </BindKeyboardSwipeableViews>
  );
};
