export default interface IAddItemFormData {
  name: string;
  description: string;
  imgUris: {
    uri: string;
    active: boolean;
  }[];
  date: string;
  phone: string;
  forRemuneration: boolean;
  category: string;
  location: string;
}
