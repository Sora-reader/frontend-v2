import type { NextPage } from 'next';
import Button from '@mui/joy/Button';
import { signIn, signOut, useSession } from 'next-auth/react';

const Home: NextPage = () => {
  // const { data } = useSearchQuery('бибоп');
  const { data: session, status } = useSession();

  return (
    <>
      <h1>Sora Reader</h1>
      <p>Is auth {status}</p>
      <p style={{ wordBreak: 'break-word' }}>{JSON.stringify(session)}</p>
      <Button onClick={() => signIn('credentials', { username: 'r', password: 'r' })}>SignIn</Button>
      <Button onClick={() => signOut()}>SignOut</Button>
      {/*{data && <MangaGrid mangaList={data.slice(0, 4)} loading={false} />}*/}
    </>
  );
};

export default Home;
