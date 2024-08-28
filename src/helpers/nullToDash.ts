export default function nullToDash(text: string | null | undefined) {
  return text === null || text === undefined || text === '' ? '-' : text;
}