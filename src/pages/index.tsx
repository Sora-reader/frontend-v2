import type {NextPage} from 'next';
import {Grid} from '@mui/joy';
import {MangaCard} from '../components/manga/MangaCard';

const Home: NextPage = () => {
  return <>
    <h1>
      Welcome to <a href="https://sora-reader.app">Sora reader!</a>
    </h1>

    <Grid container spacing={2}>
      {[...Array(7)].map((_, i) => <Grid xs={6} md={3} key={i}>
            <MangaCard/>
          </Grid>,
      )}
    </Grid>
  </>;
};

export default Home;
