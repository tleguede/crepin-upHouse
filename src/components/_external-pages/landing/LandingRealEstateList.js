import { Grid, Container, Stack, TextField, MenuItem } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Page from '../../Page';
import useValidator from '../../../hooks/useValidator';
import { RealEstateItem } from '../real-estate/RealEstateItem';
import LoadingScreen from '../../LoadingScreen';
import { DateTime } from 'luxon';
import { REAL_ESTATE_STATE } from '../../../constant';
import { useState } from 'react';
import {values} from 'lodash'

const RootStyle = styled(Page)({
  height: '100%',
  marginTop: 40
});


const options = [
  {
    label: 'Une semaine',
    value: DateTime.now().minus({ day: 7 }).toJSDate()
  },
  {
    label: 'Deux semaines',
    value: DateTime.now().minus({ day: 14 }).toJSDate()
  },
  {
    label: 'Trois semaines',
    value: DateTime.now().minus({ day: 21 }).toJSDate()
  },
  {
    label: '1 mois',
    value: DateTime.now().minus({ day: 30 }).toJSDate()
  }
];

const [weekBefore] = options;

const initialState = {
  startDate: weekBefore.value,
  state: REAL_ESTATE_STATE.WAITING_FOR_VALIDATION
}


export default function LandingRealEstateList() {
  const [filter, setFilter] = useState(initialState);
  const { realEstates, loading } = useValidator({...filter});

  const handleFilter=(change)=>{
    setFilter({...filter,...change})
  }

  return (
    <RootStyle>
      <Container maxWidth='lg'>

        <Stack direction={'row'} spacing={2} justifyContent={'end'}>

          <TextField
            select
            label={'Etat'}
            value={filter.state}
            onChange={event => handleFilter({state:event.target.value})}
          >

            {
              values(REAL_ESTATE_STATE).map(one => (
                <MenuItem value={one} key={one} >
                  {one}
                </MenuItem>
              ))
            }

          </TextField>

          <TextField
            select
            label={'Depuis'}
            value={filter.startDate.toString()}
            onChange={event => handleFilter({startDate:new Date(event.target.value)})}
          >

            {
              options.map(({ label, value }) => (
                <MenuItem value={value.toString()} key={value} >
                  {label}
                </MenuItem>
              ))
            }

          </TextField>
        </Stack>

        {
          loading
            ? (<LoadingScreen sx={{ height: '70vh' }} />)
            : (
              <Grid container spacing={2}>
                {
                  realEstates.map(one => (
                    <Grid item sm={6} xs={12} md={3.5} style={{ marginBottom: 10, cursor: 'pointer' }} key={one?.id}>
                      <RealEstateItem item={one} />
                    </Grid>
                  ))
                }
              </Grid>
            )
        }

      </Container>
    </RootStyle>
  );
}