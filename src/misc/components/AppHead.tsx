import { FC, forwardRef, Ref } from 'react';
import { Head } from 'next/document';

export type AppHeadProps = Omit<Head['props'], 'title'>;
/** Stub component which allows using Head without title */
export const AppHead = forwardRef<any, AppHeadProps>((props, ref: Ref<any>) => {
  const MyHead: FC<any> = Head as any;
  return <MyHead {...props} ref={ref} />;
});
