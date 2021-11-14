import Label from './Label';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Stack } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

export function SectionAccordion({ icon, title, count, children, defaultExpanded = true, hideShadow = false }) {
  const Icon = () => icon ? icon() : <></>;


  let custom = {};

  if (hideShadow)
    custom['style'] = { boxShadow: 'none' };

  return (
    <Accordion defaultExpanded={defaultExpanded} {...custom}>

      <AccordionSummary expandIcon={<ExpandMore />}>
        <Stack direction={'row'} spacing={3}>

          {
            icon && (
              <Icon />
            )
          }

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