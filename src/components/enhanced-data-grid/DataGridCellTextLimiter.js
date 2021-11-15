import { textMaxSize } from '../../utils/text_manipulation';

export default function DataGridCellTextLimiter({text}) {
  return (
    <>
      {textMaxSize(text)}
    </>
  )
}