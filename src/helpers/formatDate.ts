const formatDate = (
  date: Date | undefined,
  withYear: boolean = false,
): string | null => {
  if (!date) return null;

  return date.toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
    ...(withYear && {year: 'numeric'}),
  });
};

export default formatDate;
