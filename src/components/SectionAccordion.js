import Label from './Label';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Stack } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

export function SectionAccordion({ icon, title, count, children, defaultExpanded = true, hideShadow = false }) {

  return (
    <Accordion defaultExpanded={defaultExpanded} {...(hideShadow && {style:{boxShadow: 'none'}})} >

      <AccordionSummary expandIcon={<ExpandMore />}>
        <Stack direction={'row'} spacing={3}>

          {icon}

          <Typography variant={'subtitle1'}>
            {title}
          </Typography>

          {
            count && (
              <Label>
                {count}
              </Label>
            )
          }

        </Stack>
      </AccordionSummary>

      <AccordionDetails>
        {children}
      </AccordionDetails>

    </Accordion>
  );
}