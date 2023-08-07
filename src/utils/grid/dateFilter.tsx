const dateFilter = (filterLocalDateAtMidnight: Date, value: Date): number => {
  if (value == null) {
    return 0;
  }
  const date = new Date(value);

  if (date.valueOf() < filterLocalDateAtMidnight.valueOf()) {
    return -1;
  } else if (date.valueOf() > filterLocalDateAtMidnight.valueOf()) {
    return 1;
  }
  return 0;
};

export default dateFilter;
