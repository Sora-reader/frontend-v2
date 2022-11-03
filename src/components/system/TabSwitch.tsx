import { TabList, Tabs } from '@mui/joy';

type Props = {
  onChange: (v: any) => any;
  value: any;
  children: any;
};
export const TabSwitch = ({ value, onChange, children }: Props) => {
  return (
    <Tabs onChange={onChange} value={value}>
      <TabList variant="soft" color="neutral">
        {children}
      </TabList>
    </Tabs>
  );
};
