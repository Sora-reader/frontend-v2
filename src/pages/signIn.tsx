import { GetServerSideProps, NextPage } from 'next';
import { IconButton, Typography } from '@mui/joy';
import GoogleIcon from '@mui/icons-material/Google';
import { apiUrl } from '../core/api/const';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { wrapper } from '../core/store';
import { LogoSpinner } from '../misc/components/LogoSpinner';

type Props = {
  token: string;
  redirecting: boolean;
  host: string;
};
const SignInPage: NextPage<Props> = ({ token, redirecting, host }) => {
  const router = useRouter();

  useEffect(() => {
    if (token) {
      document.cookie = `sessionId=${token};SameSite=Lax`;
      router.push('/');
    }
  }, [token]);

  if (redirecting && token) {
    return (
      <div>
        <Typography>Пожлауйста, подождите, происходит переадресация</Typography>
        <LogoSpinner />
      </div>
    );
  }

  return (
    <form action={`${apiUrl}/auth/oauth/`} method="POST">
      <input type="hidden" name="redirectUrl" value={host + router.asPath} />
      <IconButton type="submit" color="danger" variant="solid">
        <GoogleIcon sx={{ mr: 1 }} />
        Войти через Google
      </IconButton>
    </form>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  () =>
    async ({ req, query }) => {
      const token = query?.t || null;
      return {
        props: {
          token,
          redirecting: !!token,
          host: `http://${req.headers.host}`,
        },
      };
    }
);

export default SignInPage;
