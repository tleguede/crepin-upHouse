import { Stack ,Skeleton } from '@material-ui/core';

export default function DetailSkeleton() {
  return (
    <Stack direction={'column'} spacing={3}>
      <Skeleton variant="rectangular" width={'100%'} height={36} />
      <div sx={{ m: 20 }}/>
      <Skeleton variant="rectangular" width={'100%'} height={500} />
      <div sx={{ m: 20 }}/>
      <Skeleton variant="rectangular" width={'100%'} height={200} />

    </Stack>
  )
}