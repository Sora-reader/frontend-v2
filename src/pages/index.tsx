import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { getRunningOperationPromises, search, useSearchQuery } from '../api/mangaApi';
import { wrapper } from '../core/store';
import { isClientNavigation } from '../common/utils';
import { MangaList } from '../components/manga/list/MangaList';

const query = 'поднятия уровня';

const Home: NextPage = () => {
  const { data, isLoading } = useSearchQuery(query);

  return (
    <>
      <h1>Sora Reader</h1>

      <MangaList mangaList={data} loading={isLoading} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const isClient = isClientNavigation(req);
      if (!isClient) {
        store.dispatch(search.initiate(query));

        await Promise.all(getRunningOperationPromises());
      }

      return {
        props: {},
      };
    }
);

export default Home;
