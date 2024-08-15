import {createIconSetFromFontello} from 'react-native-vector-icons';
import fontelloConfig from '@/config/icons-config.json';
import {IconProps} from 'react-native-vector-icons/Icon';
const Icon = createIconSetFromFontello(fontelloConfig);

export const AppIcon = ({
  color = '#000',
  name,
  size = 20,
  ...props
}: IconProps) => {
  return <Icon name={name} {...props} />;
};

export default AppIcon;
