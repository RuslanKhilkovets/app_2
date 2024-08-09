import styled from 'styled-components/native';
import Post from '../types/Post';


const PostView = styled.View`
  flex-direction: row;
  padding: 15px;
  padding-left: 0px;
  width: 90%;
  margin: 0 auto;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-bottom-style: solid;
`;

const PostImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 10px;
`;

const PostTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const PostData = styled.Text`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 2px;
`;

const PostDetails = styled.View`
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
`;

const truncateTitle = (str: string) => {
  if(str.length >= 10){
    return str.substring(0, 50) + "..."
  }

  return str;
}

export const PostItem = ({ image, title = 'Title', data = 'Data' }: Post) => {
  return (
    <PostView>
      <PostImage source={{ uri: image }} resizeMode="cover" />
      <PostDetails>
        <PostTitle>{truncateTitle(title)}</PostTitle>
        <PostData>{new Date(data).toLocaleDateString("uk-UA")}</PostData>
      </PostDetails>
    </PostView>
  );
}