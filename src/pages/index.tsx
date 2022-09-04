import type {NextPage} from 'next';
import Card from '@mui/joy/Card';
import {AspectRatio, Container, Grid, IconButton, Sheet, Theme, Typography} from '@mui/joy';

import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';

const bpKey = 'lg';

const Navbar = () => {
  const buttonContainerSx = (theme: Theme) => ({
    display: 'flex',
    [theme.breakpoints.down(bpKey)]: {
      'flex-flow': 'row nowrap',
    },
    [theme.breakpoints.up(bpKey)]: {
      'flex-flow': 'column nowrap',
    },
    gap: '1rem',
  });
  return <Card sx={(theme) => ({
    // position
    [theme.breakpoints.down(bpKey)]: {
      bottom: 0,
      // size
      width: '100vw',
      height: '4rem',
      // flex
      'flex-flow': 'row nowrap',
    },
    [theme.breakpoints.up(bpKey)]: {
      top: 0,
      // size
      width: '4rem',
      height: '100vh',
      // borders
      'border-top-left-radius': 0,
      'border-bottom-left-radius': 0,
    },
    position: 'fixed',
    left: 0,
    'z-index': 1,
    // flex
    display: 'flex',
    'justify-content': 'space-between',
    'align-items': 'center',
  })}>
    <Sheet id="main-buttons" sx={buttonContainerSx}>
      <IconButton>
        <HomeIcon/>
      </IconButton>

      <IconButton>
        <FormatListBulletedIcon/>
      </IconButton>
    </Sheet>

    <Sheet id="main-buttons" sx={buttonContainerSx}>
      <IconButton color="neutral">
        <AccountBoxIcon/>
      </IconButton>

      <IconButton color="neutral">
        <LogoutIcon/>
      </IconButton>
    </Sheet>
  </Card>;
};

const MangaCard = () => (
    <Card component="a" variant="outlined"
          href="https://github.com/vercel/next.js/tree/canary/examples">
      <Typography component="h2" fontWeight="bold" marginBottom="1rem !important">
        Demon slayer
      </Typography>
      <AspectRatio sx={{my: 2}}>
        <img src="/assets/demon_slayer.png" alt=""/>
      </AspectRatio>
      <Typography sx={{
        'text-overflow': 'ellipsis',
        height: '3rem',
        overflow: 'auto',
      }}>
        Tanjirou Kamado lives with his impoverished family on a remote mountain. As the oldest sibling,
        he took upon the responsibility of ensuring his family’s livelihood after the death of his father.
        On a cold winter day, he goes down to the local village in order to sell some charcoal. As dusk falls,
        he is forced to spend the night in the house of a curious man who cautions him of strange creatures
        that roam the night: malevolent demons who crave human flesh. When he finally makes his way home,
        Tanjirou’s worst nightmare comes true. His entire family has been brutally slaughtered with the sole
        exception of his sister Nezuko, who has turned into a flesh-eating demon. Engulfed in hatred and
        despair, Tanjirou desperately tries to stop Nezuko from attacking other people, setting out on a
        journey to avenge his family and find a way to turn his beloved sister back into a human.
      </Typography>
    </Card>
);

const Home: NextPage = () => {
  return (
      <>
        <Navbar/>
        <Container sx={(theme) => ({
          [theme.breakpoints.down(bpKey)]: {
            paddingBottom: '5rem',
          },
          [theme.breakpoints.up(bpKey)]: {
            paddingLeft: '4rem',
          },
        })}>
          <h1>
            Welcome to <a href="https://sora-reader.app">Sora reader!</a>
          </h1>


          <Grid container spacing={2}>
            {[...Array(7)].map((_, i) => <Grid xs={6} md={3}>
                  <MangaCard/>
                </Grid>,
            )}
          </Grid>
        </Container>
      </>

  );
};

export default Home;
