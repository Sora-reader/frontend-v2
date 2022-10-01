import {DefaultPagerProps} from "./types";
import {DefaultImage} from "./DefaultImage";
import {useCallback} from "react";
import SwipeableViews from 'react-swipeable-views';
import {bindKeyboard} from 'react-swipeable-views-utils';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

export const DefaultPager = ({images, page, setPage}: DefaultPagerProps) => {
  const onChangeIndex = useCallback((newIndex) => {
      if (newIndex < 1 || newIndex > images.length) return;
      setPage(newIndex);
    },
    [images, page],
  );

  return <BindKeyboardSwipeableViews
    hysteresis={0.3} threshold={10} index={page}
    onChangeIndex={onChangeIndex}
    style={{width: '100%'}}
    slideStyle={{height: '100vh', display: 'flex', justifyContent: 'center', position: 'relative'}}
  >
    {images.map((image) =>
      <DefaultImage key={image} src={image}/>,
    )}
  </BindKeyboardSwipeableViews>
}
