import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { LogoSpinner } from '../misc/components/LogoSpinner';
import { CenteredLayout } from '../components/CenteredLayout';

const LogoutPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    document.cookie = `sessionId=;SameSite=Lax`;
    router.push('/');
  }, []);

  return (
    <CenteredLayout>
      <h1>Пожлауйста, подождите, происходит переадресация</h1>
      <LogoSpinner />
    </CenteredLayout>
  );
};

export default LogoutPage;
