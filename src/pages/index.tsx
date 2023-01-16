import type { NextPage } from 'next';
import { useSearchQuery } from "../core/api/mangaApi";
import { MangaGrid } from "../components/manga/grid/MangaGrid";

const Home: NextPage = () => {
  const { data } = useSearchQuery('бибоп');

  return (
    <>
      <h1>Sora Reader</h1>
      {data && <MangaGrid mangaList={data.slice(0, 4)} loading={false} />}
    </>
  );
};

export default Home;
