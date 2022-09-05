import type {NextPage} from 'next';
import {Grid} from '@mui/joy';;
import {MangaCard} from '../components/manga/MangaCard';
import {useSearchQuery} from '../redux/api/manga';
import {emptyManga} from '../common/apiTypes';

const Home: NextPage = () => {
  const {data, isLoading} = useSearchQuery('клинок демонов');

  return <>
    <h1>Sora Reader</h1>
    <h4>Last viewed</h4>

    <Grid container spacing={2}>
      {data && data.map((manga, i) => <Grid xs={6} md={3} key={manga.id}>
            <MangaCard {...manga}/>
          </Grid>,
      ) || isLoading && [...Array(8)].map((_, i) => <Grid xs={6} md={3} key={i}>
            <MangaCard {...emptyManga}/>
          </Grid>,
      )}


    </Grid>
  </>;
};

export default Home;
