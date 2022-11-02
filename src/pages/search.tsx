import { NextPage } from 'next';
import { MangaGrid } from '../components/manga/grid/MangaGrid';
import { Box, TextField } from '@mui/joy';
import { ChangeEvent, useCallback, useState } from 'react';
import { useLazySearchQuery } from '../core/api/mangaApi';
import Button from '@mui/joy/Button';

const SearchPage: NextPage = () => {
  const [input, setInput] = useState('');
  const [search, { data, isLoading, isUninitialized }] = useLazySearchQuery();

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      search(input);
    },
    [input]
  );

  return (
    <Box>
      <h1>Поиск</h1>
      <form onSubmit={onSubmit} style={{ marginBottom: '1rem' }}>
        <TextField
          size="lg"
          placeholder="Название манги"
          value={input}
          onChange={onChange}
          autoFocus={true}
          fullWidth={true}
          endDecorator={<Button type="submit">Поиск</Button>}
        />
      </form>
      {data?.length || isLoading ? (
        <MangaGrid mangaList={data} loading={isLoading} />
      ) : !isUninitialized ? (
        <h3>Ничего не найдено</h3>
      ) : null}
    </Box>
  );
};

export default SearchPage;
