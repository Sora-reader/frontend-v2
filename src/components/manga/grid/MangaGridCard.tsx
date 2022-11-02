import Card from '@mui/joy/Card';
import { Typography } from '@mui/joy';
import { useFakeAnchorProps } from '../../../misc/hooks';
import { MangaType } from '../../../core/api/types';
import { MangaImage } from '../MangaImage';
import { useIsEmptyManga } from '../../../core/api/hooks/manga';
import { useWithOptionalSkeleton } from '../../../misc/components/SoraSkeleton';

const lineClampSx = (line: number) => ({
  overflow: 'hidden',
  WebkitLineClamp: String(line),
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

type Props = MangaType;

export const MangaGridCard = ({ id, title, image }: Props) => {
  const isEmptyManga = useIsEmptyManga(id);
  const fakeLinkProps = useFakeAnchorProps(isEmptyManga ? '#' : `/manga/${id}`);
  const WithOptionalSkeleton = useWithOptionalSkeleton(isEmptyManga);

  return (
    <Card
      {...fakeLinkProps}
      variant="outlined"
      sx={(theme) => ({
        [theme.breakpoints.down('sm')]: {
          padding: '.7rem',
        },
      })}
    >
      <div>
        <WithOptionalSkeleton width="100%" height="3rem" sx={{ mb: '1rem' }}>
          <Typography
            component="h2"
            fontWeight="bold"
            marginBottom="1rem !important"
            sx={{
              height: '3rem',
              ...lineClampSx(2),
            }}
          >
            {title}
          </Typography>
        </WithOptionalSkeleton>
        <WithOptionalSkeleton width="100%" height="329px">
          <MangaImage src={image} />
        </WithOptionalSkeleton>
      </div>
    </Card>
  );
};
