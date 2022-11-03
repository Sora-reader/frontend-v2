import { Tab, TabList, Tabs } from '@mui/joy';
import { ModalContainer } from './ModalContainer';

type Props = {
  open;
  setOpen;
  value;
  onChange;
  valueName;
  children?;
};

export const TabSelectWithModal = ({ open, setOpen, value, onChange, valueName, children }: Props) => {
  return (
    <>
      <Tabs value={0}>
        <TabList variant="soft" color="neutral">
          <Tab
            value={0}
            onClick={() => {
              setOpen(true);
            }}
          >
            {valueName}
          </Tab>
        </TabList>
      </Tabs>

      <ModalContainer open={open} setOpen={setOpen}>
        <Tabs
          sx={{
            my: 0,
            width: '100%',
          }}
          value={value}
          onChange={onChange}
          orientation="vertical"
        >
          <TabList variant="soft" color="neutral" sx={{ width: '100%' }}>
            {children}
          </TabList>
        </Tabs>
      </ModalContainer>
    </>
  );
};
