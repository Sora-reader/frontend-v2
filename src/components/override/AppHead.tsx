import {Component, forwardRef, Ref} from 'react';
import {Head} from 'next/document';

export type AppHeadProps = Omit<Head['props'], 'title'>

export const AppHead = forwardRef<any, AppHeadProps>((props, ref: Ref<any>) => {
  // @ts-ignore
  const MyHead: Component<AppHeadProps> = Head;
  // @ts-ignore
  return <MyHead {...props} ref={ref}></MyHead>;
});
