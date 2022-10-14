import { NextPage } from 'next';
import { useImagesQuery } from '../../../../core/api/mangaApi';
import { useRouter } from 'next/router';
import { ReadChapterView } from '../../../../components/views/ReadChapterView';

type QueryProps = {
  id: string;
  chapterId: string;
};
const ReadChapter: NextPage = () => {
  const router = useRouter();
  const { id, chapterId } = router.query as QueryProps;
  const { data } = useImagesQuery({ mangaPk: id, chapterPk: chapterId }, { skip: !chapterId || !id });

  return <ReadChapterView mangaId={id} images={data} />;
};

export default ReadChapter;
