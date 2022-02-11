import { Stack, Paper, Grid, Typography } from '@material-ui/core';
import useLandingSearch from '../../../../hooks/useLandingSearch';
import { FEATURE_ICON } from '../../../../constant';
import { Icon } from '@iconify/react';
import { isEmpty } from 'lodash';

export default function SelectedFilterDisplayer() {
  const { showDrawer, helper } = useLandingSearch();

  return (
    <Stack direction={'row'} justifyContent={'center'} spacing={2}>

      <Paper
        sx={{
          m: 3,
          boxShadow: 5,
          minWidth: '70vw',
          cursor: 'pointer'
        }}
        onClick={showDrawer}
      >


        <Stack direction={'column'} sx={{ p: 2 }} spacing={2}>
          <Stack direction={'row'}>
            Rechercher ...
          </Stack>

          {
            !isEmpty(helper) && (
              <Grid container spacing={2} sx={{ m: 1 }}>
                {helper.map(one => {
                  const icon = FEATURE_ICON[one];
                  return (
                    <Grid item key={one}>
                      <Stack direction={'row'} spacing={1}>

                        <>
                          {icon ? <Icon icon={icon} {...{ height: 30, width: 30 }} /> : '#'}
                        </>

                        <Stack justifyContent={'center'}>
                          <Typography variant={'body'}>
                            {one}
                          </Typography>
                        </Stack>

                      </Stack>
                    </Grid>
                  );
                })}
              </Grid>
            )
          }

        </Stack>


      </Paper>

    </Stack>
  );
}