import { NextPage } from 'next';
import { MangaGrid } from '../components/manga/grid/MangaGrid';
import { Box, TextField, useTheme } from '@mui/joy';
import { ChangeEvent, useCallback, useState } from 'react';
import { useLazySearchQuery } from '../core/api/mangaApi';
import Button from '@mui/joy/Button';

const SearchPage: NextPage = () => {
  const [input, setInput] = useState('');
  const [search, { data, isLoading }] = useLazySearchQuery();
  const theme = useTheme();

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
    <Box
      sx={{
        [theme.breakpoints.down('sm')]: {
          padding: 1,
        },
        [theme.breakpoints.up('sm')]: {
          padding: 2,
        },
      }}
    >
      <h1>Поиск</h1>
      <form onSubmit={onSubmit}>
        <TextField
          size="lg"
          label="Название манги"
          value={input}
          onChange={onChange}
          sx={{
            display: 'inline-block',
            my: 2,
            // TODO: Use grid!
            [theme.breakpoints.down('sm')]: {
              width: '64%',
            },
            [theme.breakpoints.up('sm')]: {
              width: '85%',
            },
          }}
          autoFocus={true}
        />
        <Button
          type="submit"
          sx={{
            display: 'inline',
            marginLeft: 1,
            marginRight: 0,
            padding: 0,
            [theme.breakpoints.down('sm')]: {
              width: '30%',
            },
            [theme.breakpoints.up('sm')]: {
              width: '10%',
            },
          }}
        >
          Поиск
        </Button>
      </form>
      {data || isLoading ? <MangaGrid mangaList={data} loading={isLoading} /> : null}
    </Box>
  );
};

export default SearchPage;
