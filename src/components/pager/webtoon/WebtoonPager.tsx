import {Box} from "@mui/joy";
import {WebtoonImage} from "./WebtoonImage";
import {PagerProps} from "../types";

export const WebtoonPager = ({images, setPage}: PagerProps) => {
  return <Box sx={{display: 'flex', flexFlow: 'column nowrap', alignItems: 'center'}}>
    {images.map((src, position) =>
      <WebtoonImage key={src} src={src} position={position + 1} setPage={setPage}/>,
    )}
  </Box>
}
