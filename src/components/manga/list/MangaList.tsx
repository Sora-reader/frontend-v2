import { Grid } from '@mui/joy';
import { MangaListCard } from './MangaListCard';
import { MangaListType } from '../../../api/types';
import { LoadingProps } from '../../../common/types';
import { emptyManga } from '../../../api/stubs';

type Props = {
  mangaList?: MangaListType;
} & LoadingProps;

export const MangaList = ({ mangaList, loading }: Props) => {
  return (
    <Grid
      container
      spacing={{
        xs: 0,
        sm: 1,
        md: 2,
      }}
    >
      {loading
        ? [...Array(8)].map((_, i) => (
            <Grid xs={6} sm={4} md={3} key={`skeleton-${i}`}>
              <MangaListCard {...emptyManga} />
            </Grid>
          ))
        : mangaList &&
          mangaList.map((manga) => (
            <Grid xs={6} sm={4} md={3} key={manga.id}>
              <MangaListCard {...manga} />
            </Grid>
          ))}
    </Grid>
  );
};
