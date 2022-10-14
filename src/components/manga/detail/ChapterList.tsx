import { Chapter } from './Chapter';
import { Option, Select, Stack } from '@mui/joy';
import SortIcon from '@mui/icons-material/Sort';
import { LoadingProps } from '../../../common/types';
import { ChapterListType, ChapterType } from '../../../core/api/types';
import { useMemo, useState } from 'react';

type Props = {
  mangaId?: number;
  chapters?: ChapterListType;
} & LoadingProps;

type Sort = 'new' | 'old';
const sortMapping: Record<Sort, (a: ChapterType, b: ChapterType) => number> = {
  new: (a, b) => b.volume - a.volume || b.number - a.number,
  old: (a, b) => a.volume - b.volume || a.number - b.number,
};

export const ChapterList = ({ mangaId, chapters, loading }: Props) => {
  const [sort, setSort] = useState('new');
  const chaptersSorted = useMemo(() => chapters && [...chapters].sort(sortMapping[sort]), [sort, chapters]);

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
        <Option value="new">New first</Option>
        <Option value="old">Old first</Option>
      </Select>
      <Stack spacing={1}>
        {(loading && [...Array(8)].map((_, i) => <Chapter loading={true} key={`chapter-${i}`} />)) ||
          (chaptersSorted &&
            mangaId &&
            chaptersSorted.map((chapter) => (
              <Chapter mangaId={mangaId} chapter={chapter} key={JSON.stringify(chapter)} />
            )))}
      </Stack>
    </>
  );
};
