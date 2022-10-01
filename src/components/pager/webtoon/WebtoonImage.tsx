import {useInView} from "react-intersection-observer";
import {useEffect} from "react";
import {ImageProps} from "../types";

export const WebtoonImage = ({src, position, setPage}: ImageProps) => {
  const {ref, inView} = useInView({
    rootMargin: '-50% 0% -50% 0%',
    threshold: 0,
  });

  useEffect(() => {
    if (inView) setPage(position);
  }, [inView]);

  return <img style={{width: '80%'}} loading="lazy" id={`image=${position}`} src={src} alt="" ref={ref}/>;
};
