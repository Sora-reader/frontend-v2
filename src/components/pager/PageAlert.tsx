import {ChapterImageList} from "../../common/apiTypes";
import {useEffect, useRef, useState} from "react";
import {Fade} from "@mui/material";
import {Alert} from "@mui/joy";

type PageAlertProps = {
  page: number,
  images: ChapterImageList,
}
export const PageAlert = ({page, images}: PageAlertProps) => {
  const [alertShow, setAlertShow] = useState(false);
  const t = useRef<any>(null);

  useEffect(() => {
    clearTimeout(t.current);
    setAlertShow(true);
    t.current = setTimeout(() => {
      setAlertShow(false);
    }, 2000);
  }, [page]);

  return <Fade in={alertShow}>
    <Alert
      color="neutral"
      sx={{
        position: 'fixed',
        right: '46%',
        left: '46%',
        justifyContent: "center",
        top: '1rem',
        width: 'max-content',
        zIndex: 1,
      }}
    >
      {page || 0} / {images.length - 1}
    </Alert>
  </Fade>
}
