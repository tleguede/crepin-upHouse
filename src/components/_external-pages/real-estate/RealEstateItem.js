import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { useRef } from 'react';

// material
import { useTheme } from '@material-ui/core/styles';
import { Box, Stack, Typography, Paper, CardHeader } from '@material-ui/core';
// utils
import mockData from '../../../utils/mock-data';
//
import Label from '../../Label';
import { CarouselControlsArrowsBasic1 } from '../../carousel';

// ----------------------------------------------------------------------

export const MOCK_BOOKINGS = [...Array(5)].map((_, index) => ({
  id: mockData.id(index),
  name: mockData.name.fullName(index),
  avatar: mockData.image.avatar(index),
  bookdAt: mockData.time(index),
  roomNumber: 'A-21',
  roomType: (index === 1 && 'double') || (index === 3 && 'king') || 'single',
  person: '3-5',
  cover: `/static/mock-images/rooms/room-${index + 1}.jpg`
}));

// ----------------------------------------------------------------------

RealEstateItem.propTypes = {
  item: PropTypes.shape({
    avatar: PropTypes.string,
    bookdAt: PropTypes.instanceOf(Date),
    cover: PropTypes.string,
    name: PropTypes.string,
    person: PropTypes.string,
    roomNumber: PropTypes.string,
    roomType: PropTypes.string
  })
};

export function RealEstateItem({ item }) {
  const { name,  cover,type,  cost,paymentRhythm } = item;

  return (
    <Paper sx={{ mx: 1.5, borderRadius: 2, bgcolor: 'background.neutral' }}>
      <Stack spacing={2.5} sx={{ p: 3, pb: 2.5 }}>
        <Stack direction={'column'} alignItems="center" spacing={1}>
          <Typography variant="subtitle2">
            {name}
          </Typography>
          <Typography variant="body1">
            {type}
          </Typography>
        </Stack>

      </Stack>

      <Box sx={{ p: 1, position: 'relative' }}>
        <Label
          variant="filled"
          color={'info'}
          sx={{ position: 'absolute', bottom: 16, right: 16, textTransform: 'capitalize' }}
        >
          <Typography variant="body1">
            {`${cost} CFA ${paymentRhythm}`}
          </Typography>
        </Label>
        <Box component="img" src={cover} sx={{ borderRadius: 1.5, width: 1 }} />
      </Box>
    </Paper>
  );
}

export default function BookingCustomerReviews() {
  const theme = useTheme();
  const carouselRef = useRef(null);

  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Box sx={{ py: 2 }}>
      <CardHeader
        title="Newest Booking"
        subheader="12 Booking"
        action={
          <CarouselControlsArrowsBasic1
            arrowLine
            onNext={handleNext}
            onPrevious={handlePrevious}
            sx={{
              position: 'static',
              '& button': { color: 'text.primary' }
            }}
          />
        }
        sx={{
          p: 0,
          mb: 3,
          '& .MuiCardHeader-action': { alignSelf: 'center' }
        }}
      />

      <Slider ref={carouselRef} {...settings}>
        {MOCK_BOOKINGS.map((item) => (
          <RealEstateItem key={item.id} item={item} />
        ))}
      </Slider>
    </Box>
  );
}
