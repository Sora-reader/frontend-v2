import { DefaultPagerProps } from './types';
import { DefaultImage } from './DefaultImage';
import { useCallback } from 'react';
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

  return (
    <BindKeyboardSwipeableViews
      hysteresis={0.3}
      threshold={10}
      index={page - 1}
      onChangeIndex={onChangeIndex}
      style={{ width: '100%', overflow: 'hidden', height: '100vh' }}
      slideStyle={{ height: '100vh', display: 'flex', justifyContent: 'center', position: 'relative' }}
    >
      {images.map((image) => (
        <DefaultImage key={image} src={image} setShowNavbar={setShowNavbar} />
      ))}
    </BindKeyboardSwipeableViews>
  );
};
