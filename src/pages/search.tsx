import { NextPage } from 'next';
import { MangaList } from '../components/manga/list/MangaList';
import { TextField } from '@mui/joy';
import { useEffect, useRef, useState } from 'react';
import { useSearchQuery } from '../core/api/mangaApi';
import { useRouter } from 'next/router';
import { ParsedUrlQueryInput } from 'querystring';

const useDelayedAction = (dynamicValue, callback, timeout = 500) => {
  // Delay search for 500ms after user stopped typing
  const timeoutRef = useRef<any>(null);
  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(callback, timeout);
  }, [dynamicValue]);
};

export const useQueryState = (paramName: string, initialState = '') => {
  const router = useRouter();
  const [state, setState] = useState<string>(initialState);

  useEffect(() => {
    setState(String(router.query[paramName]) || initialState);
  }, [router.query]);

  const setQueryParams = (query: string = initialState) => {
    router.push(
      { pathname: router.pathname, query: { [paramName]: query } as ParsedUrlQueryInput },
      undefined,
      {
        shallow: true,
      }
    );
  };

  return [state, setQueryParams] as [string, (q: string) => void];
};

type Props = {
  ssrTitle?: string;
};
const SearchPage: NextPage<Props> = ({ ssrTitle }) => {
  const [input, setInput] = useState('');

  const [paramValue, setParamValue] = useQueryState('title', ssrTitle || '');
  const { data, isLoading } = useSearchQuery(paramValue, { skip: !paramValue });

  useEffect(() => {
    if (!input && paramValue) {
      // Setting input to paramValue if it's already initialized, while input is empty
      setInput(paramValue);
    }
  }, []);

  // On title change, delay an update to tsQuery
  useDelayedAction(input, () => {
    setParamValue(input);
  });

  return (
    <>
      <h1>Поиск</h1>
      <TextField
        size="lg"
        label="Название манги"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sx={{ my: 2 }}
        autoFocus={true}
      />
      <MangaList mangaList={data} loading={isLoading} />
    </>
  );
};

export async function getServerSideProps({ query }) {
  return {
    props: {
      ssrTitle: query.title || null,
    },
  };
}

export default SearchPage;
