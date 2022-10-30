import { NextPage } from 'next';
import { MangaList } from '../components/manga/list/MangaList';
import { TextField } from '@mui/joy';
import { ChangeEvent, useCallback, useState } from 'react';
import { useSearchMutation } from '../core/api/mangaApi';
import Button from '@mui/joy/Button';

const SearchPage: NextPage = () => {
  const [input, setInput] = useState('');
  const [search, { data, isLoading }] = useSearchMutation();

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
    <>
      <h1>Поиск</h1>
      <form onSubmit={onSubmit}>
        <TextField
          size="lg"
          label="Название манги"
          value={input}
          onChange={onChange}
          sx={{ display: 'inline-block', width: '85%', my: 2 }}
          autoFocus={true}
        />
        <Button type="submit" sx={{ display: 'inline', mx: 1, width: '10%' }}>
          Поиск
        </Button>
      </form>
      {data || isLoading ? <MangaList mangaList={data} loading={isLoading} /> : null}
    </>
  );
};

export default SearchPage;
