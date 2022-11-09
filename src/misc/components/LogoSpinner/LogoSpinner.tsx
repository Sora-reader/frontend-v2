import styles from './spinner.module.scss';
import { CSSProperties } from '@mui/system/CSSProperties';

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

  return (
    <img
      className={styles.spinner}
      alt="logo spinner"
      style={{
        maxHeight: progressSize,
        maxWidth: progressSize,
        content: 'var(--joy-palette-logoSrc)',
        ...style,
      }}
    />
  );
};

LogoSpinner.defaultProps = {
  style: {},
  size: 'xl',
};
