import { AspectRatio } from '@mui/joy';
import Image from 'next/image';

export const BaseMangaImage = ({ ...props }: any) => <Image fill sizes="33vw" {...props} />;

type Props = {
  src: string;
  ratioProps?;
  imgProps?;
  alt;
};

export const MangaImage = ({ src, ratioProps, imgProps, alt }: Props) => (
  <AspectRatio ratio="310/500" {...ratioProps}>
    <BaseMangaImage src={src} loading="lazy" {...imgProps} alt={alt} />
  </AspectRatio>
);

MangaImage.defaultProps = {
  src: '',
  ratioProps: {},
  imgProps: {},
};
