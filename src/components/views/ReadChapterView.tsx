import { Box, IconButton } from '@mui/joy';
import { useCallback, useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ChapterImageList } from '../../core/api/types';
import { buttonContainerSx, Navbar } from '../layout/Navbar';
import { useFakeAnchorProps } from '../../misc/hooks';
import { WebtoonPager } from '../pager/webtoon/WebtoonPager';
import { PageAlert } from '../pager/PageAlert';
import { DefaultPager } from '../pager/default/DefaultPager';
import { PagerProps, PagerType } from '../pager/types';
import { Slide } from '@mui/material';
import { useIsNavbarWrapped } from '../layout/Navbar/utils';
import { getPagerType } from '../pager/utils';
import { LoadingProps } from '../../misc/types';
import { LogoSpinner } from '../../misc/components/LogoSpinner';
import ChangeChapterIcon from '@mui/icons-material/FormatAlignJustify';
import ChangePagerIcon from '@mui/icons-material/AutoStories';

type Props = {
  mangaId: string;
  images?: ChapterImageList;
} & LoadingProps;

export const ReadChapterView = ({ mangaId, images }: Props) => {
  const [page, setPage] = useState(1);
  const mangaAnchorProps = useFakeAnchorProps(`/manga/${mangaId}/`);
  const [showNavbar, setShowNavbar] = useState(true);
  const isNavbarWrapped = useIsNavbarWrapped();

  const [pagerType, setPagerType] = useState<PagerType>('default');
  const [firstImageLoading, setFirstImageLoading] = useState(true);

  // Wait for the first image to fully load and then determine pager type + allow rendering
  useEffect(() => {
    const img = new Image();
    if (images) {
      img.src = images[0];
      if (img.complete) {
        setFirstImageLoading(false);
        setPagerType(getPagerType(img as HTMLImageElement));
      } else {
        img.onload = (e) => {
          setFirstImageLoading(false);
          setPagerType(getPagerType(e.target as HTMLImageElement));
        };
      }
    }
  }, [images]);

  const renderNavbarIcons = useCallback(() => {
    return (
      <Box
        sx={[
          buttonContainerSx,
          {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          },
        ]}
      >
        <IconButton {...mangaAnchorProps}>
          <ArrowBackIcon />
        </IconButton>
        <IconButton>
          <ChangeChapterIcon />
        </IconButton>
        <IconButton>
          <ChangePagerIcon />
        </IconButton>
      </Box>
    );
  }, [mangaAnchorProps]);

  const basePagerProps = {
    images,
    setPage,
    setShowNavbar: useCallback(() => setShowNavbar((p) => !p), [setShowNavbar]),
  } as PagerProps;
  // Force type as images won't be undefined when used

  return firstImageLoading ? (
    <LogoSpinner />
  ) : (
    <>
      <Slide direction={isNavbarWrapped ? 'up' : 'right'} in={showNavbar} appear={false}>
        <Navbar render={renderNavbarIcons} />
      </Slide>
      {images && <PageAlert page={page} images={images} />}
      {images &&
        (pagerType === 'webtoon' ? (
          <WebtoonPager {...basePagerProps} />
        ) : (
          <DefaultPager {...basePagerProps} page={page} />
        ))}
    </>
  );
};
