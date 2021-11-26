import { Container, Stack, Typography } from '@material-ui/core';
import LandingRealEstateList from '../landing/LandingRealEstateList';
import { styled } from '@material-ui/core/styles';

const Waiting = styled(Container)(({ theme }) => ({
  border: 'solid',
  borderWidth: 1,
  borderColor: 'green',
  borderRadius:20,
  paddingTop:20
}));


export default function PostList() {
  return (
    <>
      <Waiting>
        <Stack direction={'column'} spacing={2}>
          <Typography variant={'h6'}>
            En attente de validation
          </Typography>
          <LandingRealEstateList />
        </Stack>


      </Waiting>

      <LandingRealEstateList />
    </>
  )
}