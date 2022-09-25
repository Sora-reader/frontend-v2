import type {NextPage} from 'next';
import {GetServerSideProps} from 'next';
import {Grid} from '@mui/joy';
import {MangaListCard} from '../components/manga/MangaListCard';
import {getRunningOperationPromises, search, useSearchQuery} from '../redux/api/manga';
import {emptyManga} from '../common/apiTypes';
import {wrapper} from '../redux/store';

const query = 'невероятные джоджо';

const Home: NextPage = () => {
  const {data, isLoading} = useSearchQuery(query);

  return <>
    <h1>Sora Reader</h1>

    <Grid container spacing={2}>
      {data && data.map((manga) => <Grid xs={6} sm={4} md={3} key={manga.id}>
            <MangaListCard {...manga}/>
          </Grid>,
      ) || isLoading && [...Array(8)].map(
          (_, i) => <Grid xs={6} sm={4} md={3} key={`skeleton-${i}`}>
            <MangaListCard {...emptyManga}/>
          </Grid>,
      )}
    </Grid>
  </>;
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
      store.dispatch(search.initiate(query));

      await Promise.all(getRunningOperationPromises());

      return {
        props: {},
      };
    },
);

export default Home;
