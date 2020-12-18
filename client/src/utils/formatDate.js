function formatDate(date) {
  return new Intl.DateTimeFormat('LT', {
    timeStyle: 'short',
    dateStyle: 'short',
  }).format(new Date(date));
}

export default formatDate;
