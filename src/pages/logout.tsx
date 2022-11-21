import { NextPage } from 'next';
import { LogoSpinner } from '../misc/components/LogoSpinner';
import { CenteredLayout } from '../components/CenteredLayout';
import { useDispatch } from "react-redux";
import { tokenSlice } from "../core/auth/slice";

const LogoutPage: NextPage = () => {
  const dispatch = useDispatch();

  dispatch(tokenSlice.actions.reset());

  return (
    <CenteredLayout>
      <h1>Пожлауйста, подождите, происходит переадресация</h1>
      <LogoSpinner />
    </CenteredLayout>
  );
};

export default LogoutPage;
