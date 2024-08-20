export default function textTrimmer(text: string, maxWidth = 50) {
  if (text.length <= maxWidth) {
    return text;
  }

  const trimmedText = text.substring(0, maxWidth - 3) + '...';

  return trimmedText;
}
