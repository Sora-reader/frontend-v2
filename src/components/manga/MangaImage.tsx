import { AspectRatio } from '@mui/joy';
import Image from 'next/image';

export const BaseMangaImage = ({ ...props }: any) => <Image layout="fill" {...props} />;

type Props = {
  src: string;
  ratioProps?;
  imgProps?;
};

export const MangaImage = ({ src, ratioProps, imgProps }: Props) => (
  <AspectRatio ratio="310/500" {...ratioProps}>
    <BaseMangaImage src={src} loading="lazy" {...imgProps} />
  </AspectRatio>
);

MangaImage.defaultProps = {
  src: '',
  ratioProps: {},
  imgProps: {},
};
