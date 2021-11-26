// material
import { styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import {
  Container,

} from '@material-ui/core';

import { useParams } from 'react-router-dom';
import useRealEstates from '../hooks/useRealEstates';
import Detail from '../components/_external-pages/detail';
import DetailSkeleton from '../components/_external-pages/detail/DetailSkeleton';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%'
});

const ContentStyle = styled(Container)(({ theme }) => ({
  marginTop: 100,
  marginBottom: 100
}));

// ----------------------------------------------------------------------

export default function LandingPageDetail() {
  const { id } = useParams();
  const { realEstates, loading } = useRealEstates();
  const selected = realEstates.find(one => one?.id === id);

  return (
    <RootStyle title='upHouse | Detail' id='move_top'>
      <ContentStyle maxWidth={'lg'}>

        {
          loading
            ? <DetailSkeleton />
            : <Detail selected={selected} />
        }

      </ContentStyle>
    </RootStyle>
  );
}
