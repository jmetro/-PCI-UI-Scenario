import { ValueFormatterParams, ValueFormatterFunc } from 'ag-grid-community';
const dateFormatter: ValueFormatterFunc = ({
  value,
  data,
}: ValueFormatterParams) => {
  if (!value) return '';
  const date = new Date(value);
  // return value;
  const month =
    date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
  const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

export default dateFormatter;
