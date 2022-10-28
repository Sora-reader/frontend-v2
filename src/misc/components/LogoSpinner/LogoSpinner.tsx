import { NextPage } from 'next';
import Image from 'next/image';
import styles from './spinner.module.scss';

export const LogoSpinner: NextPage = () => {
  return <Image className={styles.spinner} src="/logo-white.svg" height="100px" width="100px" />;
};
