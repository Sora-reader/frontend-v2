import type { NextPage } from 'next';
import { MangaList } from '../components/manga/list/MangaList';

const Home: NextPage = () => {
  return (
    <>
      <h1>Sora Reader</h1>

      <MangaList mangaList={[]} loading={true} />
    </>
  );
};

export default Home;
