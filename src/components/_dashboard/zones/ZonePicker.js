import { useState } from 'react';
import useToggle from 'src/hooks/useToggle';
import useZones from '../../../hooks/useZones';

import { transformZone, formatDisplay } from 'src/utils/zone';

import { Dialog, DialogContent, TextField } from '@material-ui/core';
import ErrorHelper from '../../ErrorHelper';
import Zones from './index';


export default function ZonePicker({ onPick, selected, error }) {
  const { zones } = useZones();
  const [zone, setZone] = useState(selected || null);
  const { open, handleClose, handleOpen } = useToggle();

  const handlePick = (id) => {
    const result = transformZone(id, zones);

    setZone(result);

    onPick && onPick(result);

    handleClose();

  };

  return (
    <>

      <TextField
        fullWidth
        label='Choisir la zone géographique'
        onClick={handleOpen}
        value={formatDisplay(zone)}
        error={Boolean(error)}
      />

      <ErrorHelper error={error} />


      <Dialog open={open} onClose={handleClose} maxWidth={'xs'} fullWidth>

        <DialogContent>

          <Zones onSelect={handlePick} />

        </DialogContent>

      </Dialog>


    </>
  );
}
