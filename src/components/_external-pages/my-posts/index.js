import { Container, Stack, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import useMyPosts from 'src/hooks/useMyPosts';
import { REAL_ESTATE_STATE } from '../../../constant';
import RealEstateList from '../real-estate';
import { useMemo } from 'react';
import NoFavorites from '../NoFavorites';

const Waiting = styled(Container)(({ theme }) => ({
  border: 'solid',
  borderWidth: 1,
  borderColor: 'green',
  borderRadius: 20,
  paddingTop: 20
}));


export default function PostList() {
  const { loading, realEstates } = useMyPosts();
  const noResult = useMemo(() => !loading && realEstates.length === 0, [realEstates, loading]);

  const inWaiting = realEstates.filter(one => one?.state === REAL_ESTATE_STATE.WAITING_FOR_VALIDATION);
  const rest = realEstates.filter(one => one?.state !== REAL_ESTATE_STATE.WAITING_FOR_VALIDATION);

  return (
    <>

      {
        noResult
          ? (<NoFavorites/>)
          :(
            <>
              {
                (inWaiting?.length > 0) && (
                  <Waiting>
                    <Stack direction={'column'} spacing={2}>
                      <Typography variant={'h6'}>
                        En attente de validation
                      </Typography>
                      <RealEstateList list={inWaiting}  loading={loading}/>
                    </Stack>
                  </Waiting>
                )
              }

              <RealEstateList list={rest} loading={loading} />
            </>
          )
      }

    </>
  );
}