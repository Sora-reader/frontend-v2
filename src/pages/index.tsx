import type { NextPage } from 'next';
import { MangaGrid } from '../components/manga/grid/MangaGrid';
import { useSearchQuery } from '../core/api/mangaApi';

const Home: NextPage = () => {
  const { data } = useSearchQuery('поднятие');

  return (
    <>
      <h1>Sora Reader</h1>

      {data && <MangaGrid mangaList={data.slice(0, 4)} loading={false} />}
    </>
  );
};

export default Home;
