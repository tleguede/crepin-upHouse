import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import flashFill from '@iconify/icons-eva/flash-fill';
// material
import { styled } from '@material-ui/core/styles';
import { Box, Button, Container, Stack, Typography } from '@material-ui/core';
// routes
//
import { varFadeIn, varFadeInRight, varWrapEnter } from '../../animate';
import { useCallback, useEffect, useState } from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.grey[400],
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    position: 'fixed',
    alignItems: 'center'
  }
}));

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(({ theme }) => ({
  zIndex: 10,
  maxWidth: 520,
  margin: 'auto',
  textAlign: 'center',
  position: 'relative',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    margin: 'unset',
    textAlign: 'left'
  }
}));

const HeroOverlayStyle = styled(motion.img)({
  zIndex: 9,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
  filter: 'brightness(40%)'
});

// const HeroImgStyle = styled(motion.img)(({ theme }) => ({
//   top: 0,
//   right: 0,
//   bottom: 0,
//   zIndex: 8,
//   width: '100%',
//   margin: 'auto',
//   position: 'absolute',
//   [theme.breakpoints.up('lg')]: {
//     right: '8%',
//     width: 'auto',
//     height: '48vh'
//   }
// }));

// ----------------------------------------------------------------------

const images = [...Array(4)].map((_, index) => `/static/images/0${index + 1}.jpg`);


export default function LandingHero() {
  const [index, setIndex] = useState(0);
  const selected = images[index];

  const handleCarousel = useCallback(() => {
    const newIndex = index + 1;
    setIndex(newIndex > (images.length - 1) ? 0 : newIndex);
  }, [index]);


  useEffect(() => {
    const timer = setInterval(handleCarousel, 5000);
    return () => clearInterval(timer);
  }, [handleCarousel]);

  const handleScrolling = () => {
    const main = document.getElementById('list');
    window.scrollTo({
      top: main.offsetTop - 70,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <RootStyle initial='initial' animate='animate' variants={varWrapEnter}>
        <HeroOverlayStyle alt='overlay' src={selected} variants={varFadeIn} />

        <Container maxWidth='lg'>
          <ContentStyle>
            <motion.div variants={varFadeInRight}>
              <Typography variant='h1' sx={{ color: 'common.white' }}>
                L'immobilier de vos rêves
                <br /> avec
                <Typography component='span' variant='h1' sx={{ color: 'primary.main' }}>
                  &nbsp;upHouse
                </Typography>
              </Typography>
            </motion.div>

            <motion.div variants={varFadeInRight}>
              <Typography sx={{ color: 'common.white' }}>
                Laissez-nous vous guider à travers l'approche innovante sans stress
                pour trouver les propriétés de vos rêves.
              </Typography>
            </motion.div>


            <motion.div variants={varFadeInRight}>

              <Button
                size='large'
                variant='contained'
                onClick={handleScrolling}
                startIcon={<Icon icon={flashFill} width={20} height={20} />}

              >
                Allons y !
              </Button>
            </motion.div>

          </ContentStyle>
        </Container>
      </RootStyle>
      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
}
