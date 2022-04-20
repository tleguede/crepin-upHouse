import PropTypes from 'prop-types';
// material
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {

  return (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <img src='/static/logo-solux.jpg' alt='logo' width="100%" height="100%" viewBox="0 0 512 512"/>
    </Box>
  );
}
