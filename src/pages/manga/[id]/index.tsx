import { NextPage } from 'next';
import { chapters, detail, useChaptersQuery, useDetailQuery } from '../../../core/api/mangaApi';
import { useRouter } from 'next/router';
import { MangaDetailView } from '../../../components/views/MangaDetailView';
import { ChaptersWithStatus, MangaWithStatus } from '../../../core/api/types';
import { extractParam, RTKSSRBoilerplate } from '../../../common/utils';
import { usePollingQuery } from '../../../core/api/hooks/api';
import { emptyManga } from '../../../core/api/stubs';

type QueryProps = {
  id: string;
};
const Manga: NextPage = () => {
  const router = useRouter();
  const { id } = router.query as QueryProps;

  const mangaQuery = usePollingQuery<MangaWithStatus>(useDetailQuery, id, { skip: !id }, 500);
  const manga = mangaQuery.data?.data || emptyManga;

  const chaptersQuery = usePollingQuery<ChaptersWithStatus>(
    useChaptersQuery,
    id,
    { skip: !id || !manga.rssUrl },
    500
  );
  const chapters = chaptersQuery.data?.data;
  const chaptersLoading = chaptersQuery.isLoading;

  return <MangaDetailView manga={manga} chapters={chapters} chaptersLoading={chaptersLoading} />;
};

export const getServerSideProps = RTKSSRBoilerplate(async (store, { params }) => {
  const id = extractParam(params, 'id');
  if (id) {
    store.dispatch(detail.initiate(id));
    store.dispatch(chapters.initiate(id));
  }
});

export default Manga;
