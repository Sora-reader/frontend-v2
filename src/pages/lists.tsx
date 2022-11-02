import { NextPage } from 'next';
import { useGetListsQuery } from '../core/lists/api';
import { Modal, ModalDialog, Tab, TabList, Tabs, useTheme } from '@mui/joy';
import { Fragment, useCallback, useState } from 'react';
import { MangaGrid } from '../components/manga/grid/MangaGrid';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import { Breakpoint, useMediaQuery } from '@mui/material';

const mobileBP: Breakpoint = 'sm';
const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

const ListsPage: NextPage = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down(mobileBP));

  const { data, isLoading } = useGetListsQuery(null);
  const [tab, setTab] = useState<number>(0);

  const onChangeIndex = useCallback(
    (newIndex, t) => {
      // Ignore laps, like going backwards from first lands on last panel
      if (Math.abs(t - newIndex) > 1) return;
      // Otherwise set new page
      setTab(newIndex);
    },
    [tab]
  );

  const SwipeTabWrap = ({ children }) => (
    <BindKeyboardSwipeableViews
      hysteresis={0.3}
      threshold={10}
      index={tab}
      style={{ width: '100%' }}
      slideStyle={{
        display: 'flex',
      }}
    >
      {children}
    </BindKeyboardSwipeableViews>
  );
  const TabWrap = mobile ? SwipeTabWrap : Fragment;

  const [open, setOpen] = useState(false);

  return (
    (data && (
      <>
        <Modal keepMounted open={open} onClose={() => setOpen(false)}>
          <ModalDialog
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
            sx={{
              backgroundColor: 'transparent',
              border: 'none',
              padding: 0,
            }}
          >
            <Tabs
              sx={{
                backgroundColor: 'transparent',
                width: '100%',
              }}
              value={tab}
              onChange={(e, val) => {
                setTab(Number(val));
                setOpen(false);
              }}
              orientation="vertical"
            >
              <TabList variant="soft" color="neutral" sx={{ width: '100%' }}>
                {data.map((l, ind) => (
                  <Tab key={l.id + 'modal'} value={ind}>
                    {l.name}
                  </Tab>
                ))}
              </TabList>
            </Tabs>
          </ModalDialog>
        </Modal>

        <Tabs
          sx={{
            // TODO: Remove when upgrade and everything is fixed
            backgroundColor: 'transparent',
            my: 2,
            overflowX: 'hidden',
            // Help mobile wraps since slideStyle can't handle nested selectors
            [theme.breakpoints.down(mobileBP)]: {
              'button[aria-selected="true"]': {
                margin: 0,
              },
            },
          }}
          value={tab}
          onChange={(e, val) => {
            setTab(Number(val));
          }}
        >
          <TabList variant="soft" color="neutral">
            <TabWrap>
              {data.map((l, ind) => (
                <Tab
                  key={l.id}
                  value={ind}
                  onClick={() => {
                    if (mobile) setOpen(true);
                  }}
                >
                  {l.name}
                </Tab>
              ))}
            </TabWrap>
          </TabList>
        </Tabs>
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
