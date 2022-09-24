import Card from '@mui/joy/Card';
import {LoadingProps, useWithOptionalSkeleton} from '../../../common/components';
import {ChapterType} from '../../../common/apiTypes';
import {useFakeAnchorProps} from '../../../common/hooks';

type Props = {
  chapter: ChapterType,
} & LoadingProps
export const Chapter = ({chapter: {title}, loading}: Props) => {
  const WithOptionalSkeleton = useWithOptionalSkeleton(loading);
  const fakeAnchorProps = useFakeAnchorProps(`/read/`);

  // Hardcoded to mimic real card
  return <WithOptionalSkeleton height="51px" width="100%" sx={{borderRadius: 'var(--joy-radius-md)'}}>
    <Card {...fakeAnchorProps}>
      <span>{title}</span>
    </Card>
  </WithOptionalSkeleton>;
};

Chapter.defaultProps = {
  chapter: {},
  loading: false,
};
