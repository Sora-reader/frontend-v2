import {Box, IconButton} from '@mui/joy';
import {useEffect, useState} from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {ChapterImageList} from "../../common/apiTypes";
import {buttonContainerSx, Navbar} from "../layout/Navbar/Navbar";
import {useFakeAnchorProps} from "../../common/hooks";
import {getPagerType, PagerType} from "../../common/types";
import {WebtoonPager} from "../pager/webtoon/WebtoonPager";
import {PageAlert} from "../pager/PageAlert";

type Props = {
  images?: ChapterImageList,
}
export const ReadChapterView = ({images}: Props) => {
  const [page, setPage] = useState(1);
  const mangaAnchorProps = useFakeAnchorProps('/');

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

  return <>
    <Navbar render={renderNavbarIcons}/>
    {images && <PageAlert page={page} images={images}/>}
    {
      images && (pagerType === 'webtoon' ? <WebtoonPager images={images} setPage={setPage}/> : null)
    }
  </>
};
