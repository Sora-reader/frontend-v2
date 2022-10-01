import {Box, IconButton} from '@mui/joy';
import {useCallback, useEffect, useState} from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {ChapterImageList} from "../../common/apiTypes";
import {buttonContainerSx, Navbar} from "../layout/Navbar/Navbar";
import {useFakeAnchorProps} from "../../common/hooks";
import {getPagerType, PagerType} from "../../common/types";
import {WebtoonPager} from "../pager/webtoon/WebtoonPager";
import {PageAlert} from "../pager/PageAlert";
import {DefaultPager} from "../pager/default/DefaultPager";
import {PagerProps} from "../pager/types";
import {Slide} from "@mui/material";
import {useIsNavbarWrapped} from "../layout/Navbar/utils";

type Props = {
  mangaId: string,
  images?: ChapterImageList,
}
export const ReadChapterView = ({images, mangaId}: Props) => {
  const [page, setPage] = useState(1);
  const mangaAnchorProps = useFakeAnchorProps(`/manga/${mangaId}/`);
  const [showNavbar, setShowNavbar] = useState(true);
  const isNavbarWrapped = useIsNavbarWrapped();

  const [pagerType, setPagerType] = useState<PagerType>('default');
  useEffect(() => {
    if (images) {
      const img = new Image();
      img.src = images[0];
      img.onload = (e) => {
        setPagerType(getPagerType(e.target as HTMLImageElement));
      };
    }
  }, [images]);

  const renderNavbarIcons = () => {
    return <Box sx={buttonContainerSx}>
      <IconButton {...mangaAnchorProps}>
        <ArrowBackIcon/>
      </IconButton>
    </Box>
  }

  const basePagerProps = {
    images,
    setPage,
    setShowNavbar: useCallback(() => setShowNavbar(p => !p), [setShowNavbar]),
  } as PagerProps;
  // Force type as images won't be undefined when used

  return <>
    <Slide direction={isNavbarWrapped ? "up" : "right"} in={showNavbar} appear={false}>
      <Navbar render={renderNavbarIcons}/>
    </Slide>
    {images && <PageAlert page={page} images={images}/>}
    {
      images && (pagerType === 'webtoon' ? <WebtoonPager {...basePagerProps}/> :
        <DefaultPager {...basePagerProps} page={page}/>)
    }
  </>
};