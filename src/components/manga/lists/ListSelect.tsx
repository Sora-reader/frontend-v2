import { Option, Select } from '@mui/joy';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useAddToListMutation, useGetListsQuery, useRemoveFromListMutation } from '../../../core/lists/api';
import { inWhichListId } from '../../../core/lists/utils';
import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../../core/notificationSystem/slice';
import { useFutureMemo } from '../../../misc/hooks/useFututreMemo';
import { WithOptionalSkeleton } from '../../../misc/components/SoraSkeleton';

type Props = {
  mangaId: number;
  selectSx;
};

export const ListSelect = ({ mangaId, selectSx }: Props) => {
  const dispatch = useDispatch();

  const { data: listsData, isLoading: listsFetching } = useGetListsQuery(null);
  const [listId, setFutureListId] = useFutureMemo(
    useMemo(() => inWhichListId(mangaId, listsData), [listsData, mangaId])
  );

  const [addToList] = useAddToListMutation();
  const [removeFromList] = useRemoveFromListMutation();

  const onListChange = useCallback(
    (e, newListId) => {
      e.preventDefault();
      // If removing existing list
      if (!newListId && listId) {
        setFutureListId(undefined);
        removeFromList({ listId, mangaId }).then(() => {
          dispatch(addNotification({ message: 'Манга убрана из списка', type: 'warning' }));
        });
      }
      // Or if changed to NEW list
      else if (newListId && newListId !== listId) {
        setFutureListId(newListId);
        addToList({ listId: newListId, mangaId }).then(() => {
          dispatch(addNotification({ message: 'Манга добавлена в список', type: 'success' }));
        });
      }
    },
    [listId, mangaId]
  );

  return (
    <WithOptionalSkeleton width="180px" loading={listsFetching}>
      <Select
        startDecorator={<FormatListBulletedIcon />}
        variant="soft"
        indicator={null}
        sx={selectSx}
        onChange={onListChange}
        value={listId || false}
      >
        <Option value={false}>Выберите список</Option>
        {listsData &&
          listsData.map((l) => (
            <Option key={`list-${l.id}`} value={l.id}>
              {l.name}
            </Option>
          ))}
      </Select>
    </WithOptionalSkeleton>
  );
};
