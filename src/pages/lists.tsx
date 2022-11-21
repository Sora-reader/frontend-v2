import { NextPage } from 'next';
import { useGetListsQuery } from '../core/lists/api';
import { Tab, TabList, Tabs, useTheme } from '@mui/joy';
import { useCallback, useState } from 'react';
import { MangaGrid } from '../components/manga/grid/MangaGrid';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import { Breakpoint, useMediaQuery } from '@mui/material';
import { TabSelectWithModal } from '../components/system/TabSelectWithModal';

const mobileBP: Breakpoint = 'sm';
const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

const ListsPage: NextPage = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down(mobileBP));

  const { data, isLoading } = useGetListsQuery(null);
  const [tab, setTab] = useState<number>(0);
  const [modal, setModal] = useState(false);

  const onChangeIndex = useCallback(
    (newIndex, t) => {
      // Ignore laps, like going backwards from first lands on last panel
      if (Math.abs(t - newIndex) > 1) return;
      // Otherwise set new page
      setTab(newIndex);
    },
    [tab]
  );

  const onChange = useCallback(
    (e, val) => {
      setTab(Number(val));
      setModal(false);
    },
    [tab, modal]
  );

  // On mobile use Modal Tab Select, otherwise use default Tabs
  const TabWrap = ({ children }) =>
    mobile ? (
      <TabSelectWithModal
        open={modal}
        setOpen={setModal}
        value={tab}
        valueName={data && data[tab].name}
        onChange={onChange}
        children={children}
      />
    ) : (
      <Tabs value={tab} onChange={onChange}>
        <TabList variant="soft" color="neutral" children={children} />
      </Tabs>
    );

  return (
    (data && (
      <>
        <TabWrap>
          {data.map((l, ind) => (
            <Tab key={l.id} value={ind} children={l.name} />
          ))}
        </TabWrap>

        <BindKeyboardSwipeableViews
          hysteresis={0.3}
          threshold={10}
          index={tab}
          onChangeIndex={onChangeIndex}
          slideStyle={{ overflowY: 'hidden' }}
        >
          {!isLoading &&
            data.map((list) => <MangaGrid key={list.id} mangaList={list.mangas} loading={false} />)}
        </BindKeyboardSwipeableViews>
      </>
    )) ||
    null
  );
};

export default ListsPage;
