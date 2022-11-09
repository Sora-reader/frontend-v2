import { styled } from '@mui/material/styles';
import { AspectRatio } from '@mui/joy';

// Scale readmanga's thumbnail to remove white borders and stuff
export const ScaledImage = styled('img')({
  transform: 'scale(1.2)',
});

type Props = {
  src: string;
  ratioProps?;
  imgProps?;
};

export const MangaImage = ({ src, ratioProps, imgProps }: Props) => (
  <AspectRatio ratio="310/500" {...ratioProps}>
    <ScaledImage src={src} loading="lazy" {...imgProps} />
  </AspectRatio>
);

MangaImage.defaultProps = {
  src: '',
  ratioProps: {},
  imgProps: {},
};
