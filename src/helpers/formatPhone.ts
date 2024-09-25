const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length === 12 && cleaned.startsWith('380')) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(
      5,
      8,
    )} ${cleaned.slice(8)}`;
  } else {
    return phone;
  }
};

export default formatPhone;
