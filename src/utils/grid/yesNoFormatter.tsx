import { ValueFormatterParams, ValueFormatterFunc } from 'ag-grid-community';
const dateFormatter: ValueFormatterFunc = ({ value }: ValueFormatterParams) => {
  if(value === 'Y') return 'Yes';
  if(value === 'N') return 'No';
  return '';
};

export default dateFormatter;