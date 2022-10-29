import { NextPage } from 'next';
import { MangaList } from '../components/manga/list/MangaList';
import { TextField } from '@mui/joy';
import { useEffect, useState } from 'react';
import { useSearchQuery } from '../core/api/mangaApi';
import { useRouter } from 'next/router';
import { ParsedUrlQueryInput } from 'querystring';
import { useTimeoutResettableEffect } from '../misc/hooks/useTimeoutResettableEffect';

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
  ssrQueryValue?: string;
};
const SearchPage: NextPage<Props> = ({ ssrQueryValue }) => {
  const [input, setInput] = useState('');

  const [paramValue, setParamValue] = useQueryState('title', ssrQueryValue || '');
  const { data, isLoading } = useSearchQuery(paramValue, { skip: !paramValue });

  useEffect(() => {
    if (!input && paramValue) {
      // Setting input to paramValue if it's already initialized, while input is empty
      setInput(paramValue);
    }
  }, []);

  // On title change, delay an update to tsQuery
  useTimeoutResettableEffect(() => {
    setParamValue(input);
  }, [input]);

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
