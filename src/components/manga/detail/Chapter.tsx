import Card from '@mui/joy/Card';
import { LoadingProps } from '../../../misc/types';
import { ChapterType } from '../../../core/api/types';
import { useFakeAnchorProps } from '../../../misc/hooks';
import { Alert, Box, IconButton, Typography } from '@mui/joy';
import { WithOptionalSkeleton } from '../../../misc/components/SoraSkeleton';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import { useRemoveBookmarkMutation, useSetBookmarkMutation } from '../../../core/bookmarks/api';
import { useCallback } from 'react';

type Props = {
  mangaId: number;
  chapter: ChapterType;
  isBookmark: boolean | null;
  isNew: boolean;
} & LoadingProps;
export const Chapter = ({
  mangaId,
  chapter: { id, title, volume, number },
  loading,
  isBookmark,
  isNew,
}: Props) => {
  const fakeAnchorProps = useFakeAnchorProps(loading ? '#' : `/manga/${mangaId}/read/${id}`);

  const [setBookmark] = useSetBookmarkMutation();
  const [removeBookmark] = useRemoveBookmarkMutation();

  const onClick = useCallback(() => {
    const f = isBookmark ? removeBookmark : setBookmark;
    f({ mangaId, chapterId: id });
  }, [isBookmark]);

  // Hardcoded to mimic real card
  return (
    <WithOptionalSkeleton
      height="51px"
      width="100%"
      sx={{
        borderRadius: 'var(--joy-radius-md)',
      }}
      loading={loading}
    >
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexFlow: 'row nowrap',
          padding: '0.5rem',
          justifyContent: 'space-between',
          width: '100%',
          opacity: isNew ? 1 : 0.6,
        }}
      >
        <Box
          {...fakeAnchorProps}
          sx={{
            display: 'flex',
            flexFlow: 'row nowrap',
            alignItems: 'center',
            width: '-moz-available',
          }}
        >
          <Alert color="neutral" size="sm" sx={{ width: 'fit-content', marginRight: 1 }}>
            {volume}.{number}
          </Alert>
          <Typography sx={{ width: '-moz-available' }}>{title}</Typography>
        </Box>
        {isBookmark !== null && (
          <IconButton color={isBookmark ? 'primary' : 'neutral'} onClick={onClick}>
            {isBookmark ? <BookmarkRemoveIcon /> : <BookmarkAddIcon />}
          </IconButton>
        )}
      </Card>
    </WithOptionalSkeleton>
  );
};

Chapter.defaultProps = {
  mangaId: -1,
  chapter: {},
  loading: false,
  isBookmark: false,
  isNew: false,
};
