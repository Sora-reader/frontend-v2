import { NextPage } from 'next';
import { images, useImagesQuery } from '../../../../core/api/mangaApi';
import { useRouter } from 'next/router';
import { ReadChapterView } from '../../../../components/views/ReadChapterView';
import { extractParam, RTKSSRBoilerplate } from '../../../../misc/utils';
import { usePollingQuery } from '../../../../core/api/hooks/api';
import { ImagesWithStatus } from '../../../../core/api/types';

type QueryProps = {
  id: string;
  chapterId: string;
};
const ReadChapter: NextPage = () => {
  const router = useRouter();
  const { id, chapterId } = router.query as QueryProps;

  const { data, isLoading } = usePollingQuery<ImagesWithStatus>(
    useImagesQuery,
    {
      mangaId: id,
      chapterPk: chapterId,
    },
    { skip: !chapterId || !id },
    500
  );

  return <ReadChapterView mangaId={id} loading={isLoading} images={data?.data} />;
};

export const getServerSideProps = RTKSSRBoilerplate(async (store, { params }) => {
  const id = extractParam(params, 'id');
  const chapterId = extractParam(params, 'chapterId');
  if (id && chapterId) {
    store.dispatch(images.initiate({ mangaId: id, chapterPk: chapterId }));
  }
});

export default ReadChapter;
