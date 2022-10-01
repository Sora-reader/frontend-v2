import {useInView} from "react-intersection-observer";
import {useEffect} from "react";
import {WebtoonImageProps} from "./types";

export const WebtoonImage = ({src, position, setPage, setShowNavbar}: WebtoonImageProps) => {
  const {ref, inView} = useInView({
    rootMargin: '-50% 0% -50% 0%',
    threshold: 0,
  });

  useEffect(() => {
    if (inView) setPage(position);
  }, [inView]);

  return <img
    style={{width: '80%'}}
    loading="lazy"
    id={`image=${position}`}
    src={src} alt=""
    onClick={setShowNavbar}
    ref={ref}
  />;
};
