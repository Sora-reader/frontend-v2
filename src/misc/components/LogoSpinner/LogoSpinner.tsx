import { NextPage } from 'next';
import Image from 'next/image';
import styles from './spinner.module.scss';

export const LogoSpinner: NextPage = () => {
  return (
    <Image className={styles.spinner} alt="logo spinner" src="/logo-white.svg" height={100} width={100} />
  );
};
