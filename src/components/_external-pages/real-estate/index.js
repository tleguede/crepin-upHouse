import { Grid, Container, Skeleton, Typography, Box, Paper, Stack } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Page from '../../Page';

import { RealEstateItem } from './RealEstateItem';

const RootStyle = styled(Page)({
  height: '100%',
  marginTop: 40
});

const Loading = () => {
  return (
    <Grid container spacing={2}>
      {
        [...Array(10)].map((one, index) => (
          <Grid item sm={6} xs={12} md={3} style={{ marginBottom: 10, cursor: 'pointer' }} key={index}>
            <Skeleton variant={'rectangular'} width={250} height={300} />
          </Grid>
        ))
      }
    </Grid>
  );
};

export default function RealEstateList({ list, loading }) {
  console.log(list[0]);

  return (
    <RootStyle>
      <Container maxWidth='lg'>

        <Grid container spacing={2}>
          {
            list.map(one => (
              <Grid item sm={6} xs={12} md={3} style={{ marginBottom: 10, cursor: 'pointer' }} key={one?.id}>
                <RealEstateItem item={one} />
              </Grid>
            ))
          }
        </Grid>

        {
          loading && (
            <Loading />
          )
        }

        {
          (list?.length === 0) && (
            <Box sx={{ m: 5 }}>
              <Typography variant={'subtitle1'}>
                Aucun résultat
              </Typography>
            </Box>

          )
        }

        <Grid container spacing={1}>
          {
            list.map(one => (
              <Grid item sm={6} xs={12} md={3} style={{ margin: 5, cursor: 'pointer' }} key={one?.id}>
                <Paper sx={{ width: 1, height: 474, boxShadow: 5 }}>
                  <Stack>


                    <Stack width={1} height={155} bgcolor={'red'}>

                      <Typography>
                        {one?.name}
                      </Typography>


                    </Stack>

                  </Stack>
                </Paper>
              </Grid>
            ))
          }
        </Grid>

      </Container>
    </RootStyle>
  );
}