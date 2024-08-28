const formatDate = (date: Date | undefined): string | null => {
  if (!date) return null;

  return date.toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
  });
};

export default formatDate;
