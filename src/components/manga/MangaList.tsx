import {Grid} from "@mui/joy";
import {MangaListCard} from "./MangaListCard";
import {emptyManga, MangaListType} from "../../common/apiTypes";
import {LoadingProps} from "../../common/types";

type Props = {
  mangaList?: MangaListType,
} & LoadingProps;

export const MangaList = ({mangaList, loading}: Props) => {
  return <Grid container spacing={2}>
    {loading ?
      [...Array(8)].map((_, i) =>
        <Grid xs={6} sm={4} md={3} key={`skeleton-${i}`}>
          <MangaListCard {...emptyManga}/>
        </Grid>) :
      mangaList && mangaList.map((manga) =>
        <Grid xs={6} sm={4} md={3} key={manga.id}>
          <MangaListCard {...manga}/>
        </Grid>,
      )}
  </Grid>
}
