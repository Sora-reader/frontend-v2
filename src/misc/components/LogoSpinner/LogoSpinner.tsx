import styles from './spinner.module.scss';
import { CSSProperties } from '@mui/system/CSSProperties';
import { useTheme } from '@mui/joy';

type Size = 'sm' | 'md' | 'lg' | 'xl';
type Props = {
  style?: CSSProperties;
  size: Size;
};
export const LogoSpinner = ({ size, style }: Props) => {
  const sizeMap: Record<Size, string> = {
    sm: 'var(--CircularProgress-size, 24px)',
    md: 'var(--CircularProgress-size, 40px)',
    lg: 'var(--CircularProgress-size, 64px)',
    xl: 'var(--CircularProgress-size, 128px)',
  };
  const progressSize = sizeMap[size];
  const theme = useTheme();

  return (
    <img
      className={styles.spinner}
      alt="logo spinner"
      src={theme.palette.logoSrc}
      style={{ maxHeight: progressSize, maxWidth: progressSize, ...style }}
    />
  );
};

LogoSpinner.defaultProps = {
  style: {},
  size: 'xl',
};