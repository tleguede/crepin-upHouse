import { Grid, Container } from '@material-ui/core';
import { BookingItem, MOCK_BOOKINGS } from '../../_dashboard/general-booking/BookingNewestBooking';
import { styled } from '@material-ui/core/styles';
import Page from '../../Page';
import { useNavigate } from 'react-router-dom';
import { PATH_PAGE } from '../../../routes/paths';

const RootStyle = styled(Page)({
  height: '100%',
  marginTop:40
});

export default function LandingRealEstateList() {
  const navigate = useNavigate();

  const goTo = (id) => {
    navigate(PATH_PAGE.detail.replace(':id', 'id'));
  };

  return (
    <RootStyle>
      <Container maxWidth='lg'>
        <Grid container spacing={2}>
          {
            MOCK_BOOKINGS.map(one => (
              <Grid  sm={6} xs={12} md={3} style={{marginBottom:10}} key={one?.id} onClick={() => goTo(one?.id)}>
                <BookingItem item={one} />
              </Grid>
            ))
          }
        </Grid>
      </Container>
    </RootStyle>
  );
}