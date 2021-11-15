import { Container, MenuItem, Stack, TextField } from '@material-ui/core';
import { UploadMultiFile } from '../../upload';
import { LoadingButton } from '@material-ui/lab';
import { values } from 'lodash';
import { RESIDENCE_TYPE } from '../../../constant';

export default function Publish() {
  return (
    <Container maxWidth={'md'} style={{ marginBottom: 50 }}>
      <Stack direction={'column'} spacing={2}>

        <TextField
          label={'Nom du bien'}
        />

        <TextField
          select
          label={'Type de propriete'}
          defaultValue={RESIDENCE_TYPE.SINGLE_FAMILY_HOME}
        >
          {
            values(RESIDENCE_TYPE).map(one => (
              <MenuItem key={one} value={one}>
                {one}
              </MenuItem>
            ))
          }
        </TextField>

        <Stack direction={'row'} spacing={2}>
          <TextField
            select fullWidth
            label={'Pays'}
            defaultValue={'Togo'}
          >
            <MenuItem value={'Togo'}>
              Togo
            </MenuItem>
          </TextField>

          <TextField
            select fullWidth
            label={'Vile'}
            defaultValue={'Lome'}
          >
            <MenuItem value={'Lome'}>
              Lome
            </MenuItem>
          </TextField>

          <TextField
            select
            fullWidth
            label={'Quartier'}
            defaultValue={'Agoue'}
          >
            <MenuItem value={'Agoue'}>
              Agoue
            </MenuItem>
          </TextField>

        </Stack>

        <TextField
          label={'Description'}
          multiline
          minRows={10}
        />


        <UploadMultiFile files={[]} />

        <LoadingButton variant={'contained'} style={{ width: 200 }}>
          Creer
        </LoadingButton>

      </Stack>

    </Container>
  );
}