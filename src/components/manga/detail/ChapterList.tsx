import { Chapter } from './Chapter';
import { Card, Option, Select, Stack, Typography } from '@mui/joy';
import SortIcon from '@mui/icons-material/Sort';
import { LoadingProps } from '../../../misc/types';
import { ChapterListType, ChapterType } from '../../../core/api/types';
import { useMemo, useState } from 'react';
import { useIsEmptyManga } from '../../../core/api/hooks/manga';
import { useGetBookmarkQuery } from '../../../core/bookmarks/api';

type Props = {
  mangaId: number;
  chapters: ChapterListType;
} & LoadingProps;

type Sort = 'new' | 'old';
const sortMapping: Record<Sort, (a: ChapterType, b: ChapterType) => number> = {
  new: (a, b) => b.volume - a.volume || b.number - a.number,
  old: (a, b) => a.volume - b.volume || a.number - b.number,
};

export const ChapterList = ({ mangaId, chapters, loading }: Props) => {
  const [sort, setSort] = useState('new');
  const chaptersSorted = useMemo(() => [...chapters].sort(sortMapping[sort]), [sort, chapters]);

  const isEmptyManga = useIsEmptyManga(mangaId);
  const { data: bookmark, isLoading: bookmarksLoading } = useGetBookmarkQuery(mangaId, {
    skip: isEmptyManga,
  });

  const isInitialized = !isEmptyManga;
  const chaptersLoading = !isInitialized || loading;
  const skeletonCount = chaptersSorted.length ? 1 : 8;

  const bookmarkedChapterIndex =
    bookmarksLoading || !bookmark ? -1 : chaptersSorted.findIndex((c) => c.id === bookmark.chapterId);

  return (
    <>
      <Select
        startDecorator={<SortIcon />}
        placeholder=""
        value={sort}
        onChange={(e, v) => setSort(v as Sort)}
        variant="soft"
        sx={[
          { marginBottom: 1, backgroundColor: 'var(--joy-palette-neutral-softBg)', width: 'fit-content' },
          { '&:hover': { backgroundColor: 'var(--joy-palette-neutral-softHoverBg)' } },
        ]}
      >
        <Option value="new">Новые</Option>
        <Option value="old">Старые</Option>
      </Select>
      <Stack spacing={1}>
        {chaptersLoading &&
          [...Array(skeletonCount)].map((_, i) => <Chapter loading={true} key={`chapter-${i}`} />)}
        {chaptersSorted.map((chapter, ind) => (
          <Chapter
            mangaId={mangaId}
            chapter={chapter}
            key={JSON.stringify(chapter)}
            isBookmark={ind === bookmarkedChapterIndex}
            isNew={
              bookmarkedChapterIndex !== -1
                ? sort === 'new'
                  ? ind < bookmarkedChapterIndex
                  : ind > bookmarkedChapterIndex
                : true
            }
          />
        ))}
        {!chaptersLoading && !chaptersSorted.length && (
          <Card>
            <Typography level="body1" textAlign="center">
              Список глав пуст. Попробуйте проверить источник
            </Typography>
          </Card>
        )}
      </Stack>
    </>
  );
};

ChapterList.defaultProps = {
  mangaId: -1,
  chapters: [],
};
