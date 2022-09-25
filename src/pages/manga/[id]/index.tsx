import {GetServerSideProps, NextPage} from 'next';
import {
  chapters,
  detail,
  getRunningOperationPromises,
  useChaptersQuery,
  useDetailQuery,
} from '../../../redux/api/manga';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {wrapper} from '../../../redux/store';
import {MangaDetail} from '../../../components/views/MangaDetail';
import {ChaptersWithStatus, MangaWithStatus} from '../../../common/apiTypes';

interface PollingQueryResult<T> {
  data: T | undefined;
  isLoading: boolean;

  [x: string]: any;
}

const useParsePollingQuery = <R, >(hook, arg, options, interval): PollingQueryResult<R> => {
  const [pollingOptions, setPollingOptions] = useState({});
  const {data, ...otherQueryProps} = hook(arg, {
    ...options,
    ...pollingOptions,
  });
  useEffect(() => {
    if (data && data.status === 'parsing')
      setPollingOptions({pollingInterval: interval});
    else
      setPollingOptions({});
  }, [data]);

  return {data, ...otherQueryProps} as PollingQueryResult<R>;
};

type QueryProps = {
  id: string,
}
const Manga: NextPage = () => {
  const router = useRouter();
  const {id} = router.query as QueryProps;

  const mangaQuery = useParsePollingQuery<MangaWithStatus>(
    useDetailQuery, id, {skip: !id}, 500);
  const chaptersQuery = useParsePollingQuery<ChaptersWithStatus>(
    useChaptersQuery, id, {skip: !id}, 500);

  return <MangaDetail
    manga={mangaQuery.data?.data}
    loading={mangaQuery.isLoading}
    chapters={chaptersQuery.data?.data}
    chaptersLoading={chaptersQuery.isLoading}/>;
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const id = context.params?.id;
    if (typeof id === 'string') {
      store.dispatch(detail.initiate(id));
      store.dispatch(chapters.initiate(id));
    }

    await Promise.all(getRunningOperationPromises());

    return {
      props: {},
    };
  },
);

export default Manga;
