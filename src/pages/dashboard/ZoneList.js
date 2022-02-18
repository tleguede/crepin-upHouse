import useSettings from '../../hooks/useSettings';

import { Container } from '@material-ui/core';
import Page from '../../components/Page';
import Zones from '../../components/_dashboard/zones';

// ----------------------------------------------------------------------

export default function ZoneList() {
  const { themeStretch } = useSettings();

  return (
    <Page title='Les zones'>
      <Container maxWidth={themeStretch ? false : 'lg'} sx={{ my: 10 }}>
        <Zones/>
      </Container>
    </Page>
  );
}
