import {Navbar, navbarWrapBreakpointKey} from './Navbar';
import {Container} from '@mui/joy';
import {navbarSize} from '../../common/const';

export const MainLayout = ({children}) => {
  return <>
    <Navbar/>
    <Container sx={(theme) => ({
      [theme.breakpoints.down(navbarWrapBreakpointKey)]: {
        paddingBottom: `${navbarSize + 1}rem`,
      },
      [theme.breakpoints.up(navbarWrapBreakpointKey)]: {
        paddingLeft: `${navbarSize + 1}rem`,
      },
    })}>
      {children}
    </Container>
  </>;
};
