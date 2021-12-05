import { Grid, Container } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Page from '../../Page';

import { RealEstateItem } from './RealEstateItem';

const RootStyle = styled(Page)({
  height: '100%',
  marginTop:40
});

export default function RealEstateList({list,loading}) {


  return (
    <RootStyle>
      <Container maxWidth='lg'>
        <Grid container spacing={2}>
          {
            list.map(one => (
              <Grid item  sm={6} xs={12} md={3} style={{marginBottom:10, cursor:'pointer'}} key={one?.id} >
                <RealEstateItem item={one} />
              </Grid>
            ))
          }
        </Grid>
      </Container>
    </RootStyle>
  );
}