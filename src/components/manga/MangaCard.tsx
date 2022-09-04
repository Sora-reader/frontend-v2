import Card from '@mui/joy/Card';
import {AspectRatio, Typography} from '@mui/joy';
import {useState} from 'react';
import {useFakeAnchorProps} from '../../common/hooks';

export const MangaCard = () => {
  const [props] = useState({
    href: '/manga',
  });

  const fakeLinkProps = useFakeAnchorProps(props.href);

  return <Card
      {...fakeLinkProps}
      variant="outlined"
  >
    <div>
      <Typography component="h2" fontWeight="bold" marginBottom="1rem !important">
        Demon slayer
      </Typography>
      <AspectRatio sx={{my: 2}}>
        <img src="/assets/demon_slayer.png" alt=""/>
      </AspectRatio>
      <Typography sx={{
        textOverflow: 'ellipsis',
        height: '3rem',
        overflow: 'auto',
      }}>
        Tanjirou Kamado lives with his impoverished family on a remote mountain. As the oldest sibling,
        he took upon the responsibility of ensuring his family’s livelihood after the death of his father.
        On a cold winter day, he goes down to the local village in order to sell some charcoal. As dusk
        falls,
        he is forced to spend the night in the house of a curious man who cautions him of strange creatures
        that roam the night: malevolent demons who crave human flesh. When he finally makes his way home,
        Tanjirou’s worst nightmare comes true. His entire family has been brutally slaughtered with the sole
        exception of his sister Nezuko, who has turned into a flesh-eating demon. Engulfed in hatred and
        despair, Tanjirou desperately tries to stop Nezuko from attacking other people, setting out on a
        journey to avenge his family and find a way to turn his beloved sister back into a human.
      </Typography>
    </div>
  </Card>;
};
