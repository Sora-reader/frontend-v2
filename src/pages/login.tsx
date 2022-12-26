import { GetServerSideProps, GetServerSidePropsResult, NextPage } from 'next';
import { IconButton, TextField, Typography } from '@mui/joy';
import GoogleIcon from '@mui/icons-material/Google';
import { useRouter } from 'next/router';
import { FormEvent, useCallback } from 'react';
import { wrapper } from '../core/store';
import { CenteredLayout } from '../components/CenteredLayout';
import Button from '@mui/joy/Button';
import { LogoSpinner } from '../misc/components/LogoSpinner';
import { signIn, useSession } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth';
import { options } from './api/auth/[...nextAuth]';

type Props = {
  host: string;
};
const LogInPage: NextPage<Props> = ({ host }) => {
  const router = useRouter();
  const { status } = useSession();

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.target) {
      const f = new FormData(e.target as HTMLFormElement);
      signIn('credentials', {
        username: String(f.get('username')),
        password: String(f.get('password')),
      });
    }
  }, []);

  return (
    <CenteredLayout>
      <h1>Вход</h1>
      <form style={{ display: 'grid', gap: '1rem' }} onSubmit={onSubmit}>
        <TextField label="Имя пользователя" name="username" type="text" required size="lg" />
        <TextField label="Пароль" name="password" type="password" required size="lg" />
        <Button type="submit">
          Войти
          {(status === 'loading' && <LogoSpinner size="sm" style={{ margin: '0 0.4rem' }} />) || null}
        </Button>
      </form>
      <Typography sx={{ my: 1 }}>или</Typography>
      <form onSubmit={onSubmit}>
        <input type="hidden" name="redirectUrl" value={host + router.asPath} />
        <IconButton type="submit" color="danger" variant="solid">
          <GoogleIcon sx={{ mr: 1 }} />
          Войти через Google
        </IconButton>
      </form>
    </CenteredLayout>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  () =>
    async ({ req, res, query }): Promise<GetServerSidePropsResult<any>> => {
      const session = await unstable_getServerSession(req, res, options);
      if (session) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }

      return {
        props: {
          host: `http://${req.headers.host}`,
        },
      };
    }
);

export default LogInPage;
