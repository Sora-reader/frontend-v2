import Card from '@mui/joy/Card';
import { LoadingProps } from '../../../misc/types';
import { ChapterType } from '../../../core/api/types';
import { useFakeAnchorProps } from '../../../misc/hooks';
import { useWithOptionalSkeleton } from '../../../misc/components/SoraSkeleton';

type Props = {
  mangaId: number;
  chapter: ChapterType;
} & LoadingProps;
export const Chapter = ({ mangaId, chapter: { id, title }, loading }: Props) => {
  const WithOptionalSkeleton = useWithOptionalSkeleton(loading);
  const fakeAnchorProps = useFakeAnchorProps(loading ? '#' : `/manga/${mangaId}/read/${id}`);

  // Hardcoded to mimic real card
  return (
    <WithOptionalSkeleton height="51px" width="100%" sx={{ borderRadius: 'var(--joy-radius-md)' }}>
      <Card {...fakeAnchorProps}>
        <span>{title}</span>
      </Card>
    </WithOptionalSkeleton>
  );
};

Chapter.defaultProps = {
  mangaId: -1,
  chapter: {},
  loading: false,
};
