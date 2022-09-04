import {Navbar, navbarSize, navbarWrapBreakpointKey} from './Navbar';
import {Container} from '@mui/joy';

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
