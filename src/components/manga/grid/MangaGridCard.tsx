import Card from '@mui/joy/Card';
import { CardContent, CardCover, Typography } from "@mui/joy";
import { useFakeAnchorProps } from '../../../misc/hooks';
import { MangaType } from '../../../core/api/types';
import { MangaImage, ScaledImage } from '../MangaImage';
import { useIsEmptyManga } from '../../../core/api/hooks/manga';
import { useWithOptionalSkeleton } from '../../../misc/components/SoraSkeleton';
import { bgGradientColor } from '../../views/MangaDetailView';

type Props = MangaType;

export const MangaGridCard = ({ id, title, image }: Props) => {
  const isEmptyManga = useIsEmptyManga(id);
  const fakeLinkProps = useFakeAnchorProps(isEmptyManga ? '#' : `/manga/${id}`);
  const WithOptionalSkeleton = useWithOptionalSkeleton(isEmptyManga);

  return (
    <WithOptionalSkeleton width="100%" height="3rem" sx={{ mb: '1rem' }}>
      <Card
        {...fakeLinkProps}
        variant="outlined"
        sx={(theme) => ({
          border: 'none',
          [theme.breakpoints.down('sm')]: {
            padding: '.6rem',
          },
        })}
      >
        <CardCover sx={{ overflow: 'hidden' }}>
          <ScaledImage src={image} />
        </CardCover>
        <CardCover
          sx={{
            background: `linear-gradient(rgba(${bgGradientColor} / 0%), rgba(${bgGradientColor} / 80%))`,
          }}
        />
        <CardContent sx={{ justifyContent: 'flex-end' }}>
          <Typography level="h2" fontSize="inherit" sx={{ position: 'absolute' }}>
            {title}
          </Typography>
          {/* Those props are a hack to size the Card as it would contain an image
          while the image is a CardCover which doesn't dictate height */}
          <MangaImage
            src={image}
            imgProps={{ sx: { opacity: 0 } }}
            ratioProps={{ sx: { div: { backgroundColor: 'transparent' } } }}
          />
        </CardContent>
      </Card>
    </WithOptionalSkeleton>
  );
};
