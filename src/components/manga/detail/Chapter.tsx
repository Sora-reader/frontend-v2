import Card from '@mui/joy/Card';
import { LoadingProps } from '../../../misc/types';
import { ChapterType } from '../../../core/api/types';
import { useFakeAnchorProps } from '../../../misc/hooks';
import { Alert } from '@mui/joy';
import { WithOptionalSkeleton } from '../../../misc/components/SoraSkeleton';

type Props = {
  mangaId: number;
  chapter: ChapterType;
} & LoadingProps;
export const Chapter = ({ mangaId, chapter: { id, title, volume, number }, loading }: Props) => {
  const fakeAnchorProps = useFakeAnchorProps(loading ? '#' : `/manga/${mangaId}/read/${id}`);

  // Hardcoded to mimic real card
  return (
    <WithOptionalSkeleton
      height="51px"
      width="100%"
      sx={{ borderRadius: 'var(--joy-radius-md)' }}
      loading={loading}
    >
      <Card
        {...fakeAnchorProps}
        sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', padding: '0.5rem' }}
      >
        <Alert color="neutral" size="sm" sx={{ width: 'fit-content', marginRight: 1 }}>
          {volume}.{number}
        </Alert>
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
