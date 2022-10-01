import {Dispatch, SetStateAction} from "react";
import {ChapterImageList} from "../../common/apiTypes";

export type PagerProps = {
  images?: ChapterImageList,
  setPage: Dispatch<SetStateAction<number>>,
}

export type ImageProps = {
  src: string,
  position: number,
  setPage: Dispatch<SetStateAction<number>>,
}
