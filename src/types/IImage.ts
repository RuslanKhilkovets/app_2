export default interface IImage {
  id: string;
  mime_type: string;
  extension: string;
  name: string;
  is_main: boolean;
  size: number;
  url: string;
  delete: boolean;
}
