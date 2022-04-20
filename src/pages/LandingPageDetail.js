import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSelectEstate from '../hooks/useSelectEstate';

import { PATH_PAGE } from '../routes/paths';

import { Container } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Page from '../components/Page';
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
  const { estate: selected, loading } = useSelectEstate();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !selected)
      navigate(PATH_PAGE.page404);
  }, [loading, selected, navigate]);


  return (
    <RootStyle title='SoluxImmo | Detail' id='move_top'>
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
