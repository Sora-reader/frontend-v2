import Card from '@mui/joy/Card';
import {AspectRatio, Typography} from '@mui/joy';
import {useFakeAnchorProps} from '../../common/hooks';
import {Manga, useIsEmptyManga} from '../../common/apiTypes';
import {Skeleton} from '@mui/material';

type Props = Manga;

export const MangaCard = ({id, title, description, image, source_url}: Props) => {
  const fakeLinkProps = useFakeAnchorProps(source_url);

  const isEmptyManga = useIsEmptyManga(id);

  // TODO: Move out of the component
  const useWithOptionalSkeleton = (shouldWrap: boolean) => ({children, ...props}) => shouldWrap ?
      <Skeleton {...props}>
        {children}
      </Skeleton> :
      children;
  const WithOptionalSkeleton = useWithOptionalSkeleton(isEmptyManga);

  // TODO: move out
  const lineClampSx = (line: number) => ({
    overflow: 'hidden',
    WebkitLineClamp: String(line),
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
  });

  return <Card
      {...fakeLinkProps}
      variant="outlined"
  >
    <div>
      <WithOptionalSkeleton width="100%" height="4rem">
        <Typography component="h2" fontWeight="bold" marginBottom="1rem !important" sx={{
          height: '3rem',
          ...lineClampSx(2),
        }}>
          {title}
        </Typography>
      </WithOptionalSkeleton>
      <WithOptionalSkeleton width="100%" height="300px">
        <AspectRatio ratio="310/500" sx={{my: 2}}>
          <img src={image} alt=""/>
        </AspectRatio>
      </WithOptionalSkeleton>
      {description &&
          <Typography sx={{
            height: '3rem',
            ...lineClampSx(2),
          }}>
            {description}
            jqedwqwdqwdqwdqwbhdbqwdjqwbdqqw
            jqedwqwdqwdqwdqwbhdbqwdjqwbdqqw
            jqedwqwdqwdqwdqwbhdbqwdjqwbdqqw
          </Typography>
      }
    </div>
  </Card>;
};
