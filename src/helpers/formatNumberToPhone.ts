function formatNumberToPhone(phoneNumber: string): string | null {
  if (!phoneNumber || phoneNumber.length < 12) {
    return phoneNumber;
  }

  return `+${phoneNumber.slice(0, 2)} (${phoneNumber.slice(
    2,
    5,
  )})-${phoneNumber.slice(5, 7)}-${phoneNumber.slice(7, 9)}-${phoneNumber.slice(
    9,
  )}`;
}

export default formatNumberToPhone;
