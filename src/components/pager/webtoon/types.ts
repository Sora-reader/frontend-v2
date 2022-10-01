import {Dispatch, SetStateAction} from "react";
import {ImageProps} from "../types";


export type WebtoonImageProps = ImageProps & {
  position: number,
  setPage: Dispatch<SetStateAction<number>>,
}
