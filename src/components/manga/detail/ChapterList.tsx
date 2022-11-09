import { Chapter } from './Chapter';
import { Option, Select, Stack } from '@mui/joy';
import SortIcon from '@mui/icons-material/Sort';
import { LoadingProps } from '../../../misc/types';
import { ChapterListType, ChapterType } from '../../../core/api/types';
import { useMemo, useState } from 'react';
import { WithOptionalSkeleton } from '../../../misc/components/SoraSkeleton';

type Props = {
  mangaId: number;
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
  const chaptersLoaded = chaptersSorted && mangaId;

  return (
    <>
      <WithOptionalSkeleton loading={loading}>
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
      </WithOptionalSkeleton>
      <Stack spacing={1}>
        {(loading && [...Array(8)].map((_, i) => <Chapter loading={true} key={`chapter-${i}`} />)) ||
          (chaptersLoaded &&
            chaptersSorted.map((chapter) => (
              <Chapter mangaId={mangaId} chapter={chapter} key={JSON.stringify(chapter)} />
            )))}
      </Stack>
    </>
  );
};

ChapterList.defaultProps = {
  mangaId: -1,
};
