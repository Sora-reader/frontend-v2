import { MangaImage } from '../manga/MangaImage';
import { styled } from '@mui/material/styles';
import { Box, Chip, Grid, Sheet, Typography } from '@mui/joy';
import Rating from '@mui/material/Rating';
import { ChapterList } from '../manga/detail/ChapterList';
import { useIsEmptyManga, useIsPartialManga, useWithOptionalSkeleton } from '../../common/hooks';
import { memo } from 'react';
import { Chapters, MangaType } from '../../common/apiTypes';

type BgProps = {
  img?: string;
};
const Bg = styled('div')<BgProps>(({ img }) => {
  const bgColor = 'var(--joy-palette-secondary-contrastTextChannel)';
  return {
    position: 'fixed',
    height: '100vh',
    width: '100%',
    zIndex: -1,

    transform: 'scale(1.5)',
    backgroundImage: `linear-gradient(rgba(${bgColor} / 80%),rgba(${bgColor} / 60%)), url('${img}')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    WebkitFilter: 'blur(5px)',
  };
});

type Props = {
  manga: MangaType;
  chapters?: Chapters;
  chaptersLoading: boolean;
};
export const MangaDetail = memo(({ manga, chapters, chaptersLoading }: Props) => {
  const isEmptyManga = useIsEmptyManga(manga);
  const isPartialManga = useIsPartialManga(manga);
  const WithOptionalSkeleton = useWithOptionalSkeleton(isEmptyManga);

  return (
    <div>
      <Grid container spacing={2}>
        <Bg img={manga?.image} />

        <Grid xs={12} sm={12} md={4}>
          <WithOptionalSkeleton sx={{ maxWidth: '300px', my: 3 }}>
            <Sheet variant="solid" sx={{ maxWidth: '300px', borderRadius: 'md', overflow: 'auto', my: 3 }}>
              <MangaImage src={manga?.image} />
            </Sheet>
          </WithOptionalSkeleton>
        </Grid>

        <Grid sm={12} md={8}>
          <WithOptionalSkeleton width="467px" height="37px" sx={{ my: 3 }}>
            <h1>{manga?.title}</h1>
          </WithOptionalSkeleton>
          <WithOptionalSkeleton width="300px" height="37px" sx={{ my: 1 }} forceWrap={isPartialManga}>
            <Box sx={{ display: 'flex', gap: 1, marginBottom: 1, flexFlow: 'column nowrap' }}>
              <div>
                {manga?.genres.map((g) => (
                  <Chip variant="soft" key={g}>
                    {g}
                  </Chip>
                ))}
              </div>
              {manga?.rating && <Rating value={Number(manga.rating)} readOnly precision={0.1} />}
            </Box>
          </WithOptionalSkeleton>
          <WithOptionalSkeleton width="467px" height="300px" sx={{ my: 3 }} forceWrap={isPartialManga}>
            <Typography level="h6">{manga?.description}</Typography>
          </WithOptionalSkeleton>
        </Grid>

        <Grid xs={12}>
          <ChapterList mangaId={manga?.id} chapters={chapters} loading={chaptersLoading} />
        </Grid>
      </Grid>
    </div>
  );
});

MangaDetail.displayName = 'MangaDetail';
