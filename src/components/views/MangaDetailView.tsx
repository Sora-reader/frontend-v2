import { MangaImage } from '../manga/MangaImage';
import { styled } from '@mui/system';
import { Box, Chip, Grid, Sheet, Typography } from '@mui/joy';
import Rating from '@mui/material/Rating';
import { memo } from 'react';
import { ChapterListType, MangaType } from '../../core/api/types';
import { useIsEmptyManga, useIsPartialManga } from '../../core/api/hooks/manga';
import { ChapterList } from '../manga/detail/ChapterList';
import { ListSelect } from '../manga/lists/ListSelect';
import PublicIcon from '@mui/icons-material/Public';
import { WithOptionalSkeleton } from '../../misc/components/SoraSkeleton';

type BgProps = {
  img?: string;
};
export const bgGradientColor = 'var(--joy-palette-secondary-contrastTextChannel)';
const Bg = styled('div')<BgProps>(({ img }) => {
  return {
    position: 'fixed',
    height: '100vh',
    width: '100%',
    zIndex: -1,

    transform: 'scale(1.5)',
    backgroundImage: `linear-gradient(rgba(${bgGradientColor} / 80%),rgba(${bgGradientColor} / 60%)), url('${img}')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    WebkitFilter: 'blur(5px)',
  };
});

const lineClampSx = (line: number) => ({
  overflow: 'hidden',
  WebkitLineClamp: String(line),
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

type Props = {
  manga: MangaType;
  chapters?: ChapterListType;
  chaptersLoading: boolean;
};
export const MangaDetailView = memo(({ manga, chapters, chaptersLoading }: Props) => {
  const isEmptyManga = useIsEmptyManga(manga);
  const isPartialManga = useIsPartialManga(manga);

  return (
    <div>
      <Grid container spacing={2}>
        <Bg img={manga?.image} />

        <Grid xs={12} sm={4} md={4}>
          <WithOptionalSkeleton sx={{ maxWidth: '300px', mb: 1, mt: 1 }} loading={isEmptyManga}>
            <Sheet
              variant="solid"
              sx={{ maxWidth: '300px', borderRadius: 'md', overflow: 'auto', mb: 1, mt: 1 }}
            >
              <MangaImage src={manga?.image} />
            </Sheet>
          </WithOptionalSkeleton>

          <WithOptionalSkeleton sx={{ maxWidth: '300px' }} loading={isEmptyManga}>
            <ListSelect mangaId={manga.id} selectSx={{ maxWidth: '300px' }} />
          </WithOptionalSkeleton>
        </Grid>

        <Grid xs={12} sm={8} md={8}>
          <WithOptionalSkeleton width="467px" height="37px" sx={{ marginBottom: 0 }} loading={false}>
            <h1 style={{ marginBottom: 0 }}>{manga?.title}</h1>
          </WithOptionalSkeleton>

          <Box
            sx={{
              display: 'flex',
              flexFlow: 'row wrap',
              gap: 1,
              alignContent: 'center',
              alignItems: 'center',
              mb: 1,
            }}
          >
            <WithOptionalSkeleton
              width="130px"
              height="32px"
              sx={{ borderRadius: '1.5rem' }}
              loading={isEmptyManga}
            >
              <Chip
                variant="soft"
                startDecorator={<PublicIcon />}
                component="a"
                href={manga.sourceUrl}
                children={manga.source}
              />
            </WithOptionalSkeleton>

            <WithOptionalSkeleton loading={manga?.rating === undefined}>
              {manga.rating && <Rating value={Number(manga.rating)} readOnly precision={0.1} />}
            </WithOptionalSkeleton>
          </Box>

          <WithOptionalSkeleton width="300px" height="37px" loading={isPartialManga}>
            <Box sx={{ display: 'flex', gap: 0.5, marginBottom: 1 }}>
              {manga?.genres.map((g) => (
                <Chip variant="soft" key={g} children={g} />
              ))}
            </Box>
          </WithOptionalSkeleton>

          <WithOptionalSkeleton width="467px" height="300px" sx={{ my: 3 }} loading={isPartialManga}>
            <Typography level="h5" sx={lineClampSx(10)}>
              {manga?.description}
            </Typography>
          </WithOptionalSkeleton>
        </Grid>

        <Grid xs={12}>
          <ChapterList mangaId={manga?.id} chapters={chapters} loading={chaptersLoading} />
        </Grid>
      </Grid>
    </div>
  );
});

MangaDetailView.displayName = 'MangaDetail';
