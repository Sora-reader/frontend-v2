import { Grid } from '@mui/joy';
import { MangaGridCard } from './MangaGridCard';
import { MangaListType } from '../../../core/api/types';
import { LoadingProps } from '../../../misc/types';
import { emptyManga } from '../../../core/api/stubs';

type Props = {
  mangaList?: MangaListType;
} & LoadingProps;

export const MangaGrid = ({ mangaList, loading }: Props) => {
  return (
    <Grid
      container
      spacing={{
        xs: 0,
        sm: 1,
        md: 2,
      }}
      sx={{
        width: '100%',
        height: 'auto',
      }}
    >
      {loading
        ? [...Array(8)].map((_, i) => (
            <Grid xs={6} sm={4} md={3} key={`skeleton-${i}`}>
              <MangaGridCard {...emptyManga} />
            </Grid>
          ))
        : mangaList &&
          mangaList.map((manga) => (
            <Grid xs={6} sm={4} md={3} key={manga.id}>
              <MangaGridCard {...manga} />
            </Grid>
          ))}
    </Grid>
  );
};
