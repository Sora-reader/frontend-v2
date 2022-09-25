import {NextPage} from 'next';
import {useImagesQuery} from '../../../../redux/api/manga';
import {useRouter} from 'next/router';
import {Box} from '@mui/joy';

const Image = ({src, position}) => {
  // return <img loading="lazy" width="130px" id={`image=${position}`} src={src} alt=""/>
  return <img loading="lazy" id={`image=${position}`} src={src} alt=""/>
}

type QueryProps = {
  id: string,
  chapterId: string,
}
const ReadChapter: NextPage = () => {
  const router = useRouter();
  const {id, chapterId} = router.query as QueryProps;
  const {data, isLoading} = useImagesQuery(
      {mangaPk: id, chapterPk: chapterId},
      {skip: !chapterId || !id},
  );

  return <Box sx={{display: 'flex', flexFlow: 'column nowrap', alignItems: 'center', gap: '.5rem'}}>
    {data && data.map(
        (src, position) => <Image key={src} src={src} position={position}/>)
    }
  </Box>;
};

export default ReadChapter;
