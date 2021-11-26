import { Grid, Container } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Page from '../../Page';
import { useNavigate } from 'react-router-dom';
import { PATH_PAGE } from '../../../routes/paths';
import { RealEstateItem } from './RealEstateItem';

const RootStyle = styled(Page)({
  height: '100%',
  marginTop:40
});

export default function RealEstateList({list,loading}) {
  const navigate = useNavigate();

  const goTo = (id) => {
    navigate(PATH_PAGE.detail.replace(':id', id));
  };


  return (
    <RootStyle>
      <Container maxWidth='lg'>
        <Grid container spacing={2}>
          {
            list.map(one => (
              <Grid item  sm={6} xs={12} md={3} style={{marginBottom:10, cursor:'pointer'}} key={one?.id} onClick={() => goTo(one?.id)}>
                <RealEstateItem item={one} />
              </Grid>
            ))
          }
        </Grid>
      </Container>
    </RootStyle>
  );
}