import { Stack } from '@material-ui/core';
import PhoneInput from 'react-phone-input-2';
import ErrorHelper from './ErrorHelper';
import 'react-phone-input-2/lib/style.css';

export default function PhoneField({error,helperText, onChange,value=''}) {
  return (
    <Stack>

      <PhoneInput
        country={'tg'}
        value={value}
        inputProps={{
          name: 'phone',
          required: true,
          autoFocus: true

        }}
        inputStyle={{
          width: '100%',
          height: 56
        }}

        onChange={onChange}

      />

      <ErrorHelper
        error={error}
      />

    </Stack>
  )
}