export default interface IMessage {
  id: number;
  img: string;
  title: string;
  name: string;
  lastMessage: string;
  newMessages?: number;
}
