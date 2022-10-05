import { styled } from '@mui/material/styles';
import { AspectRatio } from '@mui/joy';

// Scale readmanga's thumbnail to remove white borders and stuff
const ScaledImage = styled('img')({
  transform: 'scale(1.2)',
});

type Props = {
  src: string;
};

export const MangaImage = ({ src }: Props) => (
  <AspectRatio ratio="310/500">
    <ScaledImage src={src} loading="lazy" />
  </AspectRatio>
);

MangaImage.defaultProps = {
  src: '',
};
