// material
import { useTheme, styled } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Card,
  Tabs,
  Tab,
  Container,
  Typography,
  useMediaQuery,
  Stack,
  TextField,
  MenuItem, Button
} from '@material-ui/core';
//
import { useState } from 'react';
import { Apartment, Home } from '@material-ui/icons';
import LandingSearchFilterPriceBox from './LandingSearchFilterPriceBox';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SearchIcon from '@material-ui/icons/Search';
import LandingSearchFilterTypes from './LandingSearchFilterTypes';

// ----------------------------------------------------------------------


const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(15)
  }
}));


// ----------------------------------------------------------------------

const TABS = [
  {
    icon: <Home />,
    value: 'Residentiel'
  },
  {
    icon: <Apartment />,
    value: 'Commercial'
  }
];

export default function LandingSearchFilter() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });

  const [firsTab] = TABS;
  const [currentTab, setCurrentTab] = useState(firsTab.value);

  const handleTabsChange = (change) => {
    setCurrentTab(change);
  };

  const handlePriceRangeChange = (change) => {
    setPriceRange(change);
  };

  const handleApply = () => {

  }

  return (
    <RootStyle>
      <Container maxWidth='lg'>


        <Stack direction={'column'} spacing={1}>

          <Tabs
            value={currentTab}
            scrollButtons='auto'
            variant='scrollable'
            allowScrollButtonsMobile
            style={{marginLeft:20}}
            onChange={(_, tabName) => handleTabsChange(tabName)}
          >
            {
              TABS.map(tab => (
                <Tab
                  key={tab.value}
                  label={tab.value}
                  icon={tab.icon}
                  value={tab.value}
                />
              ))
            }
          </Tabs>

          <Grid container spacing={2}>

            <Grid item xs={5}>
              <TextField
                fullWidth
                label={'Rechercher par ville, quartier ...'}
              />
            </Grid>

            <Grid item xs={2}>
              <TextField
                fullWidth
                select
                defaultValue={'sell'}
              >

                <MenuItem value={'sell'}>
                  A vendre
                </MenuItem>

                <MenuItem value={'rent'}>
                  A Louer
                </MenuItem>

              </TextField>
            </Grid>

            <Grid item xs={2}>
              <LandingSearchFilterPriceBox
                range={priceRange}
                onChange={handlePriceRangeChange}
              />
            </Grid>

            <Grid item xs={2}>
              <LandingSearchFilterTypes
                range={priceRange}
                onChange={handlePriceRangeChange}
              />
            </Grid>

            <Grid item xs={2}>
              <Button
                fullWidth
                variant={'outlined'}
                endIcon={<SearchIcon />}
                onClick={handleApply}
                style={{ height: 55, color: 'grey', borderColor: 'grey' }}
              >
                Appliquer
              </Button>
            </Grid>

          </Grid>

        </Stack>



      </Container>
    </RootStyle>
  );
}
