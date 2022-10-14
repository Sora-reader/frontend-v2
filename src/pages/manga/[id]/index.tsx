import { GetServerSideProps, NextPage } from 'next';
import {
  chapters,
  detail,
  getRunningOperationPromises,
  useChaptersQuery,
  useDetailQuery,
} from '../../../core/api/mangaApi';
import { useRouter } from 'next/router';
import { wrapper } from '../../../core/store';
import { MangaDetailView } from '../../../components/views/MangaDetailView';
import { ChaptersWithStatus, MangaWithStatus } from '../../../core/api/types';
import { isClientNavigation } from '../../../common/utils';
import { usePollingQuery } from '../../../core/api/hooks/api';
import { emptyManga } from '../../../core/api/stubs';

type QueryProps = {
  id: string;
};
const Manga: NextPage = () => {
  const router = useRouter();
  const { id } = router.query as QueryProps;

  const mangaQuery = usePollingQuery<MangaWithStatus>(useDetailQuery, id, { skip: !id }, 500);
  const chaptersQuery = usePollingQuery<ChaptersWithStatus>(useChaptersQuery, id, { skip: !id }, 500);

  const manga = mangaQuery.data?.data || emptyManga;
  const chapters = chaptersQuery.data?.data;
  const chaptersLoading = chaptersQuery.isLoading;

  return <MangaDetailView manga={manga} chapters={chapters} chaptersLoading={chaptersLoading} />;
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      const isClient = isClientNavigation(req);
      if (!isClient) {
        const id = params?.id;
        if (typeof id === 'string' && id !== 'undefined') {
          store.dispatch(detail.initiate(id));
          store.dispatch(chapters.initiate(id));
        }

        await Promise.all(getRunningOperationPromises());
      }

      return {
        props: {},
      };
    }
);

export default Manga;
