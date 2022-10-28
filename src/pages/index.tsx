import type { NextPage } from 'next';
import { search, useSearchQuery } from '../core/api/mangaApi';
import { RTKSSRBoilerplate } from '../misc/utils';
import { MangaList } from '../components/manga/list/MangaList';

const query = 'бродяга';

const Home: NextPage = () => {
  const { data, isLoading } = useSearchQuery(query);

  return (
    <>
      <h1>Sora Reader</h1>

      <MangaList mangaList={data} loading={isLoading} />
    </>
  );
};

export const getServerSideProps = RTKSSRBoilerplate(async (store) => {
  store.dispatch(search.initiate(query));
});

export default Home;
