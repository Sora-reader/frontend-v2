import { GetServerSideProps, NextPage } from 'next';
import { IconButton, TextField, Typography } from '@mui/joy';
import GoogleIcon from '@mui/icons-material/Google';
import { apiUrl } from '../core/api/const';
import { useRouter } from 'next/router';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { wrapper } from '../core/store';
import { LogoSpinner } from '../misc/components/LogoSpinner';
import { CenteredLayout } from '../components/CenteredLayout';
import Button from '@mui/joy/Button';
import { useLoginMutation } from '../core/auth/api';

type Props = {
  token: string;
  ssrRedirecting: boolean;
  host: string;
};
const LogInPage: NextPage<Props> = ({ token, ssrRedirecting, host }) => {
  const router = useRouter();
  const [login, { data, isLoading, isError }] = useLoginMutation();
  const [redirecting, setRedirecting] = useState(ssrRedirecting);

  const setSession = (s) => {
    document.cookie = `sessionId=${s};SameSite=Lax`;
    setRedirecting(true);
    router.push('/');
  };

  useEffect(() => {
    if (token) setSession(token);
  }, [token]);
  useEffect(() => {
    if (data && !(isLoading || isError)) setSession(data);
  }, [data, isLoading, isError]);

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.target) {
      const f = new FormData(e.target as HTMLFormElement);
      login({
        username: String(f.get('username')),
        password: String(f.get('password')),
      });
    }
  }, []);

  return (
    <CenteredLayout>
      {redirecting ? (
        <>
          <h1>Пожлауйста, подождите, происходит переадресация</h1>
          <LogoSpinner />
        </>
      ) : (
        <>
          <h1>Вход</h1>
          <form style={{ display: 'grid', gap: '1rem' }} onSubmit={onSubmit}>
            <TextField label="Имя пользователя" name="username" type="text" required size="lg" />
            <TextField label="Пароль" name="password" type="password" required size="lg" />
            <Button type="submit">
              Войти
              {(isLoading && <LogoSpinner size="sm" style={{ margin: '0 0.4rem' }} />) || null}
            </Button>
          </form>
          <Typography sx={{ my: 1 }}>или</Typography>
          <form action={`${apiUrl}/auth/oauth/`} method="POST">
            <input type="hidden" name="redirectUrl" value={host + router.asPath} />
            <IconButton type="submit" color="danger" variant="solid">
              <GoogleIcon sx={{ mr: 1 }} />
              Войти через Google
            </IconButton>
          </form>
        </>
      )}
    </CenteredLayout>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  () =>
    async ({ req, query }) => {
      const token = query?.t || null;
      return {
        props: {
          token,
          ssrRedirecting: !!token,
          host: `http://${req.headers.host}`,
        },
      };
    }
);

export default LogInPage;
