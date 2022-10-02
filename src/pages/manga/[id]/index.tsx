import {GetServerSideProps, NextPage} from 'next';
import {
  chapters,
  detail,
  getRunningOperationPromises,
  useChaptersQuery,
  useDetailQuery,
} from '../../../redux/api/manga';
import {useRouter} from 'next/router';
import {wrapper} from '../../../redux/store';
import {MangaDetail} from '../../../components/views/MangaDetail';
import {ChaptersWithStatus, MangaWithStatus} from '../../../common/apiTypes';
import {isClientNavigation} from "../../../common/utils";
import {usePollingQuery} from "../../../common/hooks";


type QueryProps = {
  id: string,
}
const Manga: NextPage = () => {
  const router = useRouter();
  const {id} = router.query as QueryProps;

  const mangaQuery = usePollingQuery<MangaWithStatus>(useDetailQuery, id, {skip: !id}, 500);
  const chaptersQuery = usePollingQuery<ChaptersWithStatus>(useChaptersQuery, id, {skip: !id}, 500);

  return <MangaDetail mangaQuery={mangaQuery} chaptersQuery={chaptersQuery}/>;
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async ({req, params}) => {
    const isClient = isClientNavigation(req);
    if (!isClient) {
      const id = params?.id;
      if (typeof id === 'string') {
        store.dispatch(detail.initiate(id));
        store.dispatch(chapters.initiate(id));
      }

      await Promise.all(getRunningOperationPromises());
    }

    return {
      props: {},
    };
  },
);

export default Manga;
