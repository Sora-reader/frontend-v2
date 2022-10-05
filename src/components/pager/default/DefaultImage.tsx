import { ImageProps } from '../types';

export const DefaultImage = ({ src, setShowNavbar }: ImageProps) => {
  return (
    <img
      style={{
        height: 'fit-content',
        maxHeight: '100vh',
        maxWidth: '100%',
        margin: 0,
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
      }}
      loading="lazy"
      src={src}
      alt=""
      onClick={setShowNavbar}
    />
  );
};
