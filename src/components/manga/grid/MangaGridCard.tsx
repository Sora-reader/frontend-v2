import Card from '@mui/joy/Card';
import { CardContent, CardCover, Typography } from '@mui/joy';
import { useFakeAnchorProps } from '../../../misc/hooks';
import { MangaType } from '../../../core/api/types';
import { BaseMangaImage, MangaImage } from '../MangaImage';
import { useIsEmptyManga } from '../../../core/api/hooks/manga';
import { bgGradientColor } from '../../views/MangaDetailView';
import { WithOptionalSkeleton } from '../../../misc/components/SoraSkeleton';

type Props = MangaType;

export const MangaGridCard = ({ id, title, image }: Props) => {
  const isEmptyManga = useIsEmptyManga(id);
  const fakeLinkProps = useFakeAnchorProps(isEmptyManga ? '#' : `/manga/${id}`);

  return (
    <WithOptionalSkeleton width="100%" height="350px" loading={isEmptyManga}>
      <Card
        {...fakeLinkProps}
        variant="outlined"
        sx={(theme) => ({
          border: 'none',
          padding: 0,
          [theme.breakpoints.down('sm')]: {
            padding: '.6rem',
          },
        })}
      >
        <CardCover sx={{ overflow: 'hidden' }}>
          <BaseMangaImage src={image} alt="manga-background" />
        </CardCover>
        <CardCover
          sx={{
            background: `linear-gradient(rgba(${bgGradientColor} / 0%), rgba(${bgGradientColor} / 80%))`,
          }}
        />
        <CardContent sx={{ justifyContent: 'flex-end' }}>
          <Typography level="h2" fontSize="inherit" sx={{ position: 'absolute', padding: 2 }}>
            {title}
          </Typography>
          {/* Those props are a hack to size the Card as it would contain an image
          while the image is a CardCover which doesn't dictate height */}
          <MangaImage
            src={image}
            imgProps={{ style: { opacity: 0 } }}
            ratioProps={{ sx: { div: { backgroundColor: 'transparent' } } }}
            alt={`card-image-for-${title}`}
          />
        </CardContent>
      </Card>
    </WithOptionalSkeleton>
  );
};
