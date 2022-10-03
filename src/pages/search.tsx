import {NextPage} from "next";
import {MangaList} from "../components/manga/MangaList";
import {TextField} from "@mui/joy";
import {useCallback, useEffect, useRef, useState} from "react";
import {useSearchQuery} from "../redux/api/manga";

const SearchPage: NextPage = () => {
  const [input, setInput] = useState<string>('');

  // Delay search for 500ms after user stopped typing
  const [query, setQuery] = useState('');
  const timeoutRef = useRef<any>(null);
  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setQuery(input), 500);
  }, [input]);

  const {data, isLoading} = useSearchQuery(query, {skip: !query});

  const onChange = useCallback((e) => {
    setInput(e.target.value);
  }, [input]);

  return <>
    <h1>Поиск</h1>
    <TextField
      size="lg" label="Название манги" value={input} onChange={onChange} sx={{my: 2}} autoFocus={true}/>
    <MangaList mangaList={data} loading={isLoading}/>
  </>;
}

export default SearchPage;
